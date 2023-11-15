import request from 'supertest'
import { AppDataSource } from "../db";
import app from "../app"

let server: any
let testToken: string
let userId: string

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
  test('test app healthy', async () => {
    const { status, body } = await request(server)
      .get('/api/healthy')

    expect(status).toBe(200);
  })
})

describe('test AUTH', () => {
  test('test user register', async () => {
    const { status, body } = await request(server)
      .post('/user/register')
      .send(
        {
          username: "user",
          email: "user@user.com",
          password: "12345"
        }
      )
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(status).toBe(200);
    expect(body.success).toBe(true)
    console.log('-----------------------------------');
    
    console.log(body.data.id);
    console.log('-----------------------------------');
    userId = body.data.id
  })

  test('test user register duplicated email', async () => {
    const { status, body } = await request(server)
      .post('/user/register')
      .send(
        {
          email: "user@user.com",
          password: "12345"
        }
      )
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(status).toBe(500);
    expect(body.success).toBe(false)

    // global.myUrlShorterResponse = body.urlShorted
  })

  test('test login user', async () => {
    const { status, body } = await request(server)
      .post('/user/login')
      .send(
        {
          email: "user@user.com",
          password: "12345"
        }
      )
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(status).toBe(200);
    expect(body.success).toBe(true)
    expect(typeof body.token).toEqual('string');

    testToken = body.token
  })

  test('test profile endpoint with authenticated user', async () => {
    // Assuming you have a user with the testToken generated from the login test
    const response = await request(server)
      .get('/user/profile')
      .set('Authorization', `Bearer ${testToken}`)  // Use the testToken as a bearer token
      .set('Accept', 'application/json');
  
    // Destructure properties from the response body
    const { status, body } = response;
  
    // Assertions
    expect(status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined(); // Assuming the data property exists in your response
  });

  test('test delete user', async () => {
    const { status, body } = await request(server)
      .delete(`/user/remove/${userId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(status).toBe(200);
    expect(body.success).toBe(true)

    testToken = body.token
  })
})
