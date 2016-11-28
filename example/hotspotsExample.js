var elements = [
    {
        name: 'Ring A',
        y: 234,
        x: 118,
        size: 60,
        text: "Pi-Pi stacking with BZR"
  },
  {
        name: 'Ring B',
        y: 208,
        x: 231,
        size: 70,
        text: "H-bond acceptor (O, N, S) or N-heterocycle required. 1,2 annelation (N-heterocycle) increases affinity for BZR"
  },
];

var events = [
  'mouseover',
  'click',
  'mouseout'
];

//Example Image
var image = "benzodiazepine.PNG";

hotspots.initCanvas(elements, events);