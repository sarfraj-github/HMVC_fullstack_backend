const request = require('supertest');
const app = require('../server');
const DB_INSTANCE = require('../config/database');
const { createTestUser } = require('./helpers/user.helper');
const { cleanupDatabase } = require('./helpers/cleanup.helper');
const { TEST_EMAIL } = require('../utils/constant');

describe('Authentication API Tests ', () => {

    // Login API's Tests
    describe('POST /api/v1/auth/login', () => {

        test('Should login successfully with valid credentials', async () => {
            const response = await request(app).post(`/api/v1/auth/login`)
                .send({
                    email: "k.aastha@gmail.com",
                    password: "1234"
                });

            expect(response.statusCode).toBe(200);
        });

        test('Should reject an incorrect password', async () => {
            const response = await request(app).post(`/api/v1/auth/login`).send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

            // console.log('response :-> ', response.body);
            expect(response.statusCode).toBe(401);
        });

        test('Should reject an unregistered email', async () => {
            const response = await request(app).post(`/api/v1/auth/login`).send({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(response.statusCode).toBe(401);
        });

        test('Should reject missing credentials', async () => {
            const response = await request(app)
                .post(`/api/v1/auth/login`).send({});

            expect(response.statusCode).toBe(401);
        });

    });


    // User Registration API's Tests
    describe('POST /api/v1/auth/signup', () => {

        let testUsersIds = [];

        // This is a JEST hook that runs after each test in this describe block.
        // It cleans up the database by deleting the test user created during the tests.
        afterEach(async () => {
            try {
                // await DB_INSTANCE.query(`DELETE FROM public.user WHERE email = $1`, [TEST_EMAIL]);
                await cleanupDatabase(testUsersIds);
            } finally {
                testUsersIds = [];
            }
        });

        test('Should register a new user successfully', async () => {
            const response = await request(app).post(`/api/v1/auth/signup`).send({
                first_name: 'John',
                last_name: 'Doe',
                email: TEST_EMAIL,
                password: 'password123'
            });

            expect(response.statusCode).toBe(201);
        });

        test('Should reject registration with an existing email', async () => {

            //  For individual test, we first create a user with the TEST_EMAIL to simulate an existing user scenario.
            // const response1 = await request(app).post(`/api/v1/auth/signup`).send({
            //     first_name: 'John',
            //     last_name: 'Doe',
            //     email: TEST_EMAIL,
            //     password: 'password123'
            // });

            // expect(response1.statusCode).toBe(201);

            const response1 = await createTestUser({
                first_name: 'John',
                last_name: 'Doe',
                email: TEST_EMAIL,
                password: 'password123'
            });

            testUsersIds.push(response1.id); // Store the created user's ID for cleanup

            // Now, we attempt to register another user with the same email, which should be rejected.
            const response2 = await request(app).post(`/api/v1/auth/signup`).send({
                first_name: 'Jane',
                last_name: 'Doe',
                email: TEST_EMAIL,
                password: 'password123'
            });

            expect(response2.statusCode).toBe(409);
        });

        test('Should reject registration with missing fields', async () => {
            const response = await request(app).post(`/api/v1/auth/signup`).send({
                first_name: 'John',
            });

            expect(response.statusCode).toBe(500);
        });


    });

});