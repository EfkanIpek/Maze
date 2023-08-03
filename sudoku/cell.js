export class Cell {
    value;
    row;
    column;

    constructor(content, row, column) {
        this.value = content
        this.row = row
        this.column = column
    }

    display() {
        const sudokuDiv = document.getElementById('sudoku');
        const cellDiv = document.createElement('div')
        cellDiv.classList.add('cell')
        cellDiv.id = `cell${this.row},${this.column}`
        cellDiv.innerHTML = this.value
        sudokuDiv.appendChild(cellDiv)
    }

    setValue(value) {
        this.value = value
        console.log(`cell${this.row},${this.column}`)
        const cellDiv = document.getElementById(`cell${this.row},${this.column}`)
        cellDiv.innerHTML = value
    }
}