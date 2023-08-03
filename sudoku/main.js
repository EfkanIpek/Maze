import {Sudoku} from "./sudoku.js";

const sudokuData =
        [1, null, null, null,
        null, null, null, 4,
        null, null, 2, null,
        null, 3, null, null]

const sudokuData2 = new Array(81).fill(0)

let sudoku = new Sudoku(sudokuData)
sudoku.display()
console.log(sudoku.isLegalMove(sudoku.cells[15],2))