"use server";

import { calculateSGPA, gradeScale } from "@/lib/gpa-calculations";
import { db } from "@/src/db";
import { assessmentsTable, coursesTable, semestersTable } from "@/src/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export const addSemester = async (userId: string, name: string, status: "ongoing" | "completed") => {
  if(status === "ongoing"){
    const ongoingSemester = await db.select().from(semestersTable).where(and(eq(semestersTable.user_id, userId), eq(semestersTable.status, "ongoing"), eq(semestersTable.active, true))).execute();
    if(ongoingSemester.length > 0){
      throw new Error("You already have an ongoing semester. Please complete it first.");
    }
  }
  return await db.insert(semestersTable).values({
    user_id: userId,
    name,
    total_credits: 0,
    gpa: 0,
    status,
  });
};

export const fetchSemesters = async (userId: string) => {
  const results = await db
    .select()
    .from(semestersTable)
    .leftJoin(coursesTable, and(
      eq(semestersTable.id, coursesTable.semester_id),
      eq(coursesTable.active, true)
    ))
    .where(and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true)))
    .orderBy(asc(semestersTable.created_at))
    .execute();
  const semestersMap = new Map<string, any>();

  for (const row of results) {
    const semesterId = row.semesters.id;
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        courses: [],
      });
    }

    if (row.courses) {
      semestersMap.get(semesterId).courses.push({
        ...row.courses,
        gpa: Number(row.courses.gpa),
      });
    }
  }

  // Sort courses by GPA in each semester
  const semesters = Array.from(semestersMap.values());
  for (const semester of semesters) {
    semester.courses.sort((a: any, b: any) => b.gpa - a.gpa);
  }

  return semesters;
};

export const fetchSemesterById = async (semesterId: string, userId: string) => {
  const results = await db
    .select()
    .from(semestersTable)
    .where(
      and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId), eq(semestersTable.active, true))
    )
    .leftJoin(coursesTable, and(
      eq(semestersTable.id, coursesTable.semester_id),
      eq(coursesTable.active, true)
    )).leftJoin(assessmentsTable, and(
      eq(coursesTable.id, assessmentsTable.course_id),
      eq(assessmentsTable.active, true)
    )).orderBy(desc(coursesTable.gpa),desc(coursesTable.credit_hours))
    .execute();

  const semestersMap = new Map<string, any>();
  const coursesMap = new Map<string, any>();

  for (const row of results) {
    const semesterId = row.semesters.id;
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        courses: [],
      });
    }

    if (row.courses) {
      const courseId = row.courses.id;
      if (!coursesMap.has(courseId)) {
        const course = {
          ...row.courses,
          gpa: Number(row.courses.gpa),
          assessments: [],
        };
        coursesMap.set(courseId, course);
        semestersMap.get(semesterId).courses.push(course);
      }

      if (row.assessments) {
        coursesMap.get(courseId).assessments.push(row.assessments);
      }
    }
  }

  return Array.from(semestersMap.values())[0];
};


export const deleteSemester = async (semesterId: string, userId: string) => {
  return await Promise.all([
   db.update(semestersTable).set({
    active: false,
  }).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute(),
  db.update(coursesTable).set({
    active: false,
  }).where(and(eq(coursesTable.semester_id, semesterId), eq(coursesTable.user_id, userId))).execute()
]);
};

export const updateSemester = async (semesterId: string, userId: string, name: string) => {
  return await db.update(semestersTable).set({
    name,
  }).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute();
};

export const marksAsCompleted = async (semesterId: string, userId: string) => {
  // 1. Get semester and verify it exists
  const semester = await db.select().from(semestersTable).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute();
  if(semester.length === 0){
    throw new Error("Semester not found");
  }

  // 2. Get all courses with their assessments
  const courses = await db.select().from(coursesTable)
    .leftJoin(assessmentsTable, and(
      eq(coursesTable.id, assessmentsTable.course_id),
      eq(assessmentsTable.active, true)
    ))
    .where(and(
      eq(coursesTable.semester_id, semesterId), 
      eq(coursesTable.user_id, userId),
      eq(coursesTable.active, true)
    ))
    .execute();

  // 3. Group assessments by course and verify weightage
  const coursesMap = new Map();
  for (const row of courses) {
    if (!coursesMap.has(row.courses.id)) {
      coursesMap.set(row.courses.id, {
        ...row.courses,
        assessments: [],
        totalWeightage: 0
      });
    }
    if (row.assessments) {
      coursesMap.get(row.courses.id).assessments.push(row.assessments);
      coursesMap.get(row.courses.id).totalWeightage += row.assessments.weightage;
    }
  }

  // 4. Verify all courses have 100% weightage and calculate GPAs
  const coursesWithGPA = [];
  let totalCredits = 0;

  for (const course of coursesMap.values()) {
    // Add to total credits regardless of course type
    totalCredits += course.credit_hours;

    // // Skip GPA calculation for non-credit courses
    // if (course.type === 'non-credit') {
    //   continue;
    // }

    if (course.totalWeightage !== 100) {
      throw new Error(`Course "${course.name}" does not have 100% total weightage (current: ${course.totalWeightage}%)`);
    }

    // Calculate course GPA based on assessments
    const totalWeightedScore = course.assessments.reduce((sum: number, assessment: any) => {
      const percentage = (assessment.marks_obtained / assessment.total_marks) * 100;
      return sum + (percentage * assessment.weightage) / 100;
    }, 0);

    // Convert percentage to GPA using grade scale
    const roundedPercentage = Math.round(totalWeightedScore);
    let courseGPA = 0;
    for (const grade of gradeScale) {
      const range = grade.range.split(" - ");
      if (range.length === 1) {
        if (range[0].endsWith("+") && roundedPercentage >= parseInt(range[0])) {
          courseGPA = grade.gpa;
          break;
        }
        if (range[0].startsWith("<") && roundedPercentage < parseInt(range[0].split("<")[1])) {
          courseGPA = grade.gpa;
          break;
        }
      } else {
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1]);
        if (roundedPercentage >= min && roundedPercentage <= max) {
          courseGPA = grade.gpa;
          break;
        }
      }
    }

    // Update course GPA in database
    await db.update(coursesTable)
      .set({ gpa: courseGPA })
      .where(eq(coursesTable.id, course.id))
      .execute();

    coursesWithGPA.push({
      ...course,
      gpa: courseGPA
    });
  }

  // 5. Calculate and update semester SGPA (only using core and elective courses)
  const sgpa = calculateSGPA(coursesWithGPA);
  
  // 6. Update semester status, GPA, and total credits
  return await db.update(semestersTable).set({
    status: "completed",
    gpa: sgpa,
    total_credits: totalCredits
  }).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute();
};