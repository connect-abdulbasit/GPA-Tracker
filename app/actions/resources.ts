"use server"

import { db, resourcesTable } from "@/src/db";
import { eq, desc, or, ilike, sql } from "drizzle-orm";

interface Resource {
  user_id: string;
  title: string;
  description: string;
  resource_type: "link" | "github" | "pdf" | "document" | "video" | "image" | "other";
  url: string;
  tags: string[];
}
export const fetchResources = async ( page: number = 1, pageSize: number = 9, searchQuery: string = "", type: string = "all") => {
  const offset = (page - 1) * pageSize;
  
  // Build conditions array
  const conditions = [];
  
  // Add type filter if not "all"
  if (type !== "all") {
    conditions.push(eq(resourcesTable.resource_type, type as "link" | "github" | "pdf" | "document" | "video" | "image" | "other"));
  }
  
  // Add search conditions if searchQuery exists
  if (searchQuery) {
    conditions.push(
      or(
        ilike(resourcesTable.title, `%${searchQuery}%`),
        ilike(resourcesTable.description, `%${searchQuery}%`)
      )
    );
  }
  
  // Combine all conditions
  const whereCondition = conditions.length > 0 ? conditions.reduce((acc, condition) => {
    if (acc === null) return condition;
    return sql`${acc} AND ${condition}`;
  }, null as any) : undefined;
  
  // Get total count
  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(resourcesTable)
    .where(whereCondition)
    .execute();
  
  // Get paginated data with proper ordering
  const resources = await db
    .select()
    .from(resourcesTable)
    .where(whereCondition)
    .orderBy(
      desc(resourcesTable.created_at)
    ) 
    .limit(pageSize)
    .offset(offset)
    .execute();
    
  return {
    resources,
    totalCount: Number(totalCount[0].count),
    totalPages: Math.ceil(Number(totalCount[0].count) / pageSize)
  };
}

export const fetchResourceById = async (id: string) => {
  const resource = await db.select().from(resourcesTable).where(eq(resourcesTable.id, id)).execute();
  return resource[0];
}

export const addResource = async (resource: Resource) => {
  const newResource = await db.insert(resourcesTable).values(resource).returning();
  return newResource;
}

export const updateResource = async (id: string, resource: Resource) => {
  const updatedResource = await db.update(resourcesTable).set(resource).where(eq(resourcesTable.id, id)).returning();
  return updatedResource;
}

export const deleteResource = async (id: string) => {
  const deletedResource = await db.update(resourcesTable).set({active: false}).where(eq(resourcesTable.id, id)).returning();
  return deletedResource;
}