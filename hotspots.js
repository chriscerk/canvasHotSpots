//Globals
var canvases = [];
var contexts = [];
var imageObjs = [];

var hotspots = {
    initCanvas: function(canvasId) {
      canvases[canvasId] = document.getElementById(canvasId);
      contexts[canvasId] = canvases[canvasId].getContext('2d');
      imageObjs[canvasId] = new Image();
    },

    initCanvasWithDims: function(canvasId, width, height) {
      hotspots.initCanvas(canvasId);
      setCanvasSize(canvasId, width, height);
      refreshCanvas(canvasId, padding);
    },

    initCanvasImg: function(canvasId, image) {
      hotspots.initCanvas(canvasId);

      imageObj.onload = function() {
          var imgWidth = this.width;
          var imgHeight = this.height;

          setCanvasSize(imgWidth, imgHeight);
          refreshCanvas(canvasId, padding);
      };
      imageObj.src = image;
    },

    initCanvasImg: function(canvasId, image, padding, desiredImgWidth, elements) {
      hotspots.initCanvas(canvasId);

      imageObjs[canvasId].onload = function() {
          var imgWidth = this.width;
          var imgHeight = this.height;

          var calcImgHeight = getCalculatedHeight(imgWidth, imgHeight, desiredImgWidth);

          var canvasHeight = padding*2 + calcImgHeight;
          var canvasWidth = padding*2 + desiredImgWidth;

          setCanvasSize(canvasId, canvasWidth, canvasHeight);
          refreshCanvas(canvasId, padding);
      };
      imageObjs[canvasId].src = image;

      hotspots.initHotSpotEvents(canvasId, events, elements);

      canvases[canvasId].onmousemove=function(e) {
        var isHotspot = checkIfHotspot(canvasId, e, padding, elements);
        if(isHotspot) {
          console.log('HOTSPOT!');
        }
      };
    },

    displayDialogueBox: function(canvasId, size, padding){
      var dialogueSize = size;
      var originalCanvasHeight = contexts[canvasId].canvas.height;
      var originalCanvasWidth = contexts[canvasId].canvas.width;

      setCanvasSize(canvasId, originalCanvasWidth, originalCanvasHeight + dialogueSize);
      refreshCanvas(canvasId, padding);
    },

    initHotSpotEvents: function(canvasId, events, elements) {  

      events.forEach(function(e) {
        canvases[canvasId].addEventListener(e, function(event) {
          var x = event.pageX - canvases[canvasId].offsetLeft;
          var y = event.pageY - canvases[canvasId].offsetTop;
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
};

function getCalculatedHeight(imgWidth, imgHeight, desiredImgWidth) {

    var yxRatio = imgHeight / imgWidth;
    var myImgHeight = desiredImgWidth * yxRatio;

    return myImgHeight;
}

function setCanvasSize(canvasId, width, height) {
    contexts[canvasId].canvas.width = width;
    contexts[canvasId].canvas.height = height;
}

function checkIfHotspot(canvasId, e, padding, elements) {
    var x = e.clientX - canvases[canvasId].offsetLeft;
    var y = e.clientY - canvases[canvasId].offsetTop;
    var isHotspot = false;

    elements.forEach(function(el) {
          if (y > el.y - el.size && 
              y < el.y + el.size && 
              x > el.x - el.size && 
              x < el.x + el.size) {
            isHotspot = true;
            updateHotspot(canvasId, el.x, el.y, 'red', padding);
            renderHotspots(canvasId, 'black', elements);
            displayDialogue(canvasId, el);
          }
          else{
            isHotspot = false;
          }
        });

    return isHotspot;
}

function displayDialogue(canvasId, el){
    var originalCanvasHeight = contexts[canvasId].canvas.height;
    displayText(canvasId, el.text, 0, originalCanvasHeight - 100);
}

function displayText(canvasId, text, x, y){
    var words = text.split(' ');
    var line = '';
    var maxWidth = contexts[canvasId].canvas.width;

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = contexts[canvasId].measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            contexts[canvasId].fillText(line, x, y);
            line = words[n] + ' ';
            y += 25;
        }
        else {
            line = testLine;
        }
    }

    contexts[canvasId].font = "14pt Georgia";
    contexts[canvasId].fillText(line, x, y);
    contexts[canvasId].fillStyle = "black";
}

function refreshCanvas(canvasId, padding) {
  contexts[canvasId].clearRect(0, 0, contexts[canvasId].canvas.width, contexts[canvasId].canvas.height);
  contexts[canvasId].drawImage(
    imageObjs[canvasId], 
    padding, 
    padding, 
    contexts[canvasId].canvas.width - padding*2, 
    contexts[canvasId].canvas.height - padding*2
    );
}

function renderHotspots(canvasId, color, elements) {
    // Render elements.
    elements.forEach(function(element) {
        drawHotspot(canvasId, element.x, element.y, element.size, color);
        displayText(canvasId, element.name, element.x - 30, element.y)
    });
}

function drawHotspot(canvasId, x, y, size, color) {
  contexts[canvasId].beginPath();
  contexts[canvasId].arc(x, y , size, 0, 2*Math.PI);
  contexts[canvasId].strokeStyle = color;
  contexts[canvasId].lineWidth = 3;
  contexts[canvasId].stroke();
}

function updateHotspot(canvasId, x, y, color, padding) {
  refreshCanvas(canvasId, padding);
  drawHotspot(canvasId, x, y, 50, color);
}

function initCanvasEvents(canvasId, events) {
  events.forEach(function(e) {
    canvases[canvasId].addEventListener(e.name, function(event) {
      e.result;
      renderHotspots(canvasId, '#0096de');
    }, false);
  });
}
