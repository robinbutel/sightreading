function next_score() {

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

$(function(){
  $("#next-btn").click(next_score);

  $("#pause-btn").click(play_score);
  $("#play-btn").click(play_score);
});
