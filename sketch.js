var things = [];
var places = [];
var center;
var offset;
var count = 1;
var percent = 0;

function setup() {
  createCanvas( 512, 512 );
  center = createVector( width/2, height/2 );
  offset = createVector( 0, -1 );
  for( let i = 0; i < 3; i++ ) {
    things[i] = new thing();
    offset.setMag( things[i].r / sqrt(1) );
    places[i] = p5.Vector.add( center, offset );
    things[i].pos = places[i].copy();
    offset.rotate(TAU/3);
  }
}

function draw() {
  clear();
  noStroke();
  for( let i = 0; i < things.length; i++ ) {
    fill( map( i, 0, things.length-1, 0, 255 ) );
    let n = (i + count) % things.length;
    if( abs(things[i].pos.x - places[n].x) < 1 ) {
      count++;
      n = (i + count) % things.length;
      console.log('done');
      percent = 0;
    }
    things[i].pos.x = lerp( things[i].pos.x, places[n].x, percent / ( things[i].r * TAU ) );
    things[i].pos.y = lerp( things[i].pos.y, places[n].y, percent / ( things[i].r * TAU ) );
    percent += .5;
    ellipse( things[i].pos.x, things[i].pos.y, things[i].r, things[i].r);
  }
}
