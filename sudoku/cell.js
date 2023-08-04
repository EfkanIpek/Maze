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
        cellDiv.innerHTML = this.value ? this.value : null
        sudokuDiv.appendChild(cellDiv)
    }

    setValue(value) {
        this.value = value
        // const cellDiv = document.getElementById(`cell${this.row},${this.column}`)
        // cellDiv.innerHTML = value
    }

    colorBackground(color) {
        let cellDiv = document.getElementById(`cell${this.row},${this.column}`)
        cellDiv.style.backgroundColor = color
    }
}