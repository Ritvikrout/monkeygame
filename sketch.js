var PLAY = 1
var END = 0
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var ground, invisibleGround;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(50, 520, 10 , 10)
  monkey.addAnimation("monkey running", monkey_running)
  monkey.scale = 0.15
  
  ground = createSprite(300, 560, 600, 20)
  ground.depth = monkey.depth - 3;
  //ground.velocityX = 5
  
  invisibleGround = createSprite(300, 575, 600, 20)
  invisibleGround.visible = false;
  
  obstacleGroup = new Group()
  foodGroup = new Group()

}


function draw(){ 
  background("white")
  textSize(14)
  monkey.collide(invisibleGround)
  if (gameState === PLAY){
    

    
    if(keyDown("space") && monkey.y >= 510) {  
      monkey.velocityY =  -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.4
    
    createObstacles();
    createFruits();
  
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  
    if (monkey.isTouching(foodGroup)){
      score = score +1
      foodGroup[0].destroy();
    }
    

  }
  else if (gameState === END){
    obstacleGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)
    
    obstacleGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
   
    monkey.velocityY = 0
    
    text("Game Over", 260, 300)
    text("Press R to Restart", 240, 320)
    
    if (keyDown("r")){
      gameState = PLAY;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
    }
  }

  
  drawSprites();
  text("Score: " + score, 525, 20)
}

function createObstacles(){
  if(frameCount % 150 === 0) {
  obstacle = createSprite(700, 530, 10, 10)
  obstacle.addAnimation("obstacle", obstacleImage)
  obstacle.scale = 0.15
  obstacle.velocityX = -4
  obstacle.setCollider("circle", 0, 0, 200)
  obstacle.depth = ground.depth - 1
  obstacleGroup.add(obstacle)
  }
}

function createFruits(){
  if(frameCount % 100 === 0){
  var yposi = random(400, 300)
  banana = createSprite(700, yposi, 10, 10)
  banana.addAnimation("obstacle", bananaImage)
  banana.scale = 0.1
  banana.velocityX = -4
  banana.lifetime = 200
  foodGroup.add(banana)
  }
}


