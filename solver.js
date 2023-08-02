function DFS_iterative(maze, cell) {
    let stack = []
    stack.push(cell)
    let counter = 0
    while (stack.length !== 0) {
        let current = stack.pop()
        if (!current.visited) {
            current.visited = true
            let cellDiv = document.getElementById(`cell${current.posX},${current.posY}`)
            counter++
            setTimeout( () => cellDiv.style.backgroundColor = 'red', 200 * counter )
            if (current.exit) {
                return pathFromOldestParent(current)
            }
            for (let cell of maze.findNeighbor(current)) {
                if (!cell.visited) {
                    cell.parent = current
                    stack.push(cell)
                }
            }
        }
    }
    return undefined;
}


function pathFromOldestParent(current) {
    let ans = []
    if (current.parent == null) {
        ans.push(current)
        return ans
    }
    ans = this.pathFromOldestParent(current.parent);
    ans.push(current)
    return ans
}
