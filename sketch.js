var car1, car1Img;
var car2, car2Img, car2G;
var rua, ruaImg;
var gameOver,gOverImg

var PLAY=1;
var END=0;
var gameState=1;

var pontos = 0;

var resetImg,reset;


function preload(){

car1Img = loadImage("car1.png");
car2Img = loadImage("car2.png");
ruaImg = loadImage("Road.png");
gOverImg = loadImage("game_over1.png");
resetImg = loadImage("reset.png");




}

function setup() {
 createCanvas(400,600);

 rua = createSprite(200,300);
 rua.addImage(ruaImg);
 rua.scale = 0.20;
 rua.velocityY = 7;

 car1 = createSprite(200,500,20,20);
 car1.addImage(car1Img);
 car1.scale = 0.5;

 gameOver = createSprite(200,300,20,20);
 gameOver.addImage(gOverImg);
 gameOver.scale = 0.6

 reset = createSprite(260,440,10,10);
 reset.addImage(resetImg);
 reset.scale = 0.2; 

 car2G = new Group();
 
 edges = createEdgeSprites();

}

function draw() {

 background("blue");

 if(gameState===PLAY){
  gameOver.visible = false;
  reset.visible = false;

  pontos = pontos + Math.round(getFrameRate()/60);
  car1.x = World.mouseX;

  if (rua.y > 400 ){
    rua.y = height/2;

  }

  createObtacle();

 

  if(car2G.isTouching(car1)){
    car1.destroy();
    gameState = END;

      
  }
 }else if (gameState === END) {
   gameOver.visible = true;
   reset.visible = true;
   rua.velocityY = 0;

   if(mousePressedOver(reset)) {
    restart();
  
  }  
 }
 
 
 drawSprites();

textSize(15);
fill("white");
text("pontuação: "+pontos,50,30);
  

}



function createObtacle() {
  if (World.frameCount % 35 == 0) {
  var car2 = createSprite(Math.round(random(50, 350),40, 10, 10));
  car2.addImage(car2Img);
  car2.scale=0.25;
  car2.velocityY = 20;
  car2.lifetime = 200;
  car2G.add(car2);
  }
}

function restart(){
  gameState = PLAY; 
  gameOver.visible = false;
  reset.visible = false;

  car2G.destroyEach();
  car1.changeImage(car1Img);
  pontos = 0;



}