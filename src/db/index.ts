import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false,
})

export const db = drizzle(client, { schema })

export * from './schema';