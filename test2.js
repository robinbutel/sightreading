VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("score")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(1000, 1000);
var context = renderer.getContext();
// Create a stave at position 10, 40 of width 400 on the canvas.
var stave = new VF.Stave(100, 10, 800);
var stave2 = new VF.Stave(100, 110, 800);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4").addKeySignature("G");
stave2.addClef("bass").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context);
stave2.setContext(context);

var connector = new VF.StaveConnector(stave, stave2);
connector.setType(VF.StaveConnector.type.BRACE);
connector.setText('Piano');
connector.setContext(context);

var line = new VF.StaveConnector(stave, stave2);
line.setType(VF.StaveConnector.type.SINGLE);
line.setContext(context);

var line_end = new VF.StaveConnector(stave, stave2);
line_end.setType(VF.StaveConnector.type.BOLD_DOUBLE_RIGHT);
line_end.setContext(context);

stave.draw();
stave2.draw();
connector.draw();
line.draw();
line_end.draw();

var notes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),

  new VF.BarNote({type: 'single'}),

  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

var notes2 = [
  new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "q" }),
  new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "q" }),
  new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "qr" }),
  new VF.StaveNote({clef: "bass", keys: ["c/3", "e/3", "g/3"], duration: "q" }),

  new VF.BarNote({type: 'single'}),

  new VF.StaveNote({clef: "bass", keys: ["d/4"], duration: "w" }),
  new VF.StaveNote({clef: "bass", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "bass", keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

VF.Formatter.FormatAndDraw(context, stave, notes);
// VF.Formatter.FormatAndDraw(context, stave2, notes2);
