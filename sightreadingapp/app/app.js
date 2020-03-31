function next_score() {

}

function start_app() {
  var options = {
    instrument: "",
    variety: 0,
    independence: 0,
    position: 0,
    octave: 0,
    chords: 0,
    leap: 2,
    accidentals: 0,
    scale: "cmaj",
    timesig:"4/4",
    bars: 8
  };

  options.instrument = _GET("instrument");
  options.variety = parseInt(_GET("v"));
  options.independence = parseInt(_GET("i"));
  options.position = parseInt(_GET("p"));
  options.octave = parseInt(_GET("o"));
  options.chords = parseInt(_GET("c"));
  options.leap = parseInt(_GET("l"));
  options.accidentals = parseInt(_GET("a"));
  options.bars = parseInt(window.location.href.indexOf("b") > -1 ? urlVars["b"] : 8);

  var scales = _GET("psc").split(",");
  if(scales.length == 0) {
    document.location.href = "/menu.html?mp";
  }
  options.scale = scales[random(scales.length)];

  var timesigs = _GET("psig").split(",");
  if(timesigs.length == 0) {
    document.location.href = "/menu.html?mp";
  }
  options.timesig = timesigs[random(timesigs.length)];

  console.log("just got options :");
  console.log(options);

  console.log("drawing everything");
  music(options);
}

playing = false;
function play_score() {
  if(playing) {
    $("#pause-btn").hide();
    $("#play-btn").show();
  } else {
    $("#pause-btn").show();
    $("#play-btn").hide();
  }

  playing = !playing;
}

function random(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

var urlVars = null;
function _GET(parameter){
  var p;
  if(window.location.href.indexOf(parameter) > -1) {
    if(urlVars == null) {
      urlVars = getUrlVars();
    }
    p = urlVars[parameter];
  } else {
    document.location.href = "/menu.html?mp";
  }
  return p;
}

$(function() {
  $("#next-btn").click(next_score);

  $("#pause-btn").click(play_score);
  $("#play-btn").click(play_score);

  start_app();
});
