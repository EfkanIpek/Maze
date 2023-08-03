import {Cell} from "./cell.js";

export class Sudoku {
    cells = [];
    subSquares = []

    constructor(rawData) {
        rawData.forEach((number, index) => {
            let content = number;
            let row = Math.floor(index / Math.sqrt(rawData.length))
            let column = index % (Math.sqrt(rawData.length))
            this.cells.push(new Cell(content, row, column))
        })
        this.subSquares = this.getSubSquares()
    }

    display() {
        const sudokuDiv = document.getElementById('sudoku')
        sudokuDiv.style.width = Math.sqrt(this.cells.length) * 30 + "px"
        sudokuDiv.style.height = Math.sqrt(this.cells.length) * 30 + "px"
        this.cells.forEach(cell => {
            cell.display()
        })
    }

    resolve() {
        
    }

    playAMove() {
        let freeCells = this.cells.filter( c => !c.value)
        for (let cell of freeCells) {
            for (let i =0; i<10 ; i++) {
                if (this.isLegalMove(cell, i)) {
                    cell.setValue(i)

                }
            }
        }
    }

    isLegalMove(cell, number) {
        if (cell.value) {
            return false
        }
        return !(this.getCellsOnSameColumn(cell)
            .concat(this.getCellsOnSameLine(cell))
            .concat(this.getCellsInSameSubSquare(cell))
            .map(cell => cell.value)
            .includes(number))
    }

    getCellsOnSameLine(cell) {
        return this.cells.filter(c => c.row === cell.row).filter(c => c !== cell)
    }

    getCellsOnSameColumn(cell) {
        return this.cells.filter(c => c.column === cell.column).filter(c => c !== cell)
    }

    getCellsInSameSubSquare(cell) {
        let subSquare = this.subSquares.find(sub => sub.includes(cell))
        return subSquare.filter(c => c !== cell)
    }

    getSubSquares() {
        let size = Math.sqrt(this.cells.length)
        let subSquares = []
        for (let i = 0; i < size; i++) {
            subSquares.push([])
        }
        for (let cell of this.cells) {
            let cellRaw = cell.row
            let cellColumn = cell.column
            let subSquareRaw = Math.floor(cellRaw / Math.sqrt(size))
            let subSquareColumn = Math.floor(cellColumn / Math.sqrt(size))
            subSquares[Math.sqrt(size) * subSquareRaw + subSquareColumn].push(cell)
        }
        return subSquares
    }
}