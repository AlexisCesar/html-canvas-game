// Sizes definitions
var tileWidth = 64
var tileHeight = 64
var mapSize = 10

// Map objects
const FLOOR = 0;
const WALL = 1;
const DOOR = 2;
const PLAYER = 3;
const COIN = 4;
const LIFE_POTION = 5;
const MONSTER = 6;
const PASSABLE_OBJECTS = [FLOOR, COIN, LIFE_POTION, MONSTER];

// Player
var playerRow = mapSize - 2;
var playerColumn = parseInt(mapSize / 2);

// Game status
var playerMoney = 0;
var playerHP = 100;
var playerKills = 0;
var currentRoom = 1;

// Sprites
var playerSprite = new Image();
playerSprite.src = './images/player.png';

var coinSprite = new Image();
coinSprite.src = './images/coin.png';

var lifePotionSprite = new Image();
lifePotionSprite.src = './images/potion.png';

var monsterSprite = new Image();
monsterSprite.src = './images/monster.png';

var floorSprite = new Image();
floorSprite.src = './images/floor.png';

var wallSprite = new Image();
wallSprite.src = './images/wall.png';


var gameMap = null;

var canvas = document.getElementById("game");
var canvasContext = canvas.getContext("2d");

const drawMap = () => {
    if (gameMap == null) {
        return;
    }
    // Draw
    var xCoordinate = 0
    var yCoordinate = 0

    gameMap.forEach(row => {
        row.forEach(tile => {
            canvasContext.beginPath();
            canvasContext.rect(xCoordinate, yCoordinate, tileWidth, tileHeight);
            if (tile == FLOOR) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == WALL) {
                canvasContext.drawImage(wallSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == DOOR) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == PLAYER) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);                
                canvasContext.drawImage(playerSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == COIN) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
                canvasContext.drawImage(coinSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == LIFE_POTION) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
                canvasContext.drawImage(lifePotionSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            else if (tile == MONSTER) {
                canvasContext.drawImage(floorSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
                canvasContext.drawImage(monsterSprite, xCoordinate, yCoordinate, tileWidth, tileHeight);
            }
            
            canvasContext.stroke();
            xCoordinate += tileWidth;
        });
        xCoordinate = 0;
        yCoordinate += tileHeight;
    });
};

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

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

    gameMapIndexes = [...Array(mapSize).keys()]
    gameMapIndexes = gameMapIndexes.slice(1, -1);

    // Generate random monsters
    let monstersOnMap = getRndInteger(currentRoom, currentRoom * 2);
    for (i = 0; i < monstersOnMap; i++) {
        let randomRow = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        let randomColumn = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        gameMap[randomRow][randomColumn] = MONSTER;
    }

    // Generate random coins
    let coinsOnMap = getRndInteger(2, 5);
    for (i = 0; i < coinsOnMap; i++) {
        let randomRow = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        let randomColumn = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        gameMap[randomRow][randomColumn] = COIN;
    }

    // Generate random life potions
    let potionsOnMap = getRndInteger(3, 6);
    for (i = 0; i < potionsOnMap; i++) {
        let randomRow = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        let randomColumn = gameMapIndexes[Math.floor(Math.random() * gameMapIndexes.length)];
        gameMap[randomRow][randomColumn] = LIFE_POTION;
    }

};

window.onload = function () {
    generateMap();
    gameMap[playerRow][playerColumn] = PLAYER;
    drawMap();

    document.addEventListener('keypress', (event) => {
        var code = event.code;

        if(code == 'KeyW') {
            if(PASSABLE_OBJECTS.includes(gameMap[playerRow - 1][playerColumn])) {
                gameMap[playerRow][playerColumn] = FLOOR;
                playerRow -= 1;
            }
            else if(gameMap[playerRow - 1][playerColumn] == DOOR) {
                generateMap();
                playerRow = mapSize - 2;
                currentRoom++;
            }
        } else if(code == 'KeyA') {
            if(PASSABLE_OBJECTS.includes(gameMap[playerRow][playerColumn - 1])) {
                gameMap[playerRow][playerColumn] = FLOOR;
                playerColumn -= 1;
            } else if(gameMap[playerRow][playerColumn - 1] == DOOR) {
                generateMap();
                playerColumn = mapSize - 2;
                currentRoom++;
            }
        } else if(code == 'KeyS') {
            if(PASSABLE_OBJECTS.includes(gameMap[playerRow + 1][playerColumn])) {
                gameMap[playerRow][playerColumn] = FLOOR;
                playerRow += 1;
            } else if(gameMap[playerRow + 1][playerColumn] == DOOR) {
                generateMap();
                playerRow = 1;
                currentRoom++;
            }
        } else if(code == 'KeyD') {
            if(PASSABLE_OBJECTS.includes(gameMap[playerRow][playerColumn + 1])) {
                gameMap[playerRow][playerColumn] = FLOOR;
                playerColumn += 1;
            } else if (gameMap[playerRow][playerColumn + 1] == DOOR) {
                generateMap();
                playerColumn = 1;
                currentRoom++;
            }
        }

        // Changes player pos if moved
        gameMap[playerRow][playerColumn] = PLAYER;

        drawMap();
    }, false);
}
