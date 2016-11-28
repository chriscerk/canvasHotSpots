//Globals
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();

var hotspots = {
    initCanvas: function(elements, events) {
        imageObj.onload = function() {
            var imgWidth = this.width;
            var imgHeight = this.height;

            initCanvasSize(imgWidth, imgHeight);
            refreshCanvas();
            initEvents(events, elements);
        };
        imageObj.src = image;
        console.log(imageObj);
    },
    initDialogue: function(x, y, height, width) {
        
    },
};

canvas.onmousemove=function(e){
    var isHotspot = checkIfHotspot(e);
    if(isHotspot) {
     console.log('HOTSPOT!');
  }
};

function initCanvasSize(imgWidth, imgHeight) {
    var padding = 50;

    var total = imgWidth + imgHeight;
    var myImgWidth = 250;

    var xRatio = imgWidth / total;
    var yRatio = imgHeight / total;

    var myImgHeight = myImgWidth / xRatio;

    context.canvas.width = myImgWidth + padding*2;
    context.canvas.height = myImgHeight + padding*2;
}

function checkIfHotspot(e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    var isHotspot = false;

    elements.forEach(function(el) {
          if (y > el.y - el.size && 
              y < el.y + el.size && 
              x > el.x - el.size && 
              x < el.x + el.size) {
            isHotspot = true;
            updateHotspot(el.x, el.y, 'red');
            renderHotspots('black');
            displayDialogue(el);
          }
          else{
            isHotspot = false;
          }
        });

    return isHotspot;
}

function displayDialogue(el){
    displayDialogueBox();
    displayText(el.text, 0, context.canvas.height - 200);
}

function displayText(text, x, y){
    var words = text.split(' ');
    var line = '';
    var maxWidth = context.canvas.width;

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += 25;
        }
        else {
            line = testLine;
        }
    }

    context.font = "14pt Georgia";
    context.fillText(line, x, y);
    context.fillStyle = "black";
}

function displayDialogueBox(){
    context.beginPath();
    context.strokeStyle = "gray";
    context.fillStyle = "black";
    context.fill();
    context.stroke();
}


function refreshCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageObj, 50, 50, context.canvas.width - 100, context.canvas.height - 200 - 100);
}

function renderHotspots(color) {
    // Render elements.
    elements.forEach(function(element) {
        drawHotspot(element.x, element.y, element.size, color);
        displayText(element.name, element.x - 30, element.y)
    });
}

function drawHotspot(x, y, color) {
  context.beginPath();
  context.arc(x, y, 100, 0, 2*Math.PI);
  context.strokeStyle = color;
  context.stroke();
}

function drawHotspot(x, y, size, color) {
  context.beginPath();
  context.arc(x, y , size, 0, 2*Math.PI);
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.stroke();
}

function updateHotspot(x, y, color) {
  refreshCanvas();
  drawHotspot(x, y, 75, color);
}

function initEvents(events, elements) {

  canvas.addEventListener('mouseover', function(event) {
    renderHotspots('#0096de');
  }, false);

  canvas.addEventListener('mouseout', function(event) {
    refreshCanvas();
  }, false);
   
  // Render events.
    events.forEach(function(e) {
      canvas.addEventListener(e, function(event) {
        var x = event.pageX - canvas.offsetLeft;
        var y = event.pageY - canvas.offsetTop;
         console.log(
              e + 
              ' @ (' + x + ',' + y + ')'
            );   

        elements.forEach(function(el) {
          if (y > el.y - el.size && 
              y < el.y + el.size && 
              x > el.x - el.size && 
              x < el.x + el.size) {
            console.log(
                e +
              ' element:' + 
              el.name + 
              ' @ (' + x + ',' + y + ')'
            );       
          }
        });
      }, false);
      
    });
}
