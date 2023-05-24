//border 
var blockSize = 25
var rows = 24
var cols = 36
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

var bounceAppleX 
var bounceAppleY 

// set interval
// var interval = setInterval(draw, 10);


// Game over variable
var gameOver = false

//  set interval
var interval = 200
var intervalId

function gameLoop() {
    border = document.getElementById("border")
    border.height = rows * blockSize
    border.width = cols * blockSize
    context = border.getContext("2d") //Used For Drawing on The Border

    placeFood()
    document.addEventListener("keyup",onKeyDown)
    // update()
    setInterval(update , interval) // Set Interval every 100 milliSecound will run the update  function
}
//When the pages loads
// window.onload =() => {
//     gameLoop()
// }

function startGame() {
    console.log("start Game")
    toggleScreen("start-screen" , false)
    toggleScreen("border" , true)
    gameLoop()
}
function toggleScreen(id, toggle) {
    let element = document.getElementById(id)
    let display = (toggle) ? "block" : "none"
    element.style.display = display
}
// function update() {
//     if (gameOver) {

//     }else {
//         return
//     }
// }

//starting from the corner of the page (width 900 height 600)/25*36 = 900 x 25*24=600
async function update() {
    const sounds = document.querySelectorAll(".sound")
    const loses = document.querySelectorAll(".lose")
    context.fillStyle = "black" 
    context.fillRect(0, 0, border.width, border.height)
    

    // Food drawing Staring with the cordenate , then width and height
    context.fillStyle = "Red"
    context.fillRect (foodX , foodY , blockSize , blockSize ) 

    context.fillStyle = "yellow"
    context.fillRect (bounceAppleX , bounceAppleY , blockSize , blockSize )
    
    // To let the Snake consume the Food 
    if (snakeX == foodX && snakeY == foodY) {
         drawScore();  // to add score each time the snake consume the food
        score++;
        sounds[0].play()
        
       // After eating the food let the snake grow 
        snakeBody.push([foodX , foodY]) 
        placeFood()
    }
    
    if ((score === 5) || (score === 10)) {
        placeBounce()
        // console.log(placeBounce);
    
    if (snakeX == bounceAppleX && snakeY == bounceAppleY) {
        // console.log("EQUAL")
        

         drawScore();  // to add score each time the snake consume the food
        score +=3
        snakeBody.length +=3
        sounds[0].play()
        
        
       // After eating the food let the snake grow
        
        snakeBody.push([bounceAppleX, bounceAppleY]) 

        return 
    }
}

        
    
    if ((score >= 30) && gameOver == false){
    gameOver = true    
    alert ("you Win")

    window.location.reload()
        return 
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
        loses[0].play()
        console.log('lose')
        await sleep(200)
        console.log("gameover")
        alert("Game Over")
        

        window.location.reload()
        return null
    }
    // If the snake hit it's body alert Game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            loses[0].play() 
            console.log('lose')
            await sleep(200)
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



  
//    class CooldownTimer {
//     constructor(time) {
//       this.cooldownTimeout = null
//       this.cooldownTime = time
//       this.startedAt = null
//     }
    
  
//     isReady = () => {
//       return !this.cooldownTimeout
//     }
  
//     start = () => {
//       if (!this.cooldownTimeout) {
//         clearTimeout(this.cooldownTimeout)
//       }
  
//       this.startedAt = Date.now()
//       this.cooldownTimeout = setTimeout(() => {
//         this.cooldownTimeout = null
//       }, this.cooldownTime)
//     }
//   }
  
  
    async function onKeyDown(event){
        // let keyPressCooldown = new CooldownTimer(2000)
        // if (keyPressCooldown.isReady()) {
            
        //     keyPressCooldown.start() // Do not forget to start the cooldown here
            
        // }
          
        if (event.keyCode == 37 && velocityX !=1|| event.keyCode == 65 && velocityX !=1)
        {
        await sleep(100) 
        velocityX = -1
        velocityY = 0
        
        console.log("arrowLeft");
        
        } 
        else if (event.keyCode == 38 && velocityY !=1 || event.keyCode == 87 && velocityY !=1) 
        { 
        await sleep(100)
        velocityX = 0
        velocityY = -1
        console.log("arrowUp");
        } 
        else if (event.keyCode == 39 && velocityX !=-1 || event.keyCode == 68 && velocityX !=-1) 
        { 
        await sleep(100)
        velocityX = 1
        velocityY = 0
        console.log("arrowRight");
        } 
        else if (event.keyCode == 40 && velocityY !=-1 || event.keyCode == 83 && velocityY !=-1) 
        { 
        await sleep(100)
        velocityX = 0
        velocityY = 1
        console.log("arrowDown");
        }  
        
        
    } 
    
    

    async function sleep(ms) {
        console.log("Sleeping")
        return new Promise(resolve => setTimeout(resolve, ms));
      }


  

//  function changeDirection(event) {
    
//     if (event.code === "ArrowUp" && velocityY !=1) { // To prevent the snake from going backword !=
//         velocityX = 0
//         velocityY = -1
//         console.log("arrowUp");
        
//     }
//     else if (event.code === "ArrowDown" && velocityY !=-1) {
//         velocityX = 0
//         velocityY = 1
//         console.log("arrowDown");
//     }
//     if (event.code === "ArrowLeft" && velocityX !=1) {
//         velocityX = -1
//         velocityY = 0
//         console.log("arrowLeft");
//     }
//     if (event.code === "ArrowRight" && velocityX !=-1) {
//         velocityX = 1
//         velocityY = 0
//         console.log("arrowRight");
//     } 
    
// }

// To move the food in a random cordinate
// Math.random is like this , return a number between (0-1)  multiplay by cols -> (0-19.9999) -> (0-19) multiply by blockSize * 25 
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}
function placeBounce() {
  bounceAppleX = rows * blockSize
  bounceAppleY = cols * blockSize
  bounceAppleX = 9 * blockSize
  bounceAppleY = 15 * blockSize
}




// function placeBounce() {

//     bounceAppleX = Math.floor(Math.random() * cols) * blockSize
//     bounceAppleY = Math.floor(Math.random() * rows) * blockSize

//    }


// $(function () {
  
// var i = setTimeout("placeBounce()" ,200);
// console.log("come")
// setTimeout(function(){clearTimeout(i)},2000);
// console.log("gone")

// });

// window.setTimeout(placeBounce,3000)





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



// async function delayedGreeting() {
//   console.log("Hello");
//   await sleep(2000);
//   console.log("World!");
//   await sleep(2000);
//   console.log("Goodbye!");
// }

// delayedGreeting();




// store in a function so we can call it again
function startInterval(_interval) {
  // Store the id of the interval so we can clear it later
  intervalId = setInterval(function() {
    console.log(_interval);
  }, _interval);
}


function getInterval() {
  return interval;
}


$('#easy').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 200 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
    console.log(interval)
})
    $('#medium').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 100 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
    console.log(interval)
})
$('#hard').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 50 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
    console.log(interval)
})