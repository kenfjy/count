function drawCircle(ctx, centerPoint, radius, active) {
  ctx.save();
  if (active) {
    ctx.fillStyle = "rgb(200,200,200)";
  } else {
    ctx.fillStyle = "rgb(80,80,80)";
  }
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
}

function setPattern(_pattern, _gap) {
  var pattern = _pattern || [3,4,5,4,3,4,5,4,3];
  var gap = _gap || 200;
  var offset = 0;
  
  var center = new Vector(canvas.x/2, canvas.y/2);
  var pattern_array = new Object();

  var pattern_gap_v = gap * Math.sqrt(3) / 2; // vertical
  var pattern_gap_h = gap; // horizontal

  for (var j=0; j<pattern.length; j++) {
    var pos_y = (j+1-Math.ceil(pattern.length/2))*pattern_gap_v+offset;
    for (var i=0; i<pattern[j]; i++) {
      var pos_x = (i-(pattern[j]-1)/2)*pattern_gap_h;
      var vector = new Vector(center.x+pos_x, center.y+pos_y);
      pattern_array[Object.keys(pattern_array).length] = vector;
    }
  }
  return pattern_array;
}

function drawPattern(ctx, dots, ratio) {
  var radius = 40;
  var len = Object.keys(dots).length;
  var limit = Math.floor(len * ratio);
  for (var i=0; i<len; i++) {
    if (limit > i) {
      drawCircle(ctx, dots[len-1-i], radius, true);
    } else {
      drawCircle(ctx, dots[len-1-i], radius, false);
    }
  }
}
