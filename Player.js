/**
Draws the player and the ball for one player.
*/
class Player {
  //initialize Player properties
  constructor(playerNumber, playerColor, startSpeed, leftKey, rightKey, matchKeyArray = []) {
    console.log("creating player " + playerNumber);
    this.playerColor = playerColor;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.playerNumber = playerNumber;
    this.paddleWidth = 50;
    this.ballDiameter = 20;
    this.splashSound = loadSound("splash.wav");
    this.matchKeyArray = matchKeyArray;
    this.currentMatchKey = null;
    this.setMatchKey();

    this.playerX = this.playerNumber * 100;
    this.playerY = height - this.ballDiameter;
    this.objectX = random(this.ballDiameter, width - this.ballDiameter);
    this.objectY = 0;

    this.moveSpeed = 5;
    this.ballSpeed = startSpeed;
    this.score = 0;

    this.particles = new ParticleSystem(this.playerColor);
  }

  //should be called in the main draw loop
  draw() {
    //draw player
    this.playerColor.setAlpha(120);
    fill(this.playerColor);
    rect(this.playerX, this.playerY, this.paddleWidth, 10);

    // Draw falling object
    ellipse(this.objectX, this.objectY, this.ballDiameter, this.ballDiameter);
    
    // draw match key
    if (this.currentMatchKey != null) {
      fill(0);
      textSize(16);
      text(this.currentMatchKey, this.objectX - 5, this.objectY + 5);
    }
    
    this.objectY += this.ballSpeed; // Object speed

    let isHit = false;

    // Reset and increase difficulty on "catch"
    if (this.objectY + this.ballDiameter / 2 > this.playerY) {
      if (
        abs(this.objectX - this.playerX - this.paddleWidth / 2) <
        this.paddleWidth / 2
      ) {
        if (this.currentMatchKey != null && keyIsDown(unchar(this.currentMatchKey))) {
          isHit = true;
        }
        else if (this.currentMatchKey == null) {
          isHit = true;
        }
      }

      if (isHit) {
        console.log("player " + this.playerNumber + " scored!");

          this.score++;
          this.ballSpeed += 0.5; // Adaptive speed increase
          this.particles.emit(this.objectX, this.playerY);
          this.splashSound.play();

          //randomly choose a new match key
          this.setMatchKey();

          //reset object
          this.objectY = 0;
          this.objectX = random(this.ballDiameter, width - this.ballDiameter);
      }

      //object hits bottom of the screen
      if (this.objectY > height) {
        this.objectY = 0;
        this.objectX = random(this.ballDiameter, width - this.ballDiameter);

        //randomly choose a new match key
        this.setMatchKey();
      }
    }

    // Move player
    if (keyIsDown(this.leftKey)) this.playerX -= this.moveSpeed;
    if (keyIsDown(this.rightKey)) this.playerX += this.moveSpeed;

    // clamp position of the paddle to be on the screen
    if (this.playerX < 0) this.playerX = 0;
    if (this.playerX + this.paddleWidth > width)
      this.playerX = width - this.paddleWidth;

    fill(0);

    // Update and show particles
    this.particles.update();
    this.particles.show();
  }

  //randomly set new match key
  setMatchKey() {
    if (this.matchKeyArray.length > 0) {
      let randomMatchKeyIndex = floor(random(this.matchKeyArray.length));
      this.currentMatchKey = this.matchKeyArray[randomMatchKeyIndex];
    }
  }
}
