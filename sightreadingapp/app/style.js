$(function() {
  $("#maximize-btn").click(toggleFullScreen);
  $("#minimize-btn").click(toggleFullScreen);

  settings_open = false;
  $("#settings-btn").click((event) => {
    rotate(event.target);
    $(".settings").toggle();
    settings_open = !settings_open;
    if(!settings_open) {
      $(".settings-item").each((i, e) => {
        close_settings_item(e);
      });
    }
  });

  $(".settings-item").click((event) => {
    event.stopPropagation();
    target = event.currentTarget;
    if($(target).hasClass("active")) {
      close_settings_item(target);
    } else {
      open_settings_item(target);
    }
  });

  $(document).click((event) => {
    if($(event.target).closest(".settings").length == 0 && $(event.target).closest("#settings-btn").length == 0) {
      $(".settings-item").each((i, e) => {
        close_settings_item(e);
      });
      $(".settings").hide();
    }
  });
});

function open_settings_item(target) {
  if($(target).hasClass("active")) {
    return;
  }

  $(".settings-item").each((i, e) => {
    close_settings_item(e);
  });

  to_open = target.id.split("-")[1];
  $("#settings-" + to_open).show(200);

  rotate($(target).children(".chevron")[0]);
  $(target).addClass("active");
}

function close_settings_item(target) {
  if(!$(target).hasClass("active")) {
    return;
  }

  to_close = target.id.split("-")[1];
  $("#settings-" + to_close).hide(200);

  rotate($(target).children(".chevron")[0]);
  $(target).removeClass("active");
}

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

  id = target.id;

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
