
var bgImg;
var balloon,balloonImg;
var Database,position;

function preload(){
  balloonImg=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
  bgImg=loadImage("bgImage.png");
}
function setup() {
  Database=firebase.database();


  createCanvas(1500,600);


  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("ground",balloonImg);
  balloon.scale=0.5;

  var position=Database.ref('balloon/position');
  position.on("value",readposition)
}
//readHeight
function draw() {
  background(bgImg); 

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
    updateposition(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
    updateposition(10,0);
}
else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
    updateposition(0,-10);
    balloon.scale = balloon.scale -0.01;
}
else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
    updateposition(0,10);
    balloon.scale = balloon.scale +0.01;
}

  drawSprites();
}

function updateposition(x,y){
  Database.ref("balloon/position").set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readposition(data){
  //console.log(position);
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}




