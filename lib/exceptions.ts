export class ServerActionError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message)
    this.name = 'ServerActionError'
  }
}