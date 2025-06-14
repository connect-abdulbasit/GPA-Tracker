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
export const fetchResources = async (userId: string, page: number = 1, pageSize: number = 9, searchQuery: string = "",type: string = "all") => {
  const offset = (page - 1) * pageSize;
  
  // Base query conditions
  const conditions = searchQuery ? or(
    type === "all" ? undefined : eq(resourcesTable.resource_type, type as "link" | "github" | "pdf" | "document" | "video" | "image" | "other"),
    ilike(resourcesTable.title, `%${searchQuery}%`),
    ilike(resourcesTable.description, `%${searchQuery}%`)
  ) : undefined;
  
  // Get total count
  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(resourcesTable)
    .where(conditions)
    .execute();
  
  // Get paginated data with priority for userId
  const resources = await db
    .select()
    .from(resourcesTable)
    .where(conditions)
    .orderBy(
      sql`CASE WHEN user_id = ${userId} THEN 1 ELSE 0 END DESC`,
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