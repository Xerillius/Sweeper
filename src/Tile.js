import Hidden from './assets/hidden.png'
import Zero from './assets/zero.png'
import One from './assets/one.png'
import Two from './assets/two.png'
import Three from './assets/three.png'
import Four from './assets/four.png'
import Five from './assets/five.png'
import Six from './assets/six.png'
import Seven from './assets/seven.png'
import Eight from './assets/eight.png'
import Bomb from './assets/bomb.png'
import Flag from './assets/flag.png'

export class Tile {
    constructor(){
        this.active = false
        this.isBomb = false
        this.adjacent = -1
        this.flagged = false
        this.className = 'hidden'
        this.colors = [
            'bomb', 'zero', 'one', 'two', 'three',
            'four', 'five', 'six', 'seven', 'eight'
        ]
        this.images = {
            '-1': Hidden,
            '0': Zero,
            '1': One,
            '2': Two,
            '3': Three,
            '4': Four,
            '5': Five,
            '6': Six,
            '7': Seven,
            '8': Eight,
            'bomb': Bomb,
            'flag': Flag
        }
    }

    setY = (y) => {
        this.y = y
    }

    setX = (x) => {
        this.x = x
    }

    setActive = () => {
        this.active = true
    }

    setBomb = () => {
        this.isBomb = true
    }

    setAdjacent = (adj) => {
        this.adjacent = adj
    }

    toggleFlagged = () => {
        this.flagged = !this.flagged
    }
}