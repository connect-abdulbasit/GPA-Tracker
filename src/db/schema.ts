import { integer, pgTable, real, text, timestamp, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  lastLogin:timestamp("last_login"),
  createdAt:timestamp("created_at").notNull().defaultNow(),
  updatedAt:timestamp("updated_at").notNull().defaultNow(),
});
export const semesterTables = pgTable("semester_table",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar({length:255}).notNull(),
    totalCourses:integer(),
    totalCredits:integer(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow(),
})
export const courseTables = pgTable("course_table",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    name:varchar({length:255}).notNull(),
    description:text().notNull(),
    semesterId:integer().references(()=>semesterTables.id),
    GPA:real(),
    credit:integer(),
    grade:varchar({length:255}),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow(),
})