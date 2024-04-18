### Module 1 Project | Demo

# DOM CAR GAME

### Starter Code

#### Initial Folders & Files

1. index.html
2. ./styles, holds a css file with all the styling needed via css
3. ./images, holds the image files needed for the project

## Instructions

### // v1 - Start Game

1. Create a directory called js to hold js files
2. Create inside ./js the following files:
   1. obstacle.js
   2. player.js
   3. game.js
   4. script.js
3. Link the scripts in the HTML file [ keep the files in the order above! ]
4. game.js:

   1. Create a Class called Game
   2. The constructor function:

      1. Doesn't need to accept any parameters
      2. Has the following properties:

      ```
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.height = 600;
      this.width = 500;
      ```

   3. Add a method start() that we'll use to start the game. For now the method has to:

   ```
   this.gameScreen.style.height = `${this.height}px`;
   this.gameScreen.style.width = `${this.width}px`;
   this.startScreen.style.display = "none";
   this.gameScreen.style.display = "block";
   ```

5. script.js:

   1. Create an anonymous function executed on window load
   2. Inside the function create a startButton variable to hold the HTML element with id start-button
   3. Initialize a variable called game.
   4. Add an eventListener to startButton that invokes a function called startGame()
   5. Create the startGame function and put the following inside the startGame function body:

   ```
   console.log("start game");
   game = new Game();
   game.start();
   ```

### // v2 - Add Player & Key Events

1.  player.js

    1. Create a Class called Player
    2. The constructor function:
       1. Accepts the following parameters: gameScreen, left, top, width, height, imgSrc
       2. Has the following properties:
       ```
       this.gameScreen = gameScreen;
       this.left = left;
       this.top = top;
       this.width = width;
       this.height = height;
       this.element = document.createElement("img");
       this.element.src = imgSrc;
       this.element.style.position = "absolute";
       this.element.style.width = `${width}px`;
       this.element.style.height = `${height}px`;
       this.element.style.left = `${left}px`;
       this.element.style.top = `${top}px`;
       this.gameScreen.appendChild(this.element);
       ```

2.  game.js

    1. Add the following property to the constructor:

    ```
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
    ```

3.  script.js

    1. Create a function called handleKeydown that accepts an event as parameter and place the following in the function body:

    ```
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

        console.log("key pressed", key);
    }
    ```

4.  Add an eventListner to the window that fires with keydown events invoking the handleKeydown function

### // v3 - Move Player

1. script.js

   1. Replace the console.log inside the if statement in the handleKeydown for the following:

   ```
   switch (key) {
       case "ArrowLeft":
           game.player.directionX = -1;
           break;
       case "ArrowUp":
           game.player.directionY = -1;
           break;
       case "ArrowRight":
           game.player.directionX = 1;
           break;
       case "ArrowDown":
           game.player.directionY = 1;
           break;
   }

   ```

2. player.js

   1. Add the following properties to the constructor:

   ```
   this.directionX = 0;
   this.directionY = 0;
   ```

   2. Add the method move() to track the movement of the player, keep it in the game screen and update its position:

   ```
   move() {
       this.left += this.directionX;
       this.top += this.directionY;

       if (this.left < 10) {
           this.left = 10;
       }
       if (this.top < 10) {
           this.top = 10;
       }
       if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
           this.left = this.gameScreen.offsetWidth - this.width - 10;
       }
       if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
           this.top = this.gameScreen.offsetHeight - this.height - 10;
       }

       this.updatePosition();

   }
   ```

   3. Add another method updatePosition() to update the car position:

   ```
   updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
   }
   ```

3. game.js

   1. Add the folowwing properties to the constructor:

   ```
   this.gameIntervalId;
   this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
   ```

   2. Add the following to the start() method:

   ```
   this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
   ```

   3. Create a gameLoop() method:

   ```
   gameLoop() {
        console.log("in the game loop");

        this.update();

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
   }
   ```

   4. Create an update() method, for now it will only update the player position:

   ```
   update() {
    this.player.move();
   }
   ```

### // v4 - Create Obstacles

1.  obstacle.js

    1. Create a Class called Obstacle
    2. The constructor function:
       1. Accepts the following parameter: gameScreen
       2. Has the following properties:
       ```
       this.gameScreen = gameScreen;
       this.left = Math.floor(Math.random() * 300 + 70);
       this.top = 0;
       this.width = 100;
       this.height = 150;
       this.element = document.createElement("img");
       this.element.src = "./images/redCar.png";
       this.element.style.position = "absolute";
       this.element.style.width = `${this.width}px`;
       this.element.style.height = `${this.height}px`;
       this.element.style.left = `${this.left}px`;
       this.element.style.top = `${this.top}px`;
       this.gameScreen.appendChild(this.element);
       ```

2.  game.js
    1. Add the following to the constructor properties:
    ```
    this.obstacles = [];
    ```
    2. Add the following to the update() method, after the player.move():
    ```
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
    ```

### // v5 - Obstacles Movement & Score

1. obstacle.js

   1. Add the method updatePosition():

   ```
   updatePosition() {
       this.element.style.left = `${this.left}px`;
       this.element.style.top = `${this.top}px`;
   }
   ```

   2. Add the method move():

   ```
   move() {
       this.top += 3;
       this.updatePosition();
   }
   ```

2. game.js

   1. Add the following property to the constructor:

   ```
    this.score = 0;
   ```

   2. In the update() method, between the player move and the if statement that checks the obstacles length place the following:

   ```
   for (let i = 0; i < this.obstacles.length; i++) {
     const obstacle = this.obstacles[i];
     obstacle.move();

     if (obstacle.top > this.height) {
       this.score++;
       obstacle.element.remove();
       this.obstacles.splice(i, 1);
       i--;
     }
   }
   ```

### // v6 - Check for Collisions & Update Lives

1. player.js

   1. Add the method didCollide():

   ```
   didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            console.log("Crash!");

            return true;
        } else {
            return false;
        }
   }
   ```

1. game.js

   1. Change the if statement inside the for loop in the update method to the following if/else statement:

   ```
    if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        i--;
    }
    else if (obstacle.top > this.height) {
        this.score++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
    }
   ```

### // v7 - End & Restart Game

1. game.js

   1. Add the following properties to the constructor:

   ```
    this.lives = 3;
    this.gameIsOver = false;
    this.gameEndScreen = document.getElementById("game-end");
   ```

   2. After the for loop in the update() method add:

   ```
    if (this.lives === 0) {
      this.endGame();
    }
   ```

   3. Add the the method endGame:

   ```
   endGame() {
    this.player.element.remove();
    this.obstacles.forEach(function (obstacle) {
        obstacle.element.remove();
    });

    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
   }
   ```

1. script.js

   1. Declare a restartButton variable to hold the HTML element with id restart-button
   2. Add an eventListener to restartButton that invokes a function called restartGame()
   3. Add the function restartGame() inside the window.onload:

   ```
   function restartGame() {
        location.reload();
   }
   ```

### // v8 - BONUS - Refactor to add Classes and Subclasses

1.  Inside ./js create a component.js
2.  Add the file src in the HTML
3.  component.js

    1. Inside component create a class as follows:

       ```
       class Component {
           constructor(gameScreen, left, top, width, height, imgSrc) {
           this.gameScreen = gameScreen;
           this.left = left;
           this.top = top;
           this.width = width;
           this.height = height;
           this.element = document.createElement("img");

           this.element.src = imgSrc;
           this.element.style.position = "absolute";
           this.element.style.width = `${width}px`;
           this.element.style.height = `${height}px`;
           this.element.style.left = `${left}px`;
           this.element.style.top = `${top}px`;

           this.gameScreen.appendChild(this.element);
       }

           updatePosition() {
            this.element.style.left = `${this.left}px`;
            this.element.style.top = `${this.top}px`;
           }

       }
       ```

4.  obstacle.js

    1.  Refactor the Class Obstacle to be an extension of Component:

    ```
        class Obstacle extends Component {
            constructor(gameScreen) {
                super(
                    gameScreen,
                    Math.floor(Math.random() \* 300 + 70),
                    0,
                    100,
                    150,
                    "./images/redCar.png"
                );
            }

            move() {
                // Move the obstacle down by 3px
                this.top += 3;
                // Update the obstacle's position on the screen
                this.updatePosition();
            }
        }
    ```

5.  player.js

    1.  Refactor the Class Obstacle to be an extension of Component:

    ```
        class Player extends Component {
            constructor(gameScreen, left, top, width, height, imgSrc) {
                super(gameScreen, left, top, width, height, imgSrc);
                    this.directionX = 0;
                    this.directionY = 0;
                }

            move() {
            // Update player's car position based on directionX and directionY
            this.left += this.directionX;
            this.top += this.directionY;

                // Ensure the player's car stays within the game screen
                if (this.left < 10) {
                this.left = 10;
                }
                if (this.top < 10) {
                this.top = 10;
                }
                if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
                this.left = this.gameScreen.offsetWidth - this.width - 10;
                }
                if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
                this.top = this.gameScreen.offsetHeight - this.height - 10;
                }

                // Update the player's car position on the screen
                this.updatePosition();

            }

            didCollide(obstacle) {
                const playerRect = this.element.getBoundingClientRect();
                const obstacleRect = obstacle.element.getBoundingClientRect();

                if (
                    playerRect.left < obstacleRect.right &&
                    playerRect.right > obstacleRect.left &&
                    playerRect.top < obstacleRect.bottom &&
                    playerRect.bottom > obstacleRect.top
                ) {
                    console.log("Crash!");
                    return true;
                } else {
                    return false;
                }
            }
        }
    ```

### // v9 - BONUS - Add score & lives UI

1.  Inside ./js create a scoreboard.js
2.  Add the file src in the HTML
3.  scoreboard.js

    1. Create a Class Scoreboard as follows:

       ```
       class Scoreboard {
           constructor(scoreCounter, livesCounter) {
               this.scoreCounter = scoreCounter;
               this.livesCounter = livesCounter;
           }

           init(score, lives) {
               // init score
               this.scoreCounter.textContent = `${score * 100}`;

               // init lives
               const livesEls = [];
               for (let i = 0; i < lives; i++) {
               const lifeElement = document.createElement("img");
               lifeElement.src = "./images/heart.png";
               lifeElement.style.width = "20px";
               lifeElement.style.height = "20px";
               livesEls.push(lifeElement);
               }

               this.livesCounter.append(...livesEls);
           }

           updateScore(score) {
               this.scoreCounter.textContent = `${score * 100}`;
           }

           decrementLives() {
               this.livesCounter.removeChild(this.livesCounter.lastChild);
           }
       }
       ```

4.  game.js
    1. Add the following properties to the constructor:
    ```
    this.livesCounter = document.getElementById("lives-counter");
    this.scoreCounter = document.getElementById("score-counter");
    this.scoreboard = new Scoreboard(this.scoreCounter, this.livesCounter);
    ```
    2. Add the following to the start() method before the gameIntervalId variable
    ```
    this.scoreboard.init(this.score, this.lives);
    ```
    3. In update() method add right after lives-- the following:
    ```
     this.scoreboard.decrementLives();
    ```
    4. In the update() method add right after score++ the following:
    ```
     this.scoreboard.updateScore(this.score);
    ```
