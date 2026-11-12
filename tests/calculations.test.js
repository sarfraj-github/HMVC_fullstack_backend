const { calculations } = require('../utils/calculations');

describe('Calculations', () => {
    test('should calculate the total price correctly', () => {
        const price = 10;
        const quantity = 5;
        const expectedTotal = 50;

        const actualTotal = calculations(price, quantity);

        expect(actualTotal).toBe(expectedTotal);
    });
});