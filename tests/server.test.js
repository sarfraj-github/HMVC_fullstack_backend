const request = require('supertest');

// Mock PostgreSQL before importing the Express application
jest.mock('pg', () => ({
    Pool: jest.fn().mockImplementation(() => ({
        query: jest.fn().mockResolvedValue({
            rows: []
        }),

        connect: jest.fn(),

        end: jest.fn().mockResolvedValue()
    }))
}));


const app = require('../server');

describe('Backend Server Test', () => {

    test('Should return 404 for an unknown API endpoint', async () => {
        const response = await request(app).get('/api/v1/__unknown_ci_test_endpoint__');
        expect(response.statusCode).toBe(404);
    });

});