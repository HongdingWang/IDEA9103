var barriers = [];
var start;
var sunLoc;
var count;
var speed;
var sunS;
var cloud = [];
var dead;
var distance;
var pacmanLoc;
var pacmanSpeed;
var pacmanH;
var move;
var armD;
var legD;
var armDS;
var legDS;

function setup() {
  createCanvas(1080, 720);
  sunLoc = createVector(0, height / 6);
  sunS = 0.1;
  for (var i = 0; i < 3; i++) {
    cloud.push(new Cloud());
  }
  speed = 4;

  start = false;
  dead = false;
  count = 0;
  distance = 0;
  pacmanLoc = createVector(width/8,4*height/5);
  pacmanSpeed = 0;
  pacmanH = height/6;
  move = false;
  armD = pacmanH/5;
  legD = pacmanH/6;
  armDS = 1.2;
  legDS = 1;
  textAlign(CENTER);
}

function draw() {
  changeDay();
  game();
}
// The start of the game
function game() {
  if (mouseIsPressed) {
    if (!dead)
      start = true;
    else {
      start = false;
      dead = false;
      distance = 0;
      barriers.splice(0,barriers.length);
      sunLoc = createVector(0, height / 6);
      count = 0;
    }
  }
  
  fill(0);
  strokeWeight(1);
  textSize(width/36);
  text("DISTANCE: "+int(distance),width/2,height/12);
  if(start && !dead){
    distance += 0.1;
  }
  stroke(0);
  strokeWeight(3);
  line(0,4*height/5,width,4*height/5);
  
  drawPacman();
  drawBarrier();
  if(dead){
    fill(0);
    textSize(height/6);
    text("GAME OVER",width/2,height/2);
  }
    
}
// Set the barriers for pacman
function drawBarrier(){
  if(random(1) < 0.01 && start && !dead)
    barriers.push(new Barrier());
  for(var i = barriers.length - 1;i >= 0;i --){
    barriers[i].draw();
    if(start && !dead)
      barriers[i].update();
    if(barriers[i].dead){
      barriers.splice(i,1);
    }
  }
}
// This part shapes barriers
function Barrier(){
  this.loc = createVector(width,4*height/5);
  this.h = random(height/12,height/5);
  this.w = random(height/30,height/20);
  this.dead = false;
  
  this.draw = function(){
    fill(mouseX,mouseY,0);
    rect(this.loc.x,this.loc.y,this.w,-this.h);
  }
  
  this.update = function(){
    this.loc.x -= speed;
    if(this.loc.x < -this.w)
      this.dead = true;
    if(this.loc.x < width/8 && this.loc.x > width/8 - this.w && pacmanLoc.y > 4*height/5-this.h){
      dead = true;
    }
  }
  
}
// create the pacman
function drawPacman(){
  stroke(0);
  fill(190, 0, distance-5);
  arc(pacmanLoc.x,pacmanLoc.y - pacmanH/2,pacmanH,pacmanH,PI/8,TWO_PI-PI/8,PIE);
 
  ellipse(pacmanLoc.x + pacmanH/5,pacmanLoc.y - pacmanH/2 - pacmanH/4,pacmanH/10,pacmanH/10);
  pacmanLoc.y += pacmanSpeed;
  pacmanSpeed += 0.1;
  if(pacmanLoc.y > 4*height/5){
    pacmanLoc.y = 4*height/5;
    move = false;
  }else{
    move = true;
  }
  if(pacmanLoc.y < pacmanH){
    dead = true;
  }
}
// Set the keyboard which can control the pacman
function keyPressed(){
  if(keyCode === UP_ARROW)
    pacmanSpeed = -6;
}

// turn the night to day and day to night of the envrioment
function changeDay() {
  if (count % 2 == 0) {
    background(158, 235, 245);
    sunLoc.x += sunS;
    sunLoc.y -= sunS;
    drawCloud();
    stroke(0);
    fill(255, 0, 0);
    ellipse(sunLoc.x, sunLoc.y, height / 15, height / 15);
    for (var i = 0; i < 360; i += 30) {
      strokeWeight(3);
      line(sunLoc.x + width / 28 * cos(radians(frameCount + i)), sunLoc.y + width / 28 * sin(radians(frameCount + i)), sunLoc.x + width / 35 * cos(radians(frameCount + i)), sunLoc.y + width / 35 * sin(radians(frameCount + i)));
    }
    if (sunLoc.y < 0) {
      sunLoc.x = width - height / 6;
      sunLoc.y = 0;
      count++;
    }
  } else {
    background(57, 61, 255);
    sunLoc.x += sunS;
    sunLoc.y += sunS;
    drawCloud();
    fill(248, 252, 191);
    ellipse(sunLoc.x, sunLoc.y, height / 15, height / 15);
    if (sunLoc.x > width) {
      sunLoc.x = 0;
      sunLoc.y = height / 6;
      count++;
    }
  }

}

// set the cloud
function drawCloud() {
  for (var i = 0; i < cloud.length; i++) {
    cloud[i].draw();
    cloud[i].update(start);
  }
}
// Create the Cloud
function Cloud() {
  this.loc = createVector(random(width), random(0, height / 6));
  this.size = random(height / 18, height / 12);
  this.speed = 2;

  this.draw = function() {
    noStroke();
    fill(255);
    ellipse(this.loc.x - this.size / 4, this.loc.y - this.size / 4, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x + this.size / 4, this.loc.y - this.size / 4, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x - this.size / 4, this.loc.y + this.size / 4, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x + this.size / 4, this.loc.y + this.size / 4, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x - this.size / 1.5, this.loc.y, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x + this.size / 1.5, this.loc.y, this.size / 1.5, this.size / 1.5);
    ellipse(this.loc.x, this.loc.y, this.size * 1.5, this.size / 1.2);
  }

  this.update = function(s) {
    if (!s) {
      this.speed = 1;
    } else {
      this.speed = speed * 0.8;
    }
    this.loc.x += this.speed;
    if (this.loc.x > width)
      this.loc.x = 0;
  }
}
