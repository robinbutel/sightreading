var cmaj_rh = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5"];
var cmaj_lh = ["c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3", "c/4"];
var lengths = ["w","h","q","8","16"];
var notebeats = [1,1/2,1/4,1/8,1/16];

var temp = ["","w","h","q","8","16"];


var VF = Vex.Flox;

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
        tnotes.push(new VF.StaveNote({clef: "treble", keys: [cmaj_rh[random(7)]], duration: temp[tnum]}));
    }
    for(i=0; i<bnum; i++)
    {
        bnotes.push(new VF.StaveNote({clef: "bass", keys: [cmaj_lh[random(7)]], duration: temp[bnum]}));
    }

    return notes;
}

function get_mesure(beats, t, scale, variety)
{
    var tnotes = [];
    var bnotes = [];
    var notes = {treble:tnotes,bass:bnotes};
    var tbeats = t;
    var bbeats = t;
    
}

function get_notes(time_signature, scale, variety, independence, position, octave, chords, leap, accidental)
{
    var tbeats = time_signature[0];
    var bbeats = time_signature[0];
    var timedbeats,i;
    for(i=0; i<=variety; i++)
    {
        timedbeats = notebeats[i] * time_signature[2];
    }

    get_mesure(timedbeats, time_signature[0], scale, variety);
}

// new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "h"})