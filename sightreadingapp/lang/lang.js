var lang_fr = {
  nextbtn: "Continuer"
};

var lang_en = {
  nextbtn: "Next"
};

var langs = {
  fr: {name: "Français", data: lang_fr},
  en: {name: "English", data: lang_en}
};

var lang = "fr";

function switch_lang(l) {
  if(langs[l] != null) {
    lang = l;
  }
}

$(function() {
  $(".lang").each(function(i, obj) {
    var all_class = $(obj).attr("class").split(" ");
    var i;
    for(i=0; i<all_class.length; i++) {
      c = all_class[i];
      if(c.includes("lang-")) {
        lname = c.split("-")[1];
        l = langs[lang].data[lname];
        if(l != null) {
          $(obj).html(l);
          return;
        }
      }
    }
  });
});
