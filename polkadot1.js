var pushX = 0;
var pushXalt = 0;
var pushY = 0;
var speedfactor = 0.0;

var weight = 0.0;

var size1 = 0.0;
var size2 = 0.0;
var size3 = 0.0;

var newsize1 = 0.0;
var newsize2 = 0.0;
var newsize3 = 0.0;

var pushup1 = 0.0;
var pushup2 = 0.0;

var newpushup1 = 0.0;
var newpushup2 = 0.0;

var angle1 = 0.0;
var angle2 = 0.0;

var newangle1 = 0.0;
var newangle2 = 0.0;

var play = false;



function setup() {
  noLoop();
  w = document.getElementById('p5canvas').offsetWidth;
  h = w * .66;
  createCanvas(w, h).parent('p5canvas');
  frameRate(24);

  pushX = w / 15;
  pushY = h / 10;
  size1 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  size2 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  size3 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  newsize1 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  newsize2 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  newsize3 = (pushY - (pushY / 2.5)) * int(random(1, 4));

  pushup1 = int(random(-pushY * .25, pushY * .25)) * 5;
  pushup2 = int(random(-pushY * .25, pushY * .25)) * 5;
  newpushup1 = int(random(-pushY * .25, pushY * .25)) * 5;
  newpushup2 = int(random(-pushY * .25, pushY * .25)) * 5;


  angle1 = radians(int(random(180 / 5)) * 5);
  angle2 = radians(int(random(180 / 5)) * 5);
  newangle1 = radians(int(random(180 / 5)) * 5);
  newangle2 = radians(int(random(180 / 5)) * 5);
}

function draw() {

  var bgcolor = color('#000000');
  var color1 = color('#5fd875');
  var color2 = color('#95d9e4');
  var color3 = color('#ffffff');

  var speedfactor = 0.9;
  pushX = w / 15;
  pushY = h / 10;

  strokeWeight(pushX / 15);

  background(bgcolor);
  noFill();

  if (play === true) {
    if (frameCount % 36 === 0) {
      reset();
    }


    size1 = lerp(newsize1, size1, speedfactor);
    size2 = lerp(newsize2, size2, speedfactor);
    size3 = lerp(newsize3, size3, speedfactor);

    pushup1 = lerp(newpushup1, pushup1, speedfactor);
    pushup2 = lerp(newpushup2, pushup2, speedfactor);

    angle1 = lerp(newangle1, angle1, speedfactor);
    angle2 = lerp(newangle2, angle2, speedfactor);
  }

  stroke(color1);
  dots(size1, pushup1, angle1);
  stroke(color2);
  dots(size2, pushup2, angle2);
  stroke(color3);
  dots(size3, 0, 0);



  if (play === false) {
    fill(255, 200);
    //stroke(255, 120);
    noStroke();
    ellipse(width / 2, height / 2, height / 3, height / 3);
    noStroke();
    fill(0);
    triangle(width * .465, height * .42, width * .56, height * .5, width * .465, height * .58);
  }


}


function dots(s, pushup, angle) {

  for (var i = -1; i < width / 2 / pushX + 1; i++) {
    for (var j = -1; j < height / 2 / pushY + 1; j++) {
      if (j % 2 === 0) {
        pushXalt = pushX;
      } else {
        pushXalt = 0;
      }
      push();
      translate(i * pushX * 2 + pushXalt, j * pushY * 2 + pushY);
      rotate(angle)
      ellipse(width / pushX, pushup, s, s);
      pop();
    }
  }
}

function windowResized() {


  newW = document.getElementById('p5canvas').offsetWidth;
  tempscale = newW / w;

  weight = weight * tempscale;
  newsize1 = newsize1 * tempscale;
  newsize2 = newsize2 * tempscale;
  newsize3 = newsize3 * tempscale;
  size1 = size1 * tempscale;
  size2 = size2 * tempscale;
  size3 = size3 * tempscale;

  newpushup1 = newpushup1 * tempscale;
  newpushup2 = newpushup2 * tempscale;
  pushup1 = pushup1 * tempscale;
  pushup2 = pushup2 * tempscale;

  w = newW
  h = w * .66;
  
  resizeCanvas(w, h);
  

}

function reset() {
  newsize1 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  newsize2 = (pushY - (pushY / 2.5)) * int(random(1, 4));
  newsize3 = (pushY - (pushY / 2.5)) * int(random(1, 4));

  newpushup1 = int(random(-pushY * .25, pushY * .25)) * 5;
  newpushup2 = int(random(-pushY * .25, pushY * .25)) * 5;

  newangle1 = radians(int(random(180 / 5)) * 5);
  newangle2 = radians(int(random(180 / 5)) * 5);


  while (newpushup1 === 0) {
    newpushup1 = int(random(-pushY * .25, pushY * .25)) * 5;
  }

  while (newpushup2 === 0) {
    newpushup2 = int(random(-pushY * .25, pushY * .25)) * 5;
  }

  while (newpushup1 === newpushup2) {
    newpushup1 = int(random(-pushY * .25, pushY * .25)) * 5;
    newpushup2 = int(random(-pushY * .25, pushY * .25)) * 5;
  }

  while (newangle1 === newangle2) {
    newangle1 = radians(int(random(180 / 5)) * 5);
    newangle2 = radians(int(random(180 / 5)) * 5);
  }
}

function mouseClicked() {
  play = !play;
  if (play === true) {
    loop();
  } else {
    noLoop();
  }
}
