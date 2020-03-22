VF = Vex.Flow;
var context;

var treble_y = 0;
var bass_y = 0;

var treble_current_x = 0;
var bass_current_x = 0;

var staves = [];

function draw_score(div_id, w, h) {
  var div = document.getElementById(div_id);
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(1000, 1000);
  context = renderer.getContext();
  var stave_treble = new VF.Stave(100, 10, 300);
  var stave_bass = new VF.Stave(100, 110, 300);

  stave_treble.addClef("treble").addTimeSignature("4/4").addKeySignature("G").setContext(context);
  stave_bass.addClef("bass").addTimeSignature("4/4").setContext(context);

  var connector = new VF.StaveConnector(stave_treble, stave_bass);
  connector.setType(VF.StaveConnector.type.BRACE);
  connector.setText('Piano');
  connector.setContext(context);

  var line = new VF.StaveConnector(stave_treble, stave_bass);
  line.setType(VF.StaveConnector.type.SINGLE);
  line.setContext(context);

  stave_treble.draw();
  stave_bass.draw();
  connector.draw();
  line.draw();

  treble_y = stave_treble.y;
  treble_current_x = stave_treble.width + stave_treble.x;

  staves.push(stave_treble);
  staves.push(stave_bass);
}

function draw_measure(clef, notes) {
  var width = 300;
  var stave;

  if(clef == "treble") {
    stave = new VF.Stave(treble_current_x)
  } else if(clef == "bass") {

  }
}

var stave2 = new VF.Stave(stave_treble.width + stave_treble.x, stave_treble.y, 300);
stave2.setContext(context).draw();

var notes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

VF.Formatter.FormatAndDraw(context, stave_treble, notes);
