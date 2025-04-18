/* eslint-disable no-unused-vars */
export class DatabaseError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}