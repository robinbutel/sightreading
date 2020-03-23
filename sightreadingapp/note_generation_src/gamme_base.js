var cmaj_rh = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5"];
var cmaj_lh = ["c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3", "c/5"];
var temp = ["","w","h","q","q"];

function random(max)
{
   return Math.floor(Math.random() * (max+1));
}

function first_mesure(tnum,bnum)
{
    var tnotes = [];
    var bnotes = [];
    var notes = {treble:tnotes,bass:bnotes};
    
    var i;
    for(i=0; i<tnum; i++)
    {
        tnotes.push(VF.StaveNote({clef: "treble", keys: [cmaj_rh[random(7)]], duration: temp[tnum]}));
    }
    for(i=0; i<bnum; i++)
    {
        bnotes.push(VF.StaveNote({clef: "bass", keys: [cmaj_lh[random(7)]], duration: temp[bnum]}));
    }

    return notes;
}


// new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "h"})