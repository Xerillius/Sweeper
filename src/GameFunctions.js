import {Tile} from './Tile'

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

module.exports = {
    initGame,
    getMoves
}