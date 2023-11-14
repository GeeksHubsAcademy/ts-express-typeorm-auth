import request from 'supertest'
import { AppDataSource } from "../db";
import app from "../app"

let server: any
beforeAll(async () => {
  await AppDataSource.initialize()
  server = app.listen(4000);
})

afterAll(async () => {
  try {
    if (server) {
      await server.close();
      console.log('Server closed');
    }

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error closing server and destroying database connection:', error);
    throw error;
  }
})

describe('test API', () => {
  test('test external function', async () => {
    const { status, body } = await request(server)
      .get('/api/healthy')

    expect(status).toBe(200);
  })
})
