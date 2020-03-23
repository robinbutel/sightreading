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
  $("#maximize-btn").click(toggleFullScreen);
  $("#minimize-btn").click(toggleFullScreen);

  $("#next-btn").click(next_score);

  $("#pause-btn").click(play_score);
  $("#play-btn").click(play_score);
});

fullscreen = false;
function toggleFullScreen() {
  if(fullscreen) {
    $("#maximize-btn").show();
    $("#minimize-btn").hide();
  } else {
    $("#maximize-btn").hide();
    $("#minimize-btn").show();
  }
  fullscreen = !fullscreen;

  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
