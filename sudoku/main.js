import {Sudoku} from "./sudoku.js";
import {solve} from "./solver.js"

const sudoku4x4 =
        [2, null, null, null,
        null, 1, null, 2,
        null, null, 3, null,
        null, null, null, 4]

const sudokuEasy = [
    [0,9,0,8,6,5,2,0,0],
    [0,0,5,0,1,2,0,6,8],
    [0,0,0,0,0,0,0,4,0],
    [0,0,0,0,0,8,0,5,6],
    [0,0,8,0,0,0,4,0,0],
    [4,5,0,9,0,0,0,0,0],
    [0,8,0,0,0,0,0,0,0],
    [2,4,0,1,7,0,5,0,0],
    [0,0,7,2,8,3,0,9,0]].flat(1).map(value => value ===0 ? null : value)

const sudokuNormal = [
    [7,0,8,0,0,5,6,0,3],
    [0,0,0,0,0,9,0,0,0],
    [6,0,1,7,4,0,0,0,8],
    [1,2,0,0,8,0,0,0,0],
    [0,0,6,0,0,0,8,0,0],
    [0,0,0,0,5,0,0,6,1],
    [3,0,0,0,9,8,1,0,4],
    [0,0,0,5,0,0,0,0,0],
    [9,0,7,3,0,0,5,0,2]].flat(1).map(value => value ===0 ? null : value)

const sudokuHard =[
    [0,0,8,0,0,0,5,0,0],
    [6,0,0,7,0,5,0,0,3],
    [0,9,0,8,3,2,0,0,0],
    [0,0,4,0,1,0,0,0,0],
    [3,8,0,4,0,7,0,5,1],
    [0,0,0,0,8,0,2,0,0],
    [0,0,0,1,5,9,0,7,0],
    [8,0,0,3,0,4,0,0,5],
    [0,0,9,0,0,0,1,0,0]].flat(1).map(value => value ===0 ? null : value)

const sudokuEmpty = Array(81).fill(null)
console.log(sudokuEmpty)

let sudoku = new Sudoku(sudokuHard)
console.log('legal moves', sudoku.allLegalMoves())
sudoku.display()
let solved = solve(sudoku)
solved.display()