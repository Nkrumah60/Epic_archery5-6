const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

  

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var board
var boards = [];
var numberOfArrows = 10;



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
}

function setup() {
  
  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  
}

function draw() {
  background(backgroundImg,0,0,width,height);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  showBoards();

  for (var i = 0; i < playerArrows.length; i++) {
    playerArrows[i].display();
    for (var j = 0; j < boards.length; j++) {
      if (playerArrows[i] !== undefined && boards[j] !== undefined) {
        var collision = Matter.SAT.collides(playerArrows[i].body, boards[j].body);
        if (collision.collided ) {
          console.log("e")
          boards[j].remove(j);

     
            Matter.World.remove(world, playerArrows[i].body);
          playerArrows.splice(i, 1);
          i--;

          
          
        
        }
      }
    }
    
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("numberOfArrows:" + numberOfArrows, 200, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
      
    }
  
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showBoards() {

  if (boards.length > 0) {
    if (
      boards.length < 2 &&
      boards[boards.length - 1].body.position.x < 900
    ) {
      
      var board = new Board(900,330,200,200);

      board.debug = true;

      boards.push(board);
    }

    for (var i = 0; i < boards.length; i++) {

      boards[i].display();
     // var collision = Matter.SAT.collides(playerArrows, boards[i].body);

    }
  } else {
    var board = new Board(800,230, 200, 200);
    boards.push(board);
  }
}