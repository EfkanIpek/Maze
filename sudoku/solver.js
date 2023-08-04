import {Sudoku} from "./sudoku.js";

export function solve(sudoku) {
    let q = []
    let hashes = new Set()
    q.push(sudoku)
    let counter = 0
    while (q.length !== 0) {
        counter++
        if (counter%10 ===0) {
            console.log(counter)
        }
        let currentSudoku = q.pop()
        let hashedSudoku = JSON.stringify(currentSudoku)
        if (!hashes.has(hashedSudoku)) {
            hashes.add(hashedSudoku)
            if (currentSudoku.isOver()) {
                console.log('is over')
                return currentSudoku
            }
            let allLegalMoves = currentSudoku.allLegalMoves()
            allLegalMoves.sort((a, b) => a.values.length > b.values.length ? 1 : -1)
            if (allLegalMoves.length === 0) {
                continue
            }
            for (let value of allLegalMoves[0].values) {
                let neighbor = new Sudoku(null, currentSudoku.cells)
                let neighborsCell = neighbor.cells.find(cell => cell.row === allLegalMoves[0].cell.row && cell.column === allLegalMoves[0].cell.column)
                neighbor.playAMove(neighborsCell, value)
                // neighbor.display()
                let stringified = JSON.stringify(neighbor)
                if (!hashes.has(stringified)) {
                    hashes.has(stringified)
                    q.push(neighbor)
                }
            }
        }
    }


    return hashes;
}
