import { pgTable, text, timestamp, uuid, integer, decimal, real, boolean } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  full_name: text('full_name'),
  image_url: text('image_url'),
  university_name: text('university_name').default(''),
  department: text('department').default(''),
  active: boolean('active').default(true).notNull(),
  role: text('role').default('student').notNull(),
  last_login: timestamp('last_login').defaultNow().notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const semestersTable = pgTable('semesters', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: text('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  gpa: real('gpa').default(0.00).notNull(),
  total_credits: integer('total_credits').default(0).notNull(),
  active: boolean('active').default(true).notNull(),
  status: text('status').default('completed').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const coursesTable = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  semester_id: uuid('semester_id').references(() => semestersTable.id, { onDelete: 'cascade' }).notNull(),
  user_id: text('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  credit_hours: integer('credit_hours').notNull(),
  gpa: real('gpa').default(0.00).notNull(),
  active: boolean('active').default(true).notNull(),
  type: text('type').default('core').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const resourcesTable = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: text('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  course_id: uuid('course_id').references(() => coursesTable.id, { onDelete: 'cascade' }),
  semester_id: uuid('semester_id').references(() => semestersTable.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  resource_type: text('resource_type', { enum: ['link', 'github', 'pdf', 'document', 'video', 'image', 'other'] }).notNull(),
  url: text('url'),
  tags: text('tags').array().default([]).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})
