var tileWidth = 40
var tileHeight = 40
var mapSize = 10

var gameMap = null;

var canvas = document.getElementById("game");
var canvasContext = canvas.getContext("2d");

var xCoordinate = 0
var yCoordinate = 0

const generateMap = () => {
    // Create default map
    gameMap = new Array(mapSize).fill(new Array(mapSize).fill(0));
    

    // Create walls
    gameMap[0] = new Array(mapSize).fill(1);
    gameMap[gameMap.length - 1] = new Array(mapSize).fill(1);
    gameMap.forEach(row => {
        row[0] = 1;
        row[mapSize - 1] = 1;
    });

    // Draw
    gameMap.forEach(row => {
        row.forEach(tile => {
            canvasContext.beginPath();
            canvasContext.rect(xCoordinate, yCoordinate, tileWidth, tileHeight);
            if(tile == 0)
                canvasContext.fillStyle = "#f7d9a3";
            else if (tile == 1)
                canvasContext.fillStyle = "#a8a8a8";
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
