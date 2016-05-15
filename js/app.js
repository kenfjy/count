"use strict";

var countTime = 300;
var scp_x = 0.1, scp_y = 0.1, ecp_x = 0.9, ecp_y = 0.9;

var endTime = 0;
var currentTime = 0;
var angle = 0;

/* canvas */
var ctx;
var pattern;

/* canvas */
var origin, canvas;
// var offset = 25;

/* timeline */
var timeline;
var timeFlag;
var timelineSize = new Vector(1000, 1000);

/* flags */
var flag = {
  play : false,
  timeline : true,
  canvas : true,
  counter : true,
  sound : true
}

$(function() {
  $("body").onload = setup();
  $("canvas").onload = draw();
})

function setup() {
  canvas = new Vector($(window).width(), $(window).height());
  origin = new Vector(0, 0);
  var c = $("#canvas");
  c.attr("width", canvas.x);
  c.attr("height", canvas.y);

  var startPoint = new Vector(0,0);
  var endPoint = new Vector(timelineSize.x, timelineSize.y);
  var startCtrlPoint = new Vector(timelineSize.x*scp_x, timelineSize.y*scp_y);
  var endCtrlPoint = new Vector(timelineSize.x*ecp_x,timelineSize.y*ecp_y);
  timeline = new Timeline(timelineSize, startPoint, startCtrlPoint, endCtrlPoint, endPoint);

  calc();

  pattern = setPattern();

  /* init views accordingly to flags */
  dispTime();
  dispHelp();
  dispCanvas();
}

function draw() {
  var cv = document.getElementById("canvas");

  /* event handlers */
  // $("body").keypress(keyDown);
  window.addEventListener('deviceorientation', handleOrientation);
  $("body").keydown(keyDown);
  $("#canvas")
    .mousedown({canvas : cv}, mouseDown)
    .mouseup(mouseUp)
    .mousemove({canvas : cv}, mouseMove);

  /* start animation */
  if (cv.getContext) {
    ctx = cv.getContext("2d");
    setInterval(loop, 50);
  }
}

function loop() {
  /* Time calculation */
  var tp = false;

  if (flag.play) {
    var timeNow = new Date().getTime();
    var ellapsedTime = countTime*1000 - (endTime - timeNow);
    var t_currentTime = currentTime;
    while (timeFlag[t_currentTime+1] <= ellapsedTime) {
      t_currentTime++;
      if (t_currentTime == countTime) {
        console.log("stop");
        flag.play = false;
        break;
      }
    }
    if (t_currentTime != currentTime) {
      currentTime = t_currentTime;
    }

    tp = timeline.bezier.getY(timeline.width*ellapsedTime/1000/countTime, timeline.width);
  } else {
    if (currentTime > 0) {
      tp = timeline.bezier.getY(timeline.width*timeFlag[currentTime]/1000/countTime, timeline.width);
    }
  }

  /* Display time */
  setTime(currentTime);

  /* Start canvas */
  ctx.clearRect(0,0,canvas.x,canvas.y);

  /* Draw background */
  ctx.save();
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.beginPath();
  ctx.rect(0, 0, canvas.x, canvas.y);
  ctx.fill();
  ctx.restore();

  if (flag.timeline) {
    timeline.drawCtrl(ctx);
    timeline.draw(ctx);
  }

  if (flag.timeline) {
    timeline.drawCurrent(ctx, tp)
  }
  // }

  var ratio = 1-tp.y/timeline.height || 0; 
  drawPattern(ctx,pattern, ratio);
}

function setTime(time) {
  /*
  var min = "0" + Math.floor(time/60);
  var sec = "0" + time%60;
  $("#counter_min").text(min.slice(-2));
  $("#counter_sec").text(sec.slice(-2));
  */

  $("#counter_min").text(Math.abs(Math.round(event.beta)));
  $("#counter_sec").text(Math.abs(Math.round(event.beta/30)));
}

function calc() {
  var y_step = timeline.height/countTime;

  var timePoint = new Object();
  for (var i=0; i<=countTime; i++) {
    timePoint[i] = timeline.bezier.getX(timeline.height - y_step*i, timeline.height);
  }

  timeFlag = new Array();
  for (var i=0; i<=countTime; i++) {
    timeFlag[i] = timePoint[i].x * (countTime * 1000) / timeline.width;
  }
}
