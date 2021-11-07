// Studing exercise from https://www.educative.io/blog/javascript-snake-game-tutorial

const board_border = 'black';
const board_background = "black";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

const restartBtn = document.querySelector('.restartGame');

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
  ]


let score = 0;
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
let dx = 10;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");

// Start game
main();

gen_food();

document.addEventListener("keydown", (change_direction));

restartBtn.addEventListener("click", () => {
  return main();  
});


// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Call main again
    main();
    }, 100)
    
}
    
// draw a border around the canvas
function clear_board() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
  }
  
  // Draw the snake on the canvas
  function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart)
  }


function drawFood() {
    snakeboard_ctx.fillStyle = "lightgreen";
    snakeboard_ctx.strokestyle = "darkgreen";
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}


// Draw one snake part
function drawSnakePart(snakePart) {

    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }
  

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    } 
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


function restartGame() {
    if (has_game_ended) {
        return snakeboard.reset();
    }
}
  
// Incorporating food and score
function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

  function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, snakeboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function eaten_food(part) {
      const eaten = part.x == food_x && part.y == food_y;
      if (eaten) gen_food();
    });
  }


// ARROW COMMAND
function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}



//To make the snake move one step (10px) to the right, 
//we can increase the xx-coordinate of every part of the snake by 10px (dx = +10).
//the same for the left but with negative value > (dx= -10).
function move_snake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    //dx is the horizontal velocity of the snake. We need to create a function move_snake that will update the snake.
    snake.unshift(head);

    const eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (eaten_food) {
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        //Generate new food
        gen_food();
    } else {
        // Remove the last part of the snake body
        snake.pop();
    }
  } //We then added the new head to the beginning of the snake using snake.unshift and removed the last element of the snake using snake.pop.




// Growing the snake

