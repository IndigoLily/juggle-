var things = [];
var places = [];
var sel1 = 0;
var sel2 = 0;

function setup() {
  let size = ( windowWidth > windowHeight ) ? windowHeight : windowWidth;
  size *= .65;
  size = Math.floor(size);
  createCanvas( size, size );
  const center = createVector( width/2, height/2 );
  let offset = createVector( 0, -1 );
  for( let i = 0; i < 3; i++ ) {
    things[i] = new thing();
    things[i].r = width/5;
    offset.setMag( things[i].r / sqrt(1) );
    places[i] = p5.Vector.add( center, offset );
    things[i].pos = places[i].copy();
    offset.rotate(TAU/3);
  }
}

function draw() {
  background( (128 + 256) / 2 - 1 );
  noStroke();
  if( frameCount > 30 && things[sel1].pos.x - places[sel2].x < .01 ) {
    things[sel1].pos.x = places[sel2].x;
    things[sel2].pos.x = places[sel1].x;
    things[sel1].pos.y = places[sel2].y;
    things[sel2].pos.y = places[sel1].y;
    
    let tempPlaces = places.slice();
    places[sel1] = tempPlaces[sel2];
    places[sel2] = tempPlaces[sel1];
    
    sel1 = (sel1 + 1) % 3;
    sel2 = (sel1 + 1) % 3;
    // console.log( sel1 +' '+ sel2 );
  }
  for( let i = 0; i < things.length; i++ ) {
    fill( map( i, 0, things.length-1, 0, 255 ) );
    
    things[sel1].pos.x = lerp( things[sel1].pos.x, places[sel2].x, 1/30 );
    things[sel2].pos.x = lerp( things[sel2].pos.x, places[sel1].x, 1/30 );
    things[sel1].pos.y = lerp( things[sel1].pos.y, places[sel2].y, 1/30 );
    things[sel2].pos.y = lerp( things[sel2].pos.y, places[sel1].y, 1/30 );
    
    ellipse( things[i].pos.x, things[i].pos.y, things[i].r, things[i].r);
  }
}
