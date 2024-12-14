import Response from "./response"

export const badRequest = (error: string): Response => ({
  body: error,
  statusCode: 400,
})

export const serverError = (error: Error): Response => ({
  body: error,
  statusCode: 500,
})

export const ok = (data: any): Response => ({
  body: data,
  statusCode: 200,
})
