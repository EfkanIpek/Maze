import {Cell} from "./cell.js";

export class Maze {
    cells = [];

    constructor() {
        this.initSelector()
        this.initButton()
        let size = document.getElementById('mazeSizes');
        let difficulty = document.getElementById('mazeDifficulty');
        let mazeData = data[size.value][difficulty.value]
        mazeData.forEach(cellData => this.cells.push(new Cell(cellData)))
    }

    display() {
        const mazeSize = Math.sqrt(this.cells.length)
        const mazeDiv = document.getElementById("maze")
        let child = mazeDiv.lastElementChild
        while (child) {
            mazeDiv.removeChild(child)
            child = mazeDiv.lastElementChild
        }
        this.cells.forEach(cell => cell.display(mazeSize))
    }

    initSelector() {
        const div = document.getElementById('mazeSizes')
        const div1 = document.getElementById('mazeDifficulty')
        let sizes = Object.keys(data)
        sizes.forEach(size => {
            const option = document.createElement('option')
            option.value = size
            option.innerText = size
            div.appendChild(option)
        })
        div.onchange = () => this.onChange()
        div1.onchange = () => this.onChange()
    }

    initButton() {
        const button = document.getElementById('dfsiSolve')
        button.onclick = () => {
            let solution = DFS_iterative(this, this.cells.find(cell => cell.entrance))
            this.displaySolution(solution);
        }
    }

    onChange() {
        console.log('on change')
        let size = document.getElementById('mazeSizes');
        let difficulty = document.getElementById('mazeDifficulty');
        let mazeData = data[size.value][difficulty.value]
        this.cells = [];
        mazeData.forEach(cellData => this.cells.push(new Cell(cellData)))
        this.display()
    }

    findNeighbor(cell) {
        let neighbors = this.cells.filter(potentialNeighbor =>
            (cell.posX === potentialNeighbor.posX + 1 && cell.posY === potentialNeighbor.posY && !cell.topWall)
            | (cell.posX === potentialNeighbor.posX - 1 && cell.posY === potentialNeighbor.posY && !cell.botWall)
            | (cell.posX === potentialNeighbor.posX && cell.posY === potentialNeighbor.posY + 1 && !cell.leftWall)
            | (cell.posX === potentialNeighbor.posX && cell.posY === potentialNeighbor.posY - 1 && !cell.rightWall)
        )
        console.log('neighbors of ', cell, " are ", neighbors)
        return neighbors

    }

    displaySolution(solution) {
        solution.forEach((cell, index) => {
            setTimeout(() => {
                let cellDiv = document.getElementById(`cell${cell.posX},${cell.posY}`)
                cellDiv.style.backgroundColor = 'green'
            }, 200 * index)
        })
    }
}