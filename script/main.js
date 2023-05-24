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
// cordinats
var velocityX = 0
var velocityY = 0

var snakeBody = []

// Food 
var foodX  
var foodY  
// bounce apple variable
var bounceAppleX 
var bounceAppleY 

// Game over variable
var gameOver = false

//  set interval (Game Speed)
var interval = 200
var intervalId

// Game Loop , border condition and what will apear in start page 
function gameLoop() {
    border = document.getElementById("border")
    border.height = rows * blockSize
    border.width = cols * blockSize
    context = border.getContext("2d") //Used For Drawing on The Border

    placeFood()
    document.addEventListener("keyup",onKeyDown)
    // update()
    setInterval(update , interval) // Set Interval every 200 milliSecound will run the update  function
}
//When the pages loads (start page)
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

//starting from the corner of the page (width 900 height 600)/25*36 = 900 x 25*24=600
async function update() {
    const sounds = document.querySelectorAll(".sound")
    const loses = document.querySelectorAll(".lose")
    const bounce = document.querySelectorAll(".bounce")
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
    // bounce apple condition ( when its reachs the scores minstions the yellow apple will apper {else will gone})
    if ((score === 5) || (score === 10) || (score === 15)) {
        placeBounce('inside')
    
    if (snakeX == bounceAppleX && snakeY == bounceAppleY) {
        

         drawScore();  // to add score each time the snake consume the food
        score +=3
        snakeBody.length +=3 
        bounce[0].play()
        
        
       // After eating the food let the snake grow
        
        snakeBody.push([bounceAppleX, bounceAppleY]) 
    }
} else {
    placeBounce('outside')
}
// wining condition
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
        alert("Game Over")
        

        window.location.reload()
        return null
    }
    // If the snake hit it's body alert Game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            loses[0].play() 
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
     
  // change Diraction if you priss arrow key it will call Change Diraction  + added timing to prevent double key pressed
    async function onKeyDown(event){
              
        if (event.keyCode == 37 && velocityX !=1|| event.keyCode == 65 && velocityX !=1)
        {
        await sleep(100) 
        velocityX = -1
        velocityY = 0
        } 
        else if (event.keyCode == 38 && velocityY !=1 || event.keyCode == 87 && velocityY !=1) 
        { 
        await sleep(100)
        velocityX = 0
        velocityY = -1
        } 
        else if (event.keyCode == 39 && velocityX !=-1 || event.keyCode == 68 && velocityX !=-1) 
        { 
        await sleep(100)
        velocityX = 1
        velocityY = 0
        } 
        else if (event.keyCode == 40 && velocityY !=-1 || event.keyCode == 83 && velocityY !=-1) 
        { 
        await sleep(100)
        velocityX = 0
        velocityY = 1
        }  
               
    } 
    
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

// To move the food in a random cordinate
// Math.random is like this , return a number between (0-1)  multiplay by cols -> (0-19.9999) -> (0-19) multiply by blockSize * 25 
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

// bounce Apple position 
function placeBounce(position) {
    if(position === 'inside'){
  bounceAppleX = rows * blockSize
  bounceAppleY = cols * blockSize
  bounceAppleX = 9 * blockSize
  bounceAppleY = 15 * blockSize
    }
    
        if (position === 'outside') {
        bounceAppleX = rows * blockSize
        bounceAppleY = cols * blockSize
        bounceAppleX =  950 * blockSize
        bounceAppleY =  950 * blockSize
    }
}

// store in a function so we can call it again
function startInterval(_interval) {
  
  intervalId = setInterval(function() {
  }, _interval);
}


function getInterval() {
  return interval;
}

// Start Page Difecality Buttons Each Button Got Deffrent Interval Speed
$('#easy').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 200 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
})
    $('#medium').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 100 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
})
$('#hard').on('click', function() {
    this.style.borderStyle = (this.style.borderStyle!=='inset' ? 'inset' : 'outset'); 
    interval = 50 ;
    // clear the existing interval
    clearInterval(intervalId);
    // just start a new one
    startInterval(interval);
})