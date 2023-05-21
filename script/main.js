//border 
var blockSize = 25
var rows = 20
var cols = 20
var border
var context
var score = 0


// Snake Head (x and y refers to X and Y cordenat the || snake will starts at cordenate 5,5 )
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

// Food 
var foodX  
var foodY  

// set interval
// var interval = setInterval(draw, 10);


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

// function update() {
//     if (gameOver) {

//     }else {
//         return
//     }
// }

//starting from the corner of the page (width 500 height 500)/25*20 = 500
function update() {
    const sounds = document.querySelectorAll(".sound")
    context.fillStyle = "black" 
    context.fillRect(0, 0, border.width, border.height)
    

    // Food drawing Staring with the cordenate , then width and height
    context.fillStyle = "Red"
    context.fillRect (foodX , foodY , blockSize , blockSize ) 
    
    // To let the Snake consume the Food 
    if (snakeX == foodX && snakeY == foodY) {
         drawScore();  // to add score each time the snake consume the food
        score++;
        sounds[0].play()
        
        
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
    if ((snakeX < 0 || snakeX > cols*blockSize -25 || snakeY < 0 || snakeY > rows*blockSize -25) && gameOver == false) {
        gameOver = true
        console.log("gameover")
        alert("Game Over")
        window.location.reload()
        return null
    }
    // If the snake hit it's body alert Game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert("Game Over")
            window.location.reload()
            return null
        }
    }
// Score system
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Score: ", 5, 25);

    function drawScore() {
        context.font = "20px Arial";
        context.fillStyle = "red";
        context.fillText(score,  75, 25);
        
            }
            drawScore();   
}
// change Diraction if you priss arrow key it will call Change Diraction       

function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY !=1) { // To prevent the snake from going backword !=
        velocityX = 0
        velocityY = -1
        console.log("arrowUp");
    }
    else if (event.code == "ArrowDown" && velocityY !=-1) {
        velocityX = 0
        velocityY = 1
        console.log("arrowDown");
    }
    if (event.code == "ArrowLeft" && velocityX !=1) {
        velocityX = -1
        velocityY = 0
        console.log("arrowLeft");
    }
    if (event.code == "ArrowRight" && velocityX !=-1) {
        velocityX = 1
        velocityY = 0
        console.log("arrowRight");
    }

}


// To move the food in a random cordinate
// Math.random is like this , return a number between (0-1)  multiplay by cols -> (0-19.9999) -> (0-19) multiply by blockSize * 25 
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}







// $(document).keydown(function(e) {
//     if (e.keyCode in map) {
//         map[e.keyCode] = true;
//          if((map[37] && !map[38] && !map[39] && !map[40]) ||
//             (!map[37] && map[38] && !map[39] && !map[40]) ||
//             (!map[37] && !map[38] && map[39] && !map[40]) ||
//             (!map[37] && !map[38] && !map[39] && map[40])) {
//             if ((map[37]) && velocityX !=1) {
//                 velocityX = -1
//                 velocityY = 0
//                 console.log("arrowLeft");
//             } else if ((map[38]) && velocityY !=1) { 
//                         velocityX = 0
//                         velocityY = -1
//                         console.log("arrowUp");
//             } else if ((map[39])&& velocityX !=-1) {
//                 velocityX = 1
//                 velocityY = 0
//                 console.log("arrowRight");
//             } else if ((map[40]) && velocityY !=-1) {
//                         velocityX = 0
//                         velocityY = 1
//                         console.log("arrowDown");
//                     }
//             }
//         }
//     }
// ).keyup(function(e) {
//     if (e.keyCode in map) {
//         map[e.keyCode] = false;
//     }
// });

