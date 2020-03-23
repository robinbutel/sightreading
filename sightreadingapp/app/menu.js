instrument = "no-instrument";
level = 0;
timesig = "4/4";
scale = "C Major";

tabs = ["instrument", "difficulty", "timesig", "scale"];

current_tab = 0;

function pick_instrument(event) {
  instrument = event.target.id;

  next_tab();
}

function pick_level(event) {
  levelid = event.target.id;

  next_tab();
}

function next_tab() {
  if(current_tab == (tabs.length-1)) {
    validate();
  }

  current_tab += 1;

  $("#tab-" + tabs[current_tab] + " .tab-item").addClass("active");
  if(current_tab > 0) {
    $("#tab-" + tabs[current_tab-1] + " .tab-item").removeClass("active");
  }

  $("#pick-" + tabs[current_tab]).show();
  if(current_tab > 0) {
    $("#pick-" + tabs[current_tab-1]).hide();
  }
}

function validate() {
  alert("validate");
}

function tab_goto(event) {
  goto_id = event.target.id.split("-")[1];
  if (goto_id == null) {
      goto_id = event.target.parentElement.id.split("-")[1];
  }
  goto_tab = tabs.indexOf(goto_id);

  last_tab = current_tab;
  current_tab = goto_tab;

  $("#tab-" + tabs[current_tab] + " .tab-item").addClass("active");
  $("#tab-" + tabs[last_tab] + " .tab-item").removeClass("active");

  $("#pick-" + tabs[current_tab]).show();
  $("#pick-" + tabs[last_tab]).hide();
}

$(function () {
  $("#pick-instrument .element").click(pick_instrument);
  $("#pick-level .element").click(pick_level);

  $("#navbar-menu .tab-item").click(tab_goto);
});
