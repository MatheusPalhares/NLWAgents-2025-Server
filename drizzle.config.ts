import { defineConfig } from 'drizzle-kit'
import { env } from './src/env.ts'

export default defineConfig({
  casing: 'snake_case',
  schema: './src/db/schema/**.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
