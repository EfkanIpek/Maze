import {Maze} from "./maze.js";

let mazeInitializer = new Maze()
mazeInitializer.display()
mazeInitializer.findNeighbor(mazeInitializer.cells[8])


// console.log(DFS_iterative(mazeInitializer, mazeInitializer.cells[0]))