let players = [];
let gameOn = true;
let winningParticles;
const WIN_SCORE = 10;

function setup() {
  createCanvas(500, 500);
  splashSound = loadSound("spalsh.wav");

  let player1Color = color("purple");
  player1Color.setAlpha(120);

  let player2Color = color("green");
  player2Color.setAlpha(120);

  winningParticles = new ParticleSystem(color("darkred"));

  //new Player(playerNumber, color, startingBallSpeed, leftMoveKeyCode, rightMoveKeyCode)
  //get keycodes here: https://www.toptal.com/developers/keycode
  player1 = new Player(1, player1Color, 2, LEFT_ARROW, RIGHT_ARROW);
  player2 = new Player(2, player2Color, 2, 65, 68);

  players.push(player1, player2);
}

function draw() {
  background(220);

  if (gameOn) {
    // Draw player
    players.forEach((player) => {
      player.draw();
    });
  } else {
    drawEndScreen();
  }

  //draw score board
  drawScore();

  // check if the game is still going
  gameOn = isGameOn();
}

function drawScore() {
  // Draw score
  fill(160);
  rect(0, 0, width, 30); //background bar

  textSize(16);

  players.forEach((player) => {
    player.playerColor.setAlpha(255);
    fill(player.playerColor);

    text("Score: " + player.score, 10 + (player.playerNumber - 1) * 100, 20);
  });
  fill(0);
}

function isGameOn() {
  let gameOver = false;

  players.forEach((player) => {
    gameOver = gameOver || player.score >= WIN_SCORE;

    if (player.score >= WIN_SCORE) winningParticles.color = player.playerColor;
  });

  return !gameOver;
}

function drawEndScreen() {
  let endMessage = "";
  players.forEach((player) => {
    if (player.score >= WIN_SCORE) {
      endMessage += "Player " + player.playerNumber + " wins!\n";
    }
  });
  winningParticles.emit(random(40, width - 40), random(50, height + 50));
  winningParticles.update();
  winningParticles.show();
  textSize(40);
  fill(winningParticles.color);
  text(endMessage, 50, height / 2);
}
