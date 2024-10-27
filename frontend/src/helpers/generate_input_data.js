const INPUT_DATA_GRID_SIZE = 200;

export const SYMBOLS = ['#', '@', '$', '%', '&', '*'];

function generateCell() {
    const isEmpty = Math.random() > 0.7;
    if (isEmpty) return '.';
    const isNumeric = Math.random() > 0.05;
    if (isNumeric) return Math.floor(Math.random() * 10);
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/**
 * Generates a string representation of a square matrix filled with random cells.
 * 
 * @returns {string} A string representation of the generated matrix, where each row is separated by a newline
 * and each cell in a row is separated by a space. The matrix size is determined by INPUT_DATA_GRID_SIZE.
 * 
 * @description
 * This function creates a square matrix of size INPUT_DATA_GRID_SIZE x INPUT_DATA_GRID_SIZE.
 * Each cell in the matrix is generated using the generateCell() function.
 * The resulting matrix is then converted to a string format.
 * The generated data is also stored in window.inputData for use in Cypress tests.
 */
function generateInputData() {
    const inputData = [];
    for (let i = 0; i < INPUT_DATA_GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < INPUT_DATA_GRID_SIZE; j++) {
            row.push(generateCell());
        }
        inputData.push(row);
    }
    const finalInputData = inputData.map((row) => row.join(' ')).join('\n');
    window.inputData = finalInputData; // This is useful for cypress tests
    return finalInputData;
}

export default generateInputData;
