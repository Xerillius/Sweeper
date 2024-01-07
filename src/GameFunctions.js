import {Tile} from './Tile'

const neighbors = [
    [-1,-1],[-1, 0],[-1, 1],
    [ 0,-1],        [ 0, 1],
    [ 1,-1],[ 1, 0],[ 1, 1]
]

const initGame = (game) => {
    let gameBoard = Array(game.yDim)
    for(let row = 0; row < game.yDim; row++){
        gameBoard[row] = Array(game.xDim).fill(2)
    }

    let minesLeft = game.totalMines

    while(minesLeft > 0){
        let row = Math.floor(Math.random() * game.yDim)
        let col = Math.floor(Math.random() * game.xDim)
        if(gameBoard[row][col] !== 1){
            gameBoard[row][col] = 1
            minesLeft -= 1
        }
    }

    for(let row = 0; row < game.yDim; row++){
        for(let col = 0; col < game.xDim; col++){
            let tile = new Tile()
            if(gameBoard[row][col] === 1){
                tile.setBomb()
            }
            gameBoard[row][col] = tile
        }
    }

    return gameBoard
}

const getMoves = (game) => {
    let activeCount = 0;
    let flagCount = 0;
    let remaining = (game.yDim * game.xDim)
    if(game.display[0] !== 'unset'){
        for(let row = 0; row < game.yDim; row++){
            for(let col = 0; col < game.xDim; col++){
                if(game.display[row][col].active){
                    activeCount++
                }
                if(game.display[row][col].flagged){
                    flagCount++
                }
            }
        }
    }
    remaining -= activeCount
    return [remaining, flagCount]
}

const checkAdjacentForBombs = (game, x, y) => {
    let bombCount = 0
    let nY, nX
    neighbors.forEach(neighbor => {
        nY = neighbor[0] + y
        nX = neighbor[1] + x
        if(nY >= 0 && nY < game.yDim && nX >= 0 && nX < game.xDim){
            if(game.display[nY][nX].isBomb){
                bombCount += 1
            }
        }
    })
    return bombCount
}

const revealNeighbors = (game, y, x, tempBoard) => {
    let repeat = []
    let nY, nX, adj
    neighbors.forEach(neighbor => {
        nY = neighbor[0] + y
        nX = neighbor[1] + x
        if(nY => 0 && nY < game.yDim && nX >= 0 && nX < game.xDim){
            if(!tempBoard[nY][nX].active){
                adj = checkAdjacentForBombs(game, nY,nX)
                tempBoard[nY][nX].setAdjacent(adj)
                tempBoard[nY][nX].setActive()
                if(adj === 0){
                    repeat.push([nY,nX])
                }
            }
        }
    })
    repeat.forEach(re => {
        tempBoard = revealNeighbors(re[0], re[1], tempBoard)
    })
    return tempBoard
}

module.exports = {
    initGame,
    getMoves,
    checkAdjacentForBombs,
    revealNeighbors
}