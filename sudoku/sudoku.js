import {Cell} from "./cell.js";

export class Sudoku {
    cells = [];
    subSquares = []

    constructor(rawData, cells) {
        if (rawData) {
            rawData.forEach((number, index) => {
                let content = number;
                let row = Math.floor(index / Math.sqrt(rawData.length))
                let column = index % (Math.sqrt(rawData.length))
                this.cells.push(new Cell(content, row, column))
            })
            this.subSquares = this.getSubSquares()
        }
        if (cells) {
            this.cells = []
            this.subSquares = []
            cells.forEach(cell => {
                let value = JSON.parse(JSON.stringify(cell.value))
                let row = JSON.parse(JSON.stringify(cell.row))
                let column = JSON.parse(JSON.stringify(cell.column))
                this.cells.push(new Cell(value, row, column))
            })
            this.subSquares = this.getSubSquares()
        }
    }

    display() {
        const sudokuDiv = document.getElementById('sudoku')
        let child = sudokuDiv.lastElementChild
        while (child) {
            sudokuDiv.removeChild(child)
            child = sudokuDiv.lastElementChild
        }
        sudokuDiv.style.width = Math.sqrt(this.cells.length) * 30 + "px"
        sudokuDiv.style.height = Math.sqrt(this.cells.length) * 30 + "px"
        this.cells.forEach(cell => {
            cell.display()
        })
    }

    isOver() {
        return !this.cells
            .map(c => c.value).includes(null)
    }

    playAMove(cell, number) {
        cell.setValue(number)
    }

    nextLegalMove() {
        let freeCells = this.cells.filter( c => !c.value)
        for (let cell of freeCells) {
            for (let value = 1; value< Math.sqrt(this.cells.length) +1 ; value++) {
                if (this.isLegalMove(cell, value)) {
                    return {cell , value}
                }
            }
        }
    }

    allLegalMoves() {
        let result = []
        let freeCells = this.cells.filter( c => !c.value)
        for (let cell of freeCells) {
            let ans = {cell : null, values : []}
            for (let value = 1; value<Math.sqrt(this.cells.length) +1 ; value++) {
                if (this.isLegalMove(cell, value)) {
                    ans.cell = cell
                    ans.values.push(value)
                    if (ans.values === 0) {
                        return []
                    }
                }
            }
            result.push(ans)
        }
        return result
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

    numberOfEmptyCells() {
        return this.cells.filter(cell => !cell.value).length
    }

    deepCopy() {
        let cellsCopy = JSON.parse(JSON.stringify(this.cells))
        let subSquaresCopy = JSON.parse(JSON.stringify(this.subSquares))
        let sudokuCopy = new Sudoku()
        sudokuCopy.cells = cellsCopy
        sudokuCopy.subSquares = subSquaresCopy
        return sudokuCopy
    }
}