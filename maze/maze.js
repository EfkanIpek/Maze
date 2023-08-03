import {Cell} from "./cell.js";

export class Maze {
    cells = [];

    constructor() {
        this.initSelector()
        this.initButtons()
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

    initButtons() {
        const button = document.getElementById('dfsiSolve')
        button.onclick = async () => {
            let ans = DFS_iterative(this, this.cells.find(cell => cell.entrance))
            console.log(ans)
            await this.displayPath(ans.visited, 'red');
            await this.displayPath(ans.solution, 'green');
        }
        const buttonDfsRecursive = document.getElementById('dfsrSolve')
        buttonDfsRecursive.onclick = async () => {
            let ans = DFS_recursive(this, this.cells.find(cell => cell.entrance))
            await this.displayPath(ans, 'yellow')
        }
        const buttonBFS = document.getElementById('bfsSolve')
        buttonBFS.onclick = async () => {
            let ans = BFS_iterative(this, this.cells.find(cell => cell.entrance))
            console.log(ans)
            await this.displayPath(ans.visited, 'red');
            await this.displayPath(ans.solution, 'green');
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
        return this.cells.filter(potentialNeighbor =>
            (cell.posX === potentialNeighbor.posX + 1 && cell.posY === potentialNeighbor.posY && !cell.topWall)
            | (cell.posX === potentialNeighbor.posX - 1 && cell.posY === potentialNeighbor.posY && !cell.botWall)
            | (cell.posX === potentialNeighbor.posX && cell.posY === potentialNeighbor.posY + 1 && !cell.leftWall)
            | (cell.posX === potentialNeighbor.posX && cell.posY === potentialNeighbor.posY - 1 && !cell.rightWall)
        )

    }

    async displayPath(path, color) {
        for (let cell of path) {
            let cell1 = await this.highlightCell(cell)
            let cellDiv = document.getElementById(`cell${cell1.posX},${cell1.posY}`)
            cellDiv.style.backgroundColor = color
        }
    }

    highlightCell(cell) {
        return new Promise( (resolve) => {
            setTimeout( () => {
                resolve(cell);
            }, 1)
        })
    }
}