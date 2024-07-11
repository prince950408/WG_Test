const { generateMatrix, calculateWinnings } = require('../../utils/game');

describe('generateMatrix function', () => {
    it('should generate a 3x3 matrix with valid symbols', () => {
        const matrix = generateMatrix();
        expect(matrix).toHaveLength(3);
        expect(matrix[0]).toHaveLength(3);
        expect(matrix[1]).toHaveLength(3);
        expect(matrix[2]).toHaveLength(3);
    });
});

describe('calculateWinnings function', () => {
    it('should calculate winnings correctly for identical rows', () => {
        const matrix = [['A', 'A', 'A'], ['B', 'B', 'B'], ['C', 'C', 'C']];
        const winnings = calculateWinnings(matrix);
        expect(winnings).toBe(15);
    });

    it('should return 0 for no winning rows', () => {
        const matrix = [['A', 'B', 'C'], ['D', 'E', 'A'], ['B', 'C', 'D']];
        const winnings = calculateWinnings(matrix);
        expect(winnings).toBe(0);
    });
});
