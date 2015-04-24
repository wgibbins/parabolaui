// code to calculate the parabola points

// jquery onready function to set things up.
$(function() {
    $("#go").click(clickHandler);
    canvas = document.getElementById("parabolaCanvas");
    ctx = canvas.getContext("2d");
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
    minX = -offsetX;
    maxX = offsetX;
    drawLine(0, offsetY, canvas.width, offsetY);
    drawLine(offsetX, 0, offsetX, canvas.height);       
});

// global variables to polute the global namespace
var canvas;
var ctx;
var minX;
var maxX;
var offsetX;
var offsetY;

// draw the parabola
function clickHandler() {
    var myUrl = "/calc/"; // magic string that causes nginx to send it to node.js
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the gridlines
    drawLine(0, offsetY, canvas.width, offsetY);
    drawLine(offsetX, 0, offsetX, canvas.height);               
    // make lots of ajax calls to draw the points
    for (var i = minX; i < maxX; i++) {
        $.ajax({
            url: myUrl,
            data: {
                x: i,
                a: $("#a").val(),
                b: $("#b").val(),
                c: $("#c").val(),
            },
            cache: false,
            success: drawPoint,
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
}

// draw the grid lines
function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.fillStyle = '#0000FF';
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// draw one parabola point
function drawPoint(data) {
    var x = offsetX + data[0];
    var y = offsetY - data[1];
    // only try to draw the points when they are in the Y +/- range on the canvas
    if (y > 0 && y < (offsetY * 2)) {
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x, y, 3, 3);
    }
}
