VF = Vex.Flow;
var context;

var treble_y = 0;
var bass_y = 0;

var treble_current_x = 0;
var bass_current_x = 0;

var treble_staves = [];
var bass_staves = [];

var measures_by_line = 4;
var measure_width = 300;

function setup_music_renderer(_measures_by_line, _measure_width) {
  measures_by_line = _measures_by_line;
  measure_width = _measure_width;
}

function draw_score(div_id, w, h) {
  var div = document.getElementById(div_id);
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(w, h);
  context = renderer.getContext();
}

function draw_initial_measures(treble_notes, bass_notes) {
  var stave_treble = new VF.Stave(50, 10, measure_width);
  var stave_bass = new VF.Stave(50, 110, measure_width);

  stave_treble.addClef("treble").addTimeSignature("4/4").addKeySignature("G").setContext(context);
  stave_bass.addClef("bass").addTimeSignature("4/4").setContext(context);

  var connector = new VF.StaveConnector(stave_treble, stave_bass);
  connector.setType(VF.StaveConnector.type.BRACE);
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

  bass_y = stave_bass.y;
  bass_current_x = stave_bass.width + stave_bass.x;

  var tbeams = VF.Beam.generateBeams(treble_notes);
  var bbeams = VF.Beam.generateBeams(bass_notes);

  VF.Formatter.FormatAndDraw(context, stave_treble, treble_notes);
  VF.Formatter.FormatAndDraw(context, stave_bass, bass_notes);

  tbeams.forEach(function(b) {b.setContext(context).draw()})
  bbeams.forEach(function(b) {b.setContext(context).draw()})

  treble_staves.push(stave_treble);
  bass_staves.push(stave_bass);
}

function draw_measure(treble_notes, bass_notes) {
  if(treble_current_x == 0) {
    draw_initial_measures(treble_notes, bass_notes);
    return;
  }

  var width = 300;
  var stave;

  tstave = new VF.Stave(treble_current_x, treble_y, measure_width);
  bstave = new VF.Stave(bass_current_x, bass_y, measure_width);

  tstave.setContext(context).draw();
  bstave.setContext(context).draw();

  if(treble_notes == null) {
    treble_notes = [
      new VF.StaveNote({keys: ["b/4"], duration: "1r", align_center: true }),
    ];
  }
  if(bass_notes == null) {
    bass_notes = [
      new VF.StaveNote({keys: ["b/4"], duration: "1r", align_center: true }),
    ];
  }

  var tbeams = VF.Beam.generateBeams(treble_notes);
  var bbeams = VF.Beam.generateBeams(bass_notes);

  VF.Formatter.FormatAndDraw(context, tstave, treble_notes);
  VF.Formatter.FormatAndDraw(context, bstave, bass_notes);

  tbeams.forEach(function(b) {b.setContext(context).draw()})
  bbeams.forEach(function(b) {b.setContext(context).draw()})

  treble_current_x = tstave.width + tstave.x;
  bass_current_x = bstave.width + bstave.x;

  treble_staves.push(tstave);
  bass_staves.push(bstave);
}

function draw_ending_bar() {
  if(treble_staves.length == 0) {
    return;
  }

  var connector = new VF.StaveConnector(treble_staves[treble_staves.length-1], bass_staves[bass_staves.length-1]);
  connector.setType(VF.StaveConnector.type.BOLD_DOUBLE_RIGHT);
  connector.setContext(context);
  connector.draw();
};

var tnotes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "8" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "16" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "16" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

var bnotes = [
  new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "8" }),
  new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "16" }),
  new VF.StaveNote({clef: "bass", keys: ["a/3"], duration: "16" }),
  new VF.StaveNote({clef: "bass", keys: ["b/3"], duration: "q" }),
];

draw_score("score", 1000, 1000);
draw_measure(tnotes, bnotes);
draw_measure(tnotes, null);
draw_measure(null, bnotes);
draw_ending_bar();
