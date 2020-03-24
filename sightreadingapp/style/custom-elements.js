$(function () {
  $('select[data-menu]').each(function() {

      let select = $(this),
          options = select.find('option'),
          menu = $('<div />').addClass('select-menu'),
          button = $('<div />').addClass('button'),
          list = $('<ul />'),
          arrow = $('<em />').prependTo(button);

      options.each(function(i) {
          let option = $(this);
          list.append($('<li />').text(option.text()));
      });

      menu.css('--t', select.find(':selected').index() * -41 + 'px');

      select.wrap(menu);

      button.append(list).insertAfter(select);

      list.clone().insertAfter(button);

  });

  $(document).on('click', '.select-menu', function(e) {

      let menu = $(this);

      $('.select-menu').removeClass('open');

      if(!menu.hasClass('open')) {
          menu.addClass('open');
      }

  });

  $(document).on('click', '.select-menu > ul > li', function(e) {

      let li = $(this),
          menu = li.parent().parent(),
          select = menu.children('select'),
          selected = select.find('option:selected'),
          index = li.index();

      menu.css('--t', index * -41 + 'px');
      selected.attr('selected', false);
      select.find('option').eq(index).attr('selected', true);

      menu.addClass(index > selected.index() ? 'tilt-down' : 'tilt-up');

      setTimeout(() => {
          menu.removeClass('open tilt-up tilt-down');
      }, 500);

  });

  $(document).click(e => {
      e.stopPropagation();
      if($('.select-menu').has(e.target).length === 0) {
          $('.select-menu').removeClass('open');
      }
  });

  $(".drop .option").click(function() {
    var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
      setTimeout(function() {
        $drop.addClass("withBG");
      }, 400 + options*100);
    }
    triggerAnimation();
    if (val !== "placeholder" || prevActive === "placeholder") {
      $(".drop .option").removeClass("active");
      $(this).addClass("active");
    };
  });

  function triggerAnimation() {
    var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
    $(".drop").css("width", "24em");
    setTimeout(function() {
      $(".drop").css("width", finalWidth + "em");
    }, 400);
  }
});
