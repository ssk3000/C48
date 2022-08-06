class Game {
  constructor() {
    
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    ball = new Ball();

    form = new Form();
    form.display();

    paddle1 = createSprite(20, 300, 20, 100);

    paddle2 = createSprite(580, 300, 20, 100);

    ball0 = createSprite(300, 300, 15, 15);

    paddles = [paddle1, paddle2];


  }

  handleElements() {
    form.hide();

  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      
      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the paddles in x and y direction
        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        paddles[index - 1].position.x = x;
        paddles[index - 1].position.y = y;
      }

      // handling keyboard events
      this.handlePlayerControls();
      this.handleBall();

      drawSprites();
    }
  }
  handleBall() {
    ball.addBall();
    var ballInfoRef = database.ref("ball");
    ballInfoRef.on("value", data => {
      ballInfoRef = data.val();
      posX = ballInfoRef.velocityX;
      posY = ballInfoRef.velocityY;
    });

    ball0.velocityX = 5;
    ball0.velocityY = 5;

    if(ball0.position.y > 400 || ball0.position.y < 0) { 
      ball0.velocityY *= -1
  }
  
    if(ball0.overlap(paddle1) || ball0.overlap(paddle2)) {
      ball0.velocityX *= -1
    }
  }


  handlePlayerControls() {
    if (keyIsDown(UP_ARROW) && player.positionY <= 600 && player.positionY >= 0) {
      player.positionY -= 10;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.positionY <= 600 && player.positionY >= 0) {
      player.positionY += 10;
      player.update();
    }

  }

  
}
