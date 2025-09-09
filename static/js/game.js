const MAP_SIZE = { w: 64, h: 48 }
const DIRECTIONS = { F: 'F', B: 'B', L: 'L', R: 'R' }

function renderMapAsPixels(map, playerPos) {
    const cellSize = 10 // size of each "pixel"
    const canvas = document.createElement("canvas")
    canvas.width = MAP_SIZE.w * cellSize
    canvas.height = MAP_SIZE.h * cellSize
    const ctx = canvas.getContext("2d")

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (playerPos && row === playerPos.x && col === playerPos.y) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = map[row][col] === 1 ? "green" : "black";
            }
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
    // Clear previous and add new canvas
    const gameElement = document.getElementById("game")
    gameElement.innerHTML = ""
    gameElement.appendChild(canvas)
}

function renderMap(map, playerPos) {
    let out = ""
    for (let row = 0; row < map.length; row++) {
        let line = ""
        for (let col = 0; col < map[row].length; col++) {
            if (playerPos && row === playerPos.x && col === playerPos.y) {
                line += "P "
            } else {
                line += (map[row][col] === 1 ? "1 " : "0 ")
            }
        }
        out += line.trim() + "\n"
    }
}

function scale([width, height], factor) {
    return [width * factor, height * factor]
}

function createPlayer(position, size, direction) {
    return {
        position: { x: position.x, y: position.y },
        size: { w: size.w, h: size.h },
        direction: direction
    }
}

function move(position, direction, mapSize = MAP_SIZE) {
    let x = position.x;
    let y = position.y;

    if (direction === DIRECTIONS.F && x - 1 >= 0) x -= 1;
    if (direction === DIRECTIONS.B && x + 1 < mapSize.h) x += 1;
    if (direction === DIRECTIONS.R && y + 1 < mapSize.w) y += 1;
    if (direction === DIRECTIONS.L && y - 1 >= 0) y -= 1;
    return { x, y };
}

window.onload = () => {
    let map = Array.from({ length: MAP_SIZE.h }, () => Array(MAP_SIZE.w).fill(0))

    let player = createPlayer({ x: 10, y: 0 }, { w: 10, h: 10 }, 0)

    let playerPos = player.position

    //renderMap(map, playerPos)
    renderMapAsPixels(map, playerPos)
    window.addEventListener("keydown", (e) => {
        let newPos = null
        if (e.key == "w") {
            newPos = move(playerPos, DIRECTIONS.F)
        } else if (e.key == "a") {
            newPos = move(playerPos, DIRECTIONS.L)
        } else if (e.key == "d") {
            newPos = move(playerPos, DIRECTIONS.R)
        } else if (e.key == "s") {
            newPos = move(playerPos, DIRECTIONS.B)
        }
        if (newPos) {
            playerPos = newPos
            //renderMap(map, playerPos)
            renderMapAsPixels(map, playerPos)
        }
    })
}