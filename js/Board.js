class Board {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/board.png");
    

    World.add(world, this.body);
  }

remove(index){
  Matter.World.remove(world, boards[index].body);
  boards.splice(index, 1);
}

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image,0,0, this.width, this.height);
   // rectMode(CENTER)
    pop();
  }
}
