var elementsOne = [
    {
        name: 'Ring A',
        y: 263,
        x: 292,
        size: 60,
        text: "Pi-Pi stacking with BZR"
  },
  {
        name: 'Ring B',
        y: 280,
        x: 203,
        size: 60,
        text: "H-bond acceptor (O, N, S) or N-heterocycle required. 1,2 annelation (N-heterocycle) increases affinity for BZR"
  },
];

var elementsTwo = [
    {
        name: '',
        y: 50,
        x: 140,
        size: 30,
        text: "R"
  },
  {
        name: '',
        y: 37,
        x: 284,
        size: 30,
        text: "O"
  },
];

var events = [
  'mouseover',
  'click',
  'mouseout'
];

//Example Image
var image = "benzodiazepine.PNG";

hotspots.initCanvasImg("myCanvas", image, 150, 200, elementsOne);

hotspots.initCanvasImg("myOtherCanvas", image, 10, 300, elementsTwo);
