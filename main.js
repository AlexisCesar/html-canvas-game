// Sizes definitions
var tileWidth = 40
var tileHeight = 40
var mapSize = 10

// Map objects
const FLOOR = 0;
const WALL = 1;
const DOOR = 2;

var gameMap = null;

var canvas = document.getElementById("game");
var canvasContext = canvas.getContext("2d");

const generateMap = () => {
    // Create default map
    gameMap = [];
    for (var row = 0; row < mapSize; row++) {
        var rowArray = []
        for (var col = 0; col < mapSize; col++) {
            rowArray.push(FLOOR);
        }
        gameMap.push(rowArray);
    }

    // Create walls
    gameMap[0] = new Array(mapSize).fill(1);
    gameMap[gameMap.length - 1] = new Array(mapSize).fill(WALL);
    gameMap.forEach(row => {
        row[0] = WALL;
        row[mapSize - 1] = WALL;
    });

    // Generate random door
    let directions = ['n', 's', 'e', 'w']
    let random_direction_index = Math.floor(Math.random() * directions.length);
    let door_direction = directions[random_direction_index];

    gameMapIndexes = [...Array(mapSize).keys()]
    gameMapIndexes = gameMapIndexes.slice(2, -2);
    door_location_index = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];

    if (door_direction == 'n') {
        gameMap[0][door_location_index] = DOOR;
    } else if (door_direction == 's') {
        gameMap[mapSize - 1][door_location_index] = DOOR;
    } else if (door_direction == 'e') {
        gameMap[door_location_index][0] = DOOR;
    } else if (door_direction == 'w') {
        gameMap[door_location_index][mapSize - 1] = DOOR;
    }

    // Draw
    var xCoordinate = 0
    var yCoordinate = 0

    gameMap.forEach(row => {
        row.forEach(tile => {
            canvasContext.beginPath();
            canvasContext.rect(xCoordinate, yCoordinate, tileWidth, tileHeight);
            if (tile == FLOOR)
                canvasContext.fillStyle = "#f7d9a3";
            else if (tile == WALL)
                canvasContext.fillStyle = "#a8a8a8";
            else if (tile == DOOR)
                canvasContext.fillStyle = "#23e84a";
            canvasContext.fillRect(xCoordinate, yCoordinate, tileWidth, tileHeight)
            canvasContext.stroke();
            xCoordinate += tileWidth;
        });
        xCoordinate = 0;
        yCoordinate += tileHeight;
    });

};

window.onload = function () {
    generateMap();
}