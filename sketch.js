
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground,invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")     
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
//creating monkey
monkey = createSprite(50,350,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
//monkey.debug = true;

//creating ground
ground = createSprite(400,350,900,20);
ground.velocityX = -4
ground.x = ground.width/2;
console.log(ground.x);
  
invisibleGround = createSprite(200,370,400,10);
invisibleGround.visible = false;
  
//create Obstacle and Banana Groups
obstacleGroup = createGroup();
bananaGroup = createGroup();
  
 
score = 0;
  
}


function draw() {
  
 background(180);
  
var survivalTime = 0
stroke("white");
textSize(20);
fill("white");
text("Score: " + score,500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time: " + survivalTime,100,50);


//jump when the space key is pressed
if(keyDown("space")&& monkey.y >= 300) {
monkey.velocityY = -15;
}
  
//add gravity
monkey.velocityY = monkey.velocityY + 0.8
  
monkey.collide(ground);
  
if(gameState===PLAY){
    if(ground.x<0){
    ground.x = ground.width/2;
  }
  
banana();
Obstacle();
    
  
if(bananaGroup.isTouching(monkey)){
bananaGroup.destroyEach();
score = score+1;
}
else
    {
      
if(obstacleGroup.isTouching(monkey)){
gameState=END;
//obstacleGroup.destroyEach();
ground.velocityX = 0;
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
bananaGroup.destroyEach();
obstacleGroup.setLifetimeEach(-1);
survivalTime = survivalTime+0;

      }
    }
  }




drawSprites();
}

function banana() {
    //write code here to spawn the bananas
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
     
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function Obstacle(){
 if (frameCount % 100 === 0){
var obstacle = createSprite(600,320,10,40);
obstacle.velocityX = -(6 + score/100);
obstacle.scale = 0.1;
obstacle.addImage(obstacleImage);
 
//assign scale and lifetime to the obstacle           
obstacle.lifetime = 300;
   
//add each obstacle to the group
obstacleGroup.add(obstacle);
 }
}





