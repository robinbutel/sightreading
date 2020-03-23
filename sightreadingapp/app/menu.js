instrument = "no-instrument";
level = 0;
timesig = "4/4";
scale = "C Major";

tabs = ["instrument", "level", "timesig", "scale"];

current_tab = 0;

function pick_instrument(event) {
  instrument = event.target.id;

  next_tab();
}

function next_tab() {
  if(current_tab == (tabs.length-1)) {
    validate();
  }

  current_tab += 1;

  $("#tab-" + tabs[current_tab]).addClass("");

  $("#pick-" + tabs[current_tab]).show();
  if(current_tab > 0) {
    $("#pick-" + tabs[current_tab-1]).hide();
  }
}

function validate() {
  alert("validate");
}

$(function () {
  $("#pick-instrument .element").click(pick_instrument);
});
