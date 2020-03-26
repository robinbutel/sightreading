var instrument = "";
var timesig = "";
var scale = "";

function validate() {
  console.log("validating");

  /* instrument */
  if(instrument == "") {
    goto_needed_tab(0);
    return;
  }
  console.log("instrument : " + instrument);

  /* rhythms settings */
  var rhythm_options = {
    variety: 0,
    independence: 0,
    position: 0,
    octave: 0,
    chords: 0,
    leap: 2,
    accidentals: 0
  }

  if($("#easy").prop("checked")) {
    // Easy Setup
    console.log("easy setup");
    level_checked = $(".easy-setup .level-item:checked");
    level = level_checked.attr("id");
    if(level == null) {
      goto_needed_tab(1);
      return;
    }
    console.log("level : " + level);
  } else {
    // Advanced Setup
    console.log("advanced setup");
    rhythm_options.variety = $(".rhythm-variety select")[0].selectedIndex;
    rhythm_options.independence = $(".hand-independence select")[0].selectedIndex;
    rhythm_options.position = $(".position select")[0].selectedIndex;
    rhythm_options.octave = $(".octave select")[0].selectedIndex;
    rhythm_options.chords = $(".chords select")[0].selectedIndex;
    rhythm_options.leap = $(".leap select")[0].selectedIndex + 2;
    rhythm_options.accidentals = $(".accidentals input").prop("checked") ? 1 : 0;

    console.log(rhythm_options);
  }

  /* time signature */
  possible_sig = [];
  $("#timesig-picker input:checked").each(function(i, e) {
    possible_sig.push(e.id[2] + "/" + e.id[3]);
  });
  if(possible_sig.length == 0) {
    goto_needed_tab(2, "timesig-picker");
    return;
  }
  console.log("possible time signatures : " + possible_sig);

  /* scale */
  possible_scale = [];
  $("#scale-picker input:checked").each(function(i, e) {
    possible_scale.push(e.id);
  });
  if(possible_scale.length == 0) {
    goto_needed_tab(2, "scale-picker");
    return;
  }
  console.log("possible scales : " + possible_scale);

  var get_str = "?instrument=" + instrument + "&v=" + rhythm_options.variety + "&i" + rhythm_options.independence +
    "&p=" + rhythm_options.position + "&o=" + rhythm_options.octave + "&c=" + rhythm_options.chords + "&l=" + rhythm_options.leap +
    "&a=" + rhythm_options.accidentals + "&psig=" + possible_sig + "&psc=" + possible_scale;
  console.log(get_str);
}

var tabs = ["instrument", "difficulty", "timesigscale"];

var current_tab = -1;

var levels = {
  1: {rhythms : "not very much"},
  2: {rhythms : "a little bit"},
  3: {rhythms : "a bit more"},
  4: {rhythms : "a lot"},
  5: {rhythms : "extremly HARD"}
}

function pick_instrument(event) {
  if($(event.currentTarget).hasClass("checked")) {
    instrument = "";
    $(event.currentTarget).toggleClass("checked");
  } else {
    instrument = event.currentTarget.id;
    $("#tab-instrument-text").html(instrument);
    $(event.currentTarget).toggleClass("checked");
    next_tab();
  }
}

function pick_level(event) {
  level = $(".easy-setup .level-item:checked").attr("id");
  $("#tab-rhythm-text").html("level " + level);
  next_tab();
}

function next_tab() {
  tab_goto(current_tab+1);
}

function goto_needed_tab(goto_tab, scroll_to="") {
  tab_goto(goto_tab);

  pop_bubble("missing-p", 1500, "#validate-btn")
  ripple($("#tab-" + tabs[goto_tab])[0]);

  if(scroll_to != "") {
    console.log($("#" + scroll_to).offset().top);
    setTimeout(function() {
      $([document.documentElement, document.body]).animate({
        scrollTop: ($("#" + scroll_to).offset().top - 200)
      }, 500);
    }, 300);
  }
}

function tab_goto(goto_tab) {
  last_tab = -1;
  if(current_tab != -1) {
    last_tab = current_tab;
  }
  if(current_tab == goto_tab) {
    return;
  }
  current_tab = goto_tab;

  if(current_tab == (tabs.length-1)) {
    $(".continue-container").hide(100);
    $(".validate-container").show(100);
  }
  console.log(current_tab);

  $("#tab-" + tabs[current_tab]).addClass("active");
  if(last_tab != -1) {
    $("#tab-" + tabs[last_tab]).removeClass("active");
  }

  $("#pick-" + tabs[current_tab]).show(200);
  if(last_tab != -1) {
    $("#pick-" + tabs[last_tab]).hide(200);
  }
}

function tab_onclick(event) {
  goto_id = event.currentTarget.id.split("-")[1];
  goto_tab = tabs.indexOf(goto_id);

  if(current_tab != goto_tab) {
    tab_goto(goto_tab);
  }
}

function level_hover(target) {
  lvl = parseInt($(target).data("level-nb"));
  $(".rhythms-text").html(levels[lvl].rhythms);
}

function no_level_hover() {
  $(".rhythms-text").html("");
}

function ripple(target) {
  $(target).prepend("<span class='ripple'></span>");
  $(".ripple").remove();
  // Setup
  var posX = $(target).offset().left;
  var posY = $(target).offset().top;
  var width = $(target).width();
  var height = $(target).height();

  // Add the element
  $("<span class='ripple'></span>").appendTo("body");

 // Make it round!
  if(width >= height) {
    height = width;
  } else {
    width = height;
  }

  // Get the center of the element
  var x = posX;
  var y = posY - height / 2;

  $(".ripple").css({
    width: width,
    height: height,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");

  setTimeout(function() { $(".ripple").remove(); }, 300);
}

function pop_bubble(id, time, next_to) {
  posy = $(next_to).offset().top + $(next_to).height + 12;
  posx = $(next_to).offset().left - 130;

  $("#" + id).css({
    "top": posy + "px",
    "left": posx + "px"
  });

  $("#" + id).show(200);
  setTimeout(function() { $("#" + id).hide(200); }, time);
}

$(function () {
  $("#pick-instrument .element").click(pick_instrument);
  $(".easy-setup .level-item").click(pick_level);

  $("#navbar-menu .tab-item").click(tab_onclick);

  $("#navbar-menu #continue-btn").click(next_tab);
  $("#navbar-menu #continue-btn").click((event) => {
    rotate(event.target, 360);
  });

  $("#pick-difficulty #adv-continue-btn").click(function() {
    $("#tab-rhythm-text").html("custom");
    next_tab();
  });

  $("#navbar-menu #validate-btn").click(validate);

  $('#level-slider label').bind("mouseenter", function (e) {
    level_hover(e.currentTarget);
  });
  $('#level-slider label').bind("mouseleave", function (e) {
    no_level_hover();
  });

  $(".diffsett").change(function(e) {
    if(e.currentTarget.checked) {
      var menu = $(e.currentTarget).data("menu");
      if(menu == "adv-setup") {
        $("#tab-rhythm-text").html("custom");
      } else {
        level = $(".easy-setup .level-item:checked").attr("id");
        $("#tab-rhythm-text").html("level " + level);
      }
      $(".diffmenu:not(." + menu + ")").hide(200);
      $("." + menu).show(200);
    }
  });

  $(".diffsett").each((i, e) => {
    if(e.checked) {
      var menu = $(e).data("menu");
      $(".diffmenu:not(." + menu + ")").hide();
      $("." + menu).show();
    }
  });

  tab_goto(0);
});
