function drawCircle(ctx, centerPoint, radius) {
  //console.log(centerPoint);
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
}

function setPattern(_pattern, _gap) {
  var pattern = _pattern || [3,4,5,4,3,4,5,4,3];
  var gap = _gap || 30;
  
  var center = new Vector(canvas.x/2, canvas.y/2);
  var pattern_array = new Object();

  var pattern_gap_v = gap * Math.sqrt(3) / 2; // vertical
  var pattern_gap_h = gap; // horizontal

  for (var j=0; j<pattern.length; j++) {
    var pos_y = (j+1-Math.ceil(pattern.length/2))*pattern_gap_v;
    for (var i=0; i<pattern[j]; i++) {
      var pos_x = (i-(pattern[j]-1)/2)*pattern_gap_h;
      var vector = new Vector(center.x+pos_x, center.y+pos_y);
      pattern_array[Object.keys(pattern_array).length] = vector;
    }
  }
  return pattern_array;
}

function drawPattern(ctx, dots) {
  var radius = 5;
  var len = Object.keys(dots).length;
  for (var i=0; i<len; i++) {
    drawCircle(ctx, dots[i], radius);
    // console.log(dots[i]);
  }
}
