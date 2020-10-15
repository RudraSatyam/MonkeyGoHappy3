var monkey;
var monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7, monkey8, monkey9, monkey10, monkey_run;
var jungle, jungleImage;
var stoneImage;
var bananaImage;
var stoneGroup;
var invisibleGround;
var bananaGroup;
var score;

function preload() {
  monkey_run = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  jungleImage = loadImage('jungle.jpg');

  stoneImage = loadImage('stone.png');

  bananaImage = loadImage('banana.png');
}  

function setup() {
  createCanvas(400, 400);

  jungle = createSprite(200, 200, 10, 10);
  jungle.addImage("backround", jungleImage)

  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("run", monkey_run);
  monkey.scale = 0.07;

  invisibleGround = createSprite(200, 375, 400, 10)
  invisibleGround.visible = false;

  stoneGroup = new Group();
  bananaGroup = new Group();

  score = 0;
}

function draw() {
  background('cyan');
    
  score = score + Math.round(getFrameRate() / 60);
  
  spawnStone();
  
  spawnBanana();
  
  monkey.collide(invisibleGround);
  
  monkey.velocityY = monkey.velocityY + 0.5;
  if (keyWentDown("space") && monkey.y > 320) {
    monkey.velocityY = -10;
  }
  
  if (bananaGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale + 0.01;
    bananaGroup.setLifetimeEach(1);
  }
  
  if (stoneGroup.isTouching(monkey)) {
    monkey.scale = monkey.scale - 0.01;
    stoneGroup.setLifetimeEach(1);
  }
  
  drawSprites();
  
  fill("black"); 
  text("Score :"+score,250,50);
}

function spawnStone() {
  if (frameCount % 60 === 0) {
    var stone = createSprite(400, 350, 10, 10);
    stone.addImage("stone", stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -8;
    stone.lifeTime = 51;
    stoneGroup.add(stone);
  }
}

function spawnBanana() {
  if (World.frameCount % 190 === 0) {
    var banana = createSprite(400, 350, 10, 10);
    banana.y = random(300, 250);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -8;
    banana.lifeTime = 51;
    bananaGroup.add(banana);
  }
}