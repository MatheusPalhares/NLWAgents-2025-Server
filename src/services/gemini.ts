import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GOOGLE_GENAI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o seguinte áudio para texto em português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })
  if (!response.text) {
    throw new Error('Failed to transcribe audio')
  }
  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings || response.embeddings.length === 0) {
    throw new Error('Failed to generate embeddings')
  }
  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')
  const prompt =
    `Você é um assistente de perguntas e respostas. Responda a pergunta com base no contexto fornecido em Português do Brasil. Seja conciso e direto ao ponto.\n\nContexto:\n${context}\n\nPergunta: ${question}
  
  INSTRUÇÕES:
  - Use apenas informações contidas no contexto enviado.
  - Se a resposta não estiver no contexto, responda "Desculpe, não tenho informações suficientes para responder a essa pergunta."
  - Evite repetir a pergunta na resposta.
  - Responda de forma clara e objetiva, sem rodeios.
  - Cite trechos relevantes do contexto se apropriado.
  - Se for citar o contexto, utilize o termo "conteúdo da aula".
  `.trim()
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Failed to generate answer')
  }

  return response.text
}
