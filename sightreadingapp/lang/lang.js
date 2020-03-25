var lang_fr = {
  nextbtn: "Continuer",
  noscript: "Nous avons besoin de Javascript pour fonctionner correctement (veuillez installer un naviguateur plus récent)",
  language: "Langage",
  instrument: "Instrument",
  instruments: "Instruments",
  diffsettings: "Paramètres de difficulté",
  timesig: "Chiffrage des mesures",
  scale: "Gamme",
  piano: "Piano",
  handind: "Indépendance des mains",
  nevertogether: "Jamais en même temps",
  simplehand: "Simple pour une main",
  bothcomplex: "Compliqué pour les deux mains",
  largestleap: "Plus grand intervalle",
  n2nd: "Seconde",
  n3rd: "Tierce",
  n4st: "Quarte",
  n5st: "Quinte",
  n6st: "Sixte",
  n7st: "Septième",
  oct: "Octave",
  octp: "Octave+",
  position: "Position",
  keeppos: "Garder la position initiale",
  dontkeeppos: "Les mains peuvent quitter la position initiale",
  stayoct: "Rester dans l'octave initiale",
  gooutoct: "Possibilité de quitter l'octave initiale",
  choords: "Accords",
  none: "Aucun",
  n2n: "2 notes",
  n3n: "3 notes",
  n4n: "4 notes",
  accidentals: "Altérations",
  rhythms: "Rythmes",
  level: "Niveaux",
  easysetup: "Configuration rapide",
  advsett: "Paramètres avancés",
  minor: "Mineur",
  major: "Majeur",
  cmaj: "Do Majeur",
  fmaj: "Fa Majeur",
  gmaj: "Sol Majeur",
  dmaj: "Ré Majeur",
  amaj: "La Majeur",
  bmaj: "Si Majeur",
  emaj: "Mi Majeur",
  fdmaj: "Fa# Majeur",
  cdmaj: "Do# Majeur",
  cbmaj: "Dob Majeur",
  gbmaj: "Solb Majeur",
  dbmaj: "Réb Majeur",
  abmaj: "Lab Majeur",
  ebmaj: "Mib Majeur",
  bbmaj: "Sib Majeur",
  abmin: "Lab Mineur",
  ebmin: "Mib Mineur",
  bbmin: "Sib Mineur",
  fdmin: "Fa# Mineur",
  cmin: "Do Mineur",
  gmin: "Sol Mineur",
  amin: "La Mineur",
  emin: "Mi Mineur",
  bmin: "Si Mineur",
  dmin: "Mi Mineur",
  fdmin: "Fa# Mineur",
  cdmin: "Do# Mineur",
  gdmin: "Sol# Mineur",
  ddmin: "Ré# Mineur",
  admin: "La# Mineur"
};

var lang_en = {
  nextbtn: "Next",
  noscript: "We can't work without Javascript (please consider using a more recent browser)",
  language: "Language",
  instrument: "Instrument",
  instruments: "Instruments",
  diffsettings: "Difficulty Settings",
  timesig: "Time Signature",
  scale: "Scale",
  piano: "Piano",
  handind: "Hand-Independence",
  nevertogether: "Never together",
  simplehand: "Simple on one hand",
  bothcomplex: "Both complexe",
  largestleap: "Largest leap",
  n2nd: "2nd",
  n3rd: "3rd",
  n4st: "4st",
  n5st: "5st",
  n6st: "6st",
  n7st: "7st",
  oct: "Octave",
  octp: "Octave+",
  position: "Position",
  keeppos: "Keep initial position",
  dontkeeppos: "Don't keep initial position",
  stayoct: "Stay in initial octave",
  gooutoct: "Possibly of going out of the initial octave",
  choords: "Choords",
  none: "None",
  n2n: "2 notes",
  n3n: "3 notes",
  n4n: "4 notes",
  accidentals: "Accidentals",
  rhythms: "Rhythms",
  level: "Levels",
  easysetup: "Easy Setup",
  advsett: "Advanced Settings",
  minor: "Minor",
  major: "Major",
  cmaj: "C Major",
  fmaj: "F Major",
  gmaj: "G Major",
  dmaj: "D Major",
  amaj: "A Major",
  bmaj: "B Major",
  emaj: "E Major",
  fdmaj: "F# Major",
  cdmaj: "C# Major",
  cbmaj: "Cb Major",
  gbmaj: "Gb Major",
  dbmaj: "Db Major",
  abmaj: "Ab Major",
  ebmaj: "Eb Major",
  bbmaj: "Bb Major",
  abmin: "Ab Minor",
  ebmin: "Eb Minor",
  bbmin: "Bb Minor",
  fdmin: "F# Minor",
  cmin: "C Minor",
  gmin: "G Minor",
  amin: "A Minor",
  emin: "E Minor",
  bmin: "B Minor",
  dmin: "D Minor",
  fdmin: "F# Minor",
  cdmin: "C# Minor",
  gdmin: "G# Minor",
  ddmin: "D# Minor",
  admin: "A# Minor"
};

var langs = {
  fr: {name: "Français", data: lang_fr},
  en: {name: "English", data: lang_en}
};

var default_lang = "en";
var lang = default_lang;

function switch_lang(l) {
  if(langs[l] != null) {
    lang = l;
  }
}

function refresh_language() {
  if(langs[lang] == null) {
    lang = default_lang;
  }

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
}

function get_lang_cookie() {
  var cookies = document.cookie;
  if(cookies != "" && cookies.includes("lang")) {
    cookies.split(";").forEach((c, i) => {
      if(c.includes("lang")) {
        lang = c.split("=")[1];
        $("#" + lang).prop('checked', true);
        return true;
      }
    });
  }
  return false;
}

function set_lang_cookie() {
  var now = new Date();
  var days = 7; // Expire in 7 days
  now.setTime(now.getTime() + (days * 24 * 60 * 60 * 1000));
  lang_cookie = "lang=" + lang + "; expires=" + now.toUTCString(); + "; path=/";
  document.cookie = lang_cookie;
}

$(function() {
  if(!get_lang_cookie()) {
    $(".lang-radio").each((i, e) => {
      if(e.checked) {
        lang = e.id;
        refresh_language();
      }
    });
  };
  refresh_language();

  $(".lang-radio").change(function(event) {
    if(event.currentTarget.checked) {
      lang = $(event.currentTarget).attr("id");
      refresh_language();
      set_lang_cookie();
    }
  });

});
