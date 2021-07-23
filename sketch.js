
  
var LARGEUR = 500;
var HAUTEUR = 300;
var pad;
var ball;
var gamestate = 0;
var timer = 0;
var b1, b2, b3, b4, b5;
var button;
var buttonImg;
function preload() {
  buttonImg = loadImage("game button.png");
}

function setup() {
  createCanvas(LARGEUR, HAUTEUR);
  pad = createSprite(LARGEUR * 0.5, HAUTEUR * 0.9, 100, 10);
  pad.shapeColor = "blue";
  ball = createSprite(LARGEUR * 0.5, HAUTEUR * 0.5, 10, 10);
  button = createSprite(LARGEUR * 0.5, HAUTEUR * 0.5);
  button.addImage(buttonImg);
  button.scale = 0.4;
  button.visible = false;

  groupblock = createGroup();
}
function draw() {
  background("black");
  drawSprites();

  if (gamestate === 0) {
    button.visible = false;
    groupblock.destroyEach();
    blockspawner();
    ball.velocityY = 0;
    ball.velocityX = 0;
    ball.y = HAUTEUR * 0.5;
    ball.x = LARGEUR * 0.5;
    pad.y = HAUTEUR * 0.9;
    pad.x = LARGEUR * 0.5;
    if (keyDown("space")) {
      gamestate = 1;
      ball.velocityY = 3;
      ball.velocityX = Math.random() * 10 - 5;
    }
  }
  if (gamestate === 1) {
    if (keyDown("q") && pad.x > 0) {
      pad.x -= 10;
    }

    if (keyDown("d") && pad.x < LARGEUR) {
      pad.x += 10;
    }
    createEdgeSprites();
    ball.bounceOff(pad);

    if (ball.x > LARGEUR) {
      ball.velocityX = -ball.velocityX;
    }
    if (ball.x < 0) {
      ball.velocityX = -ball.velocityX;
    }
    if (ball.y < 0) {
      ball.velocityY = -ball.velocityY;
    }
  }

  timer++;

  if (timer > 100) {
    timer = 0;
    ball.velocityY *= 1.005;
    ball.velocityX *= 1.005;
  }
  for (var k = 0; k < groupblock.length; k++) {
    if (ball.isTouching(groupblock.get(k))) {
      ball.bounceOff(groupblock.get(k));
      groupblock.get(k).destroy();
    }
  }
  if (ball.y > HAUTEUR) {
    button.visible = true;
    if (mousePressedOver(button)) {
      gamestate = 0;
  
      groupblock.destroyEach();
      //blockspawner();
    }
  }
}
function blockspawner() {
  for (i = 50; i < 451; i += 80) {
    for (j = 40; j < 120; j += 80) {
      var b1;
      b1 = createSprite(i, j, 65, 65);
      b1.shapeColor = "blue";
      groupblock.add(b1);
    }
  }

  // b2 = createSprite(130, 40, 65, 65);
  // b2.shapeColor = "yellow";
  // b3 = createSprite(210, 40, 65, 65);
  // b3.shapeColor = "green";
  // b4 = createSprite(290, 40, 65, 65);
  // b4.shapeColor = "red";
  // b5 = createSprite(370, 40, 65, 65);
  // b5.shapeColor = "blue";
  // b6 = createSprite(450, 40, 65, 65);
  // b6.shapeColor = "grey";

  // b7 = createSprite(50, 120, 65, 65);
  // b7.shapeColor = "blue";
  // b8 = createSprite(130, 120, 65, 65);
  // b8.shapeColor = "yellow";
  // b9 = createSprite(210, 120, 65, 65);
  // b9.shapeColor = "green";
  // b10 = createSprite(290, 120, 65, 65);
  // b10.shapeColor = "red";
  // b11 = createSprite(370, 120, 65, 65);
  // b11.shapeColor = "blue";
  // b12 = createSprite(450, 120, 65, 65);
  // b12.shapeColor = "grey";

  // groupblock = createGroup();
  // groupblock.add(b1);
  // groupblock.add(b2);
  // groupblock.add(b3);
  // groupblock.add(b4);
  // groupblock.add(b5);
  // groupblock.add(b6);
  // groupblock.add(b7);
  // groupblock.add(b8);
  // groupblock.add(b9);
  // groupblock.add(b10);

  // groupblock.add(b11);
  // groupblock.add(b12);
}
