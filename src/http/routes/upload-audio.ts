import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()

      if (!audio) {
        throw new Error('No audio file uploaded')
      }

      // Validate file type
      const allowedTypes = [
        'audio/wav',
        'audio/mp3',
        'audio/mpeg',
        'audio/webm',
        'audio/ogg',
        'audio/mp4',
        'audio/x-wav',
        'audio/wave',
        'audio/vnd.wav',
      ]
      if (!allowedTypes.includes(audio.mimetype)) {
        throw new Error(
          `Invalid audio file type: ${audio.mimetype}. Allowed types: ${allowedTypes.join(', ')}`
        )
      }

      const audioBuffer = await audio.toBuffer()
      const audioAsBase64 = audioBuffer.toString('base64')

      const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)
      const embeddings = await generateEmbeddings(transcription)

      if (!embeddings || embeddings.length === 0) {
        throw new Error('Failed to generate embeddings')
      }

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning()

      const chunk = result[0]

      if (!chunk) {
        throw new Error('Failed to save audio chunk to database')
      }

      reply.status(201)
      return { chunkId: chunk.id }
    }
  )
}
