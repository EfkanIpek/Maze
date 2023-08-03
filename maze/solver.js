function BFS_iterative(maze, cell) {
    let allVisited = []
    let queue = []
    queue.push(cell)
    while (queue.length !== 0) {
        let current = queue.shift()
        if (!current.visited) {
            current.visited = true
            allVisited.push(current)
            if (current.exit) {
                return {solution : pathFromOldestParent(current), visited : allVisited}
            }
            for (let cell of maze.findNeighbor(current)) {
                if (!cell.visited) {
                    cell.parent = current
                    queue.push(cell)
                }
            }
        }
    }
    return undefined;
}

function DFS_iterative(maze, cell) {
    let allVisited = []
    let stack = []
    stack.push(cell)
    while (stack.length !== 0) {
        let current = stack.pop()
        if (!current.visited) {
            current.visited = true
            allVisited.push(current)
            if (current.exit) {
                return {solution : pathFromOldestParent(current), visited : allVisited}
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

function DFS_recursive(maze, cell) {
    if (!cell.visited) {
        cell.visited = true
        if (cell.exit) {
            return [cell]
        }
        for (let neighbor of maze.findNeighbor(cell)) {
            let path = DFS_recursive(maze, neighbor)
            if (path.length !== 0) {
                path.unshift(neighbor)
                return path
            }
        }
    }
    return []
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
