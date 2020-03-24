$(function(){
  $("#maximize-btn").click(toggleFullScreen);
  $("#minimize-btn").click(toggleFullScreen);


  $("#settings-btn").click((event) => { rotate(event.target) });

  $(".settings-item").click((event) => {
    target = event.target;
    if(!$(target).hasClass(".settings-item")) {
      target = $(target).parents('.settings-item')[0];
    }

    rotate($(target).children(".chevron")[0]);
  });
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

function rotate(target) {
  if(!$(target).hasClass("rotatable")) {
    target = $(target).parents('.rotatable')[0];
  }

  console.log(target);
  id = target.id;
  console.log(id);

  var position;
  if($("#" + id).hasClass("rotated")) {
    $("#" + id).removeClass("rotated");
    position = 0;
  } else {
    $("#" + id).addClass("rotated");
    position = 180;
  }

  $("#" + id).css({'-webkit-transform':'rotate('+position+'deg)',
    '-moz-transform':'rotate('+position+'deg)',
    '-o-transform':'rotate('+position+'deg)',
    '-ms-transform':'rotate('+position+'deg)',
    'transform':'rotate('+position+'deg)'}
  );
}
