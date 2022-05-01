var tileWidth = 40
var tileHeight = 40
var mapSize = 10

const meuMapa = new Array(mapSize).fill(new Array(mapSize).fill(0));

var canvas = document.getElementById("game");
var canvasContext = canvas.getContext("2d");

var xCoordinate = 0
var yCoordinate = 0

const generateMap = () => {
    // Create default map
    meuMapa.forEach(linha => {
        linha.forEach(pixel => {
            canvasContext.beginPath();
            canvasContext.rect(xCoordinate, yCoordinate, tileWidth, tileHeight);
            canvasContext.fillStyle = "#999999";
            canvasContext.fillRect(xCoordinate, yCoordinate, tileWidth, tileHeight)
            canvasContext.stroke();
            xCoordinate += tileWidth;
        });
        xCoordinate = 0;
        yCoordinate += tileHeight;
    });

    // Gera as paredes
    /*    
    for layer in map:
        if layer[0] == 0 or layer[0] == (DEFAULT_MAP_SIZE - 1):
            layer_aux = list()
            layer_aux.append(layer[0])
            for i in range(DEFAULT_MAP_SIZE):
                layer_aux.append(WALL)
            map[map.index(layer)] = layer_aux
        for index, column in enumerate(layer):
            if index == 1 or index == (DEFAULT_MAP_SIZE):
                layer[index] = WALL
    
    */
    


};

window.onload = function () {
    generateMap();
}
