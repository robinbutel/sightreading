VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("score")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(500, 500);
var context = renderer.getContext();
// Create a stave at position 10, 40 of width 400 on the canvas.
var stave_treble = new VF.Stave(10, 10, 400);
var stave_bass = new VF.Stave(10, 110, 400);

// Add a clef and time signature.
stave_treble.addClef("treble").addTimeSignature("4/4");
stave_bass.addClef("bass").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave_treble.setContext(context).draw();
stave_bass.setContext(context).draw();

var notes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

var notes2 = [
  new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
];

// Create a voice in 4/4 and add above notes
var voices = [
	new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes),
	new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes2)]

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voices[0]]).format([voices[0]], 400);
var formatter2 = new VF.Formatter().joinVoices([voices[1]]).format([voices[1]], 400);

// Render voices
voices[0].draw(context, stave_treble);
voices[1].draw(context, stave_bass);
