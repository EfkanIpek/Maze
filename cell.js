export class Cell {
    posX;
    posY;
    topWall;
    rightWall;
    botWall;
    leftWall;
    entrance;
    exit;

    constructor(cellData) {
        this.posX = cellData.posX;
        this.posY= cellData.posY;
        [this.topWall,
            this.rightWall,
            this.botWall,
            this.leftWall] = cellData.walls;
        this.walls = cellData.walls;

        this.entrance = cellData.entrance
        this.exit = cellData.exit
    }

    display(mazeSize) {
        const mazeDiv = document.getElementById("maze")
        let div = document.createElement("div")
        div.id = `cell${this.posX},${this.posY}`
        div.classList.add('cell')

        if (this.topWall) {
            div.classList.add('top')
        }
        if (this.rightWall) {
            div.classList.add('right')
        }
        if (this.botWall) {
            div.classList.add('bot')
        }
        if (this.leftWall) {
            div.classList.add('left')
        }
        if (this.entrance) {
            div.classList.add('start')
        }
        if (this.exit) {
            div.classList.add('end')
        }
        div.style.flexBasis = 1 / mazeSize * 100 + "%"
        mazeDiv.appendChild(div)
    }
}