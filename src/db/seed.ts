import { seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

// Reset only the tables we can seed (exclude audio_chunks due to vector column)
await db.delete(schema.questions)
await db.delete(schema.rooms)

// Seed only the supported tables
await seed(db, {
  rooms: schema.rooms,
  questions: schema.questions,
}).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: <only used in dev>
console.log('Database seeded successfully')
