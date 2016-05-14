function drawCircle(ctx, centrePoint, radius) {
  ctx.beginPath();
  ctx.moveTo(this.centrePoint.x+radius, this.centrePoint.y);
  ctx.bezierCurveTo(
      this.centrePoint.x, this.centrePoint.y+radius,
      this.centrePoint.x-radius, this.centrePoint.y,
      this.centrePoint.x, this.centrePoint.y-radius
      );
  ctx.stroke();
}

var _pattern = [3,4,5,4,3,4,5,4,3];
var _gap = 6.5;

function setPattern(_p, _g) {
  var pattern = _p || _pattern;
  var gap = _g || _gap;
  
  var center = new Vector(canvas.x/2, canvas.y/2);
  var pattern_array = new Array();

  var pattern_gap_v = gap * Math.sqrt(3) / 2; // vertical
  var pattern_gap_h = gap; // horizontal

  for (var j=0; j<pattern.length; j++) {
    var pos_y = (j+1-Math.ceil(pattern.length/2))*pattern_gap_v;
    for (var i=0; i<pattern[j]; i++) {
      var pos_x = (i-(pattern[j]-1)/2)*pattern_gap_h;
      pattern_array.push(center.x+pos_x, center.y+pos_y);
    }
  }
  return pattern_array;
}

function drawPattern() {
}
