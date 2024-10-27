import { Injectable } from '@nestjs/common';

const ALLOWED_SYMBOLS = ['#', '@', '$', '%', '&', '*'];
const ALLOWED_CHARACTERS = ['.', ...ALLOWED_SYMBOLS];

type Matrix = Array<Array<number | string>>;

@Injectable()
export class AppService {
    /**
     * Takes a string representation of a matrix and returns an array representation,
     * rotated 90 degrees counter-clockwise with all numbers increased by one.
     *
     * Example:
     * First we rotate the matrix
     * . 1 2 3    3 6 9 .
     * . 4 * 6 -> 2 * 8 .
     * . 7 8 9    1 4 7 .
     * . . . .    . . . .
     * Then (or at the same time) we increase all numbers by one
     * 3 6 9 .    4 7 0 .
     * 2 * 8 . -> 3 * 9 .
     * 1 4 7 .    2 5 8 .
     * . . . .    . . . .
     *
     * And finally we output the result as an array of arrays:
     * [
     *  [4, 7, 0, '.'],
     *  [3, '*', 9, '.'],
     *  [2, 5, 8, '.'],
     *  ['.', '.', '.', '.'],
     * ]
     *
     * @param matrixString String representation of a square matrix, numbers are between 0 and 9, the only allowed characters are '.', '#', '@', '$', '%', '&', '*'
     * @returns Array representation of the matrix, rotated 90 degrees counter-clockwise with all numbers increased by one
     * @throws HttpException if matrix is not square, contains invalid characters, or numbers are not between 0 and 9
     */
    public parseAndRotateMatrix(matrixString: string) {
        // TODO: Implement this method according to the description above and specify the return type
        // @see https://docs.nestjs.com/exception-filters#throwing-standard-exceptions for a description of how to throw errors
    }

    /**
     * This is simplified version of the `parseAndRotateMatrix` method.
     * It does not do validation, rotation and modification, it only exists so that you can start working on the frontend
     * immediately without having to implement the backend first.
     *
     * @param matrixString String representation of a square matrix, numbers are between 0 and 9, only allowed characters are '.', '#', '@', '$', '%', '&', '*'
     * @returns Array representation of the matrix, numbers are already parsed as numbers
     */
    public parseMatrix(matrixString: string): Matrix {
        return matrixString.split('\n').map((row) => {
            const cells = row.split(' ');
            return cells.map((cell) => {
                const number = parseInt(cell, 10);
                if (Number.isNaN(number)) return cell;
                return number;
            });
        });
    }

    /**
     * Takes an array representation of a matrix and returns an array of neighborhoods.
     * The ID of the neighborhood is the coordinates of the central cell in the matrix in the format `<rowIndex>-<cellIndex>`.
     * The type of the neighborhood is the symbol in the central cell.
     * The value of the neighborhood is the sum of all numbers in the neighborhood.
     * The cells of the neighborhood are the 3x3 matrix around the central cell.
     *
     * @param matrix Array representation of the matrix, numbers are already parsed as numbers
     * @returns Array of neighborhoods. Each neighborhood contains the type of the cell, the value of the neighborhood and the cells of the neighborhood,
     * The ID of the neighborhood is the coordinates of the central cell in the matrix.
     */
    public matrixToNeighborhoods(matrix: Matrix): any { // TODO: Define the return type of this method
        const matrixDimension = matrix.length;
        const neighborhoods = [];

        for(let i = 0; i < matrixDimension; i++) {
            for(let j = 0; j < matrixDimension; j++) {
                if (typeof matrix[i][j] === 'string' && matrix[i][j] !== '.') {
                    const cells = [
                        [matrix[i - 1]?.[j - 1], matrix[i - 1]?.[j], matrix[i - 1]?.[j + 1]],
                        [matrix[i][j - 1], matrix[i][j], matrix[i][j + 1]],
                        [matrix[i + 1]?.[j - 1], matrix[i + 1]?.[j], matrix[i + 1]?.[j + 1]]
                    ];

                    const sum = cells.flat().reduce((acc: number, cell: string | number) => {
                        return acc + (typeof cell === 'number' ? cell : 0);
                    }, 0);

                    neighborhoods.push({
                        type: matrix[i][j],
                        id: `${i}-${j}`,
                        value: sum,
                        cells,
                    });
                }
            }
        }

        return neighborhoods;
    }
}
