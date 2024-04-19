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