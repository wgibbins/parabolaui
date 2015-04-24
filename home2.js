// Functions to support drawing parabolas
// this is the poorly thought out version that only works in IE
$(function() {
    $("#go").click(clickHandler);
    canvas = document.getElementById("parabolaCanvas");
    ctx = canvas.getContext("2d");
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
    minX = -200; // -offsetX;
    maxX = 200; // offsetX;
    drawLine(0, offsetY, canvas.width, offsetY);
    drawLine(offsetX, 0, offsetX, canvas.height);   
});

var canvas;
var ctx;
var minX;
var maxX;
var offsetX;
var offsetY;

function clickHandler() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(0, offsetY, canvas.width, offsetY);
    drawLine(offsetX, 0, offsetX, canvas.height);   
    var nodeCount = $("#nodeCount").val();  
    for (var i = minX; i < maxX; i++) {
        var lastPortDigit = Math.abs(i % );
        var nodeUrl = window.location.protocol + '//' + window.location.hostname + ":4500" + lastPortDigit + "/";
        // doesn't work in Chrome, breaks same origin policy, may work in IE :-)        
        $.ajax({
            url: nodeUrl,
            data: {
                x: i,
                a: $("#a").val(),
                b: $("#b").val(),
                c: $("#c").val(),
            },
            success: drawPoint,
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }           
        });
    }
}

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.fillStyle = '#0000FF';
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawPoint(data) {
    var x = offsetX + data[0];
    var y = offsetY - data[1];
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(x, y, 3, 3);
}


