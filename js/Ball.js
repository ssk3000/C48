class Ball {
  constructor() {
    this.index = null;
    this.positionX = 300;
    this.positionY = 300;
    this.velocityX = 5;
    this.velocityY = 5;
  }

  addBall() {
    var ballIndex = "/ball";
    
    database.ref(ballIndex).set({
      positionX: this.positionX,
      positionY: this.positionY,
      velocityX: this.velocityX,
      velocityY: this.velocityY
    });
  }

  static getPlayersInfo() {
    var ballInfoRef = database.ref("ball");
    ballInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
