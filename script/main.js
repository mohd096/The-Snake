//border 
var blockSize = 25
var rows = 20
var cols = 20
var border
var context

// Snake Head (x and y refers to X and Y cordenat the || snake will starts at cordenate 5,5 )
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

// Food 
var foodX  
var foodY  

// Game over variable
var gameOver = false

//When the pages loads
window.onload = function() {
    border = document.getElementById("border")
    border.height = rows * blockSize
    border.width = cols * blockSize
    context = border.getContext("2d") //Used For Drawing on The Border

    placeFood()
    document.addEventListener("keyup",changeDirection)
    // update()
    setInterval(update, 1000/10) // Set Interval every 100 milliSecound will run the update  function
}

function update() {
    if (gameOver) {
        return;
    }
}
//starting from the corner of the page (width 500 height 500)/25*20 = 500
function update() {
    context.fillStyle = "black"
    context.fillRect(0, 0, border.width, border.height)
    context.border = "1px white"

    // Food drawing Staring with the cordenate , then width and height
    context.fillStyle = "Red"
    context.fillRect (foodX , foodY , blockSize , blockSize ) 

    // To let the Snake consume the Food 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX , foodY]) // After eating the food let the snake grow
        placeFood()
    }
    // To let the tile of the snake to start from the previous x,y cordinate (Meaning to inform other body part to the head) 
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX , snakeY]
    }
// Snake drawing Staring with the cordenate , then width and height
    context.fillStyle = "lime"
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect (snakeX , snakeY , blockSize , blockSize ) 
    
    for (let i = 0; i < snakeBody.length; i++) { //Drawing the growth of snake body
        context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize ,blockSize)
    }

    // GameOver Conditions
    // If the snake hit the wall (cols) alert Game Over
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true
        alert("Game Over")
    }
    // If the snake hit it's body alert Game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert("Game Over")
        }
    }
}
// change Diraction if you priss arrow key it will call Change Diraction
function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY !=1) { // To prevent the snake from going backword !=
        velocityX = 0
        velocityY = -1
    }
    else if (event.code == "ArrowDown" && velocityY !=-1) {
        velocityX = 0
        velocityY = 1
    }
    if (event.code == "ArrowLeft" && velocityX !=1) {
        velocityX = -1
        velocityY = 0
    }
    if (event.code == "ArrowRight" && velocityX !=-1) {
        velocityX = 1
        velocityY = 0
    }

}

// To move the food in a random cordinate
// Math.random is like this , return a number between (0-1)  multiplay by cols -> (0-19.9999) -> (0-19) multiply by blockSize * 25 
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}