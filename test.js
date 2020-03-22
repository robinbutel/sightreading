VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("score")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(1000, 1000);
var context = renderer.getContext();
// Create a stave at position 10, 40 of width 400 on the canvas.
var stave_treble = new VF.Stave(10, 10, 300);
var stave_bass = new VF.Stave(10, 110, 400);

// Add a clef and time signature.
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

var stave2 = new VF.Stave(stave_treble.width + stave_treble.x, stave_treble.y, 300);
stave2.setContext(context).draw();

var stave3 = new VF.Stave(stave_bass.width + stave_bass.x, stave_bass.y, 300);
stave3.setContext(context).draw();

var notes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }).addAccidental(0, new VF.Accidental("n")).addDotToAll(),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

VF.Formatter.FormatAndDraw(context, stave_treble, notes);

var notes2 = [
  new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

VF.Formatter.FormatAndDraw(context, stave2, notes2);

VF.Formatter.FormatAndDraw(context, stave3, notes2);
