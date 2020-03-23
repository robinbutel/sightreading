VF = Vex.Flow;
var context;

var treble_current_y = 0;
var bass_current_y = 0;

var treble_current_x = 0;
var bass_current_x = 0;

var current_line = 0;
var lines = [];

var measures_by_line = 4;
var measure_width = 300;

var beat_per_measure = 0;

var scale = "C";
var time_signature = "4/4";

function setup_music_renderer(_measures_by_line, _measure_width) {
  measures_by_line = _measures_by_line;
  measure_width = _measure_width;
}

function draw_score(div_id, w, h, _scale="C", _timesig="4/4", scaling=0.7) {
  var div = document.getElementById(div_id);
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(w, h);
  context = renderer.getContext();
  context.scale(scaling, scaling);

  scale = _scale;
  time_signature = _timesig;

  beat_per_measure = parseInt(time_signature[0]);
}

function get_measure_width(tnotes, bnotes) {
  def_width = measure_width;

  return def_width;
}

function draw_notes(treble_notes, bass_notes, tstave, bstave) {
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
}

function draw_initial_measures(treble_notes, bass_notes) {
  w = get_measure_width(treble_notes, bass_notes);
  var stave_treble = new VF.Stave(50, current_line * 250 + 10, w);
  var stave_bass = new VF.Stave(50, current_line * 250 + 110, w);

  stave_treble.addClef("treble").addKeySignature(scale).setContext(context);
  stave_bass.addClef("bass").addKeySignature(scale).setContext(context);

  if(current_line == 0) {
    stave_treble.addTimeSignature(time_signature);
    stave_bass.addTimeSignature(time_signature);
  }

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

  treble_current_y = stave_treble.y;
  bass_current_y = stave_bass.y;

  draw_notes(treble_notes, bass_notes, stave_treble, stave_bass);

  lines.push({treble: [stave_treble], bass: [stave_bass]});
}

function draw_measure(treble_notes, bass_notes) {
  if(treble_current_x == 0) {
    draw_initial_measures(treble_notes, bass_notes);
    return;
  }

  if(lines[current_line].treble.length >= measures_by_line) {
    draw_line_ending_bar(current_line);
    current_line += 1;
    draw_initial_measures(treble_notes, bass_notes);
    return;
  }

  w = get_measure_width(treble_notes, bass_notes);
  var tstave = new VF.Stave(treble_current_x, treble_current_y, w);
  var bstave = new VF.Stave(bass_current_x, bass_current_y, w);

  tstave.setContext(context).draw();
  bstave.setContext(context).draw();

  draw_notes(treble_notes, bass_notes, tstave, bstave);

  lines[current_line].treble.push(tstave);
  lines[current_line].bass.push(bstave);
}

function draw_line_ending_bar(line) {
  if(lines[line].treble.length == 0) {
    return;
  }

  var connector = new VF.StaveConnector(lines[line].treble[lines[line].treble.length-1], lines[line].bass[lines[line].bass.length-1]);
  connector.setType(VF.StaveConnector.type.SINGLE_RIGHT);
  connector.setContext(context);
  connector.draw();
}

function draw_ending_bar() {
  if(lines[current_line].treble.length == 0) {
    return;
  }

  var connector = new VF.StaveConnector(lines[current_line].treble[lines[current_line].treble.length-1], lines[current_line].bass[lines[current_line].bass.length-1]);
  connector.setType(VF.StaveConnector.type.BOLD_DOUBLE_RIGHT);
  connector.setContext(context);
  connector.draw();
}

// TEMP: testing this
var tnotes = [
  new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "8" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "16" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "16" }),
  new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
  new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
];

var bnotes = [
  new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "8" }),
  new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "16" }),
  new VF.StaveNote({clef: "bass", keys: ["a/3"], duration: "16" }),
  new VF.StaveNote({clef: "bass", keys: ["b/3"], duration: "q" }),
  new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "h"})
];

draw_score("score", 2000, 400);
draw_measure(tnotes, bnotes);
draw_measure(tnotes, null);
draw_measure(null, bnotes);
draw_measure(tnotes, bnotes);
draw_measure(tnotes, bnotes);
draw_measure(tnotes, null);
draw_measure(null, bnotes);
draw_measure(tnotes, bnotes);
draw_ending_bar();
