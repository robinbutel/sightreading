var cmaj_rh = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5"];
var cmaj_lh = ["c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3", "c/4"];

var scales = {cmaj:{rh:cmaj_rh,lh:cmaj_lh}};

var lengths = ["16","8","q","h","w"];
var notebeats = [1/16,1/8,1/4,1/2,1];


var VF = Vex.Flox;

function random(max)
{
   return Math.floor(Math.random() * (max+1));
}

function get_beat(beats, b, v)
{
    var i;
    if(b%1)
    {
        for(i=0; i<=v; i++)
        {
            if(((beats[i]+b)%1==0)||((beats[i]-b)%1==0))
            {
                if(i==0)
                    return 0;
                else
                    return random[i];
            }
        }
    }
    else
    {
        for(i=0; i<=v; i++)
        {
            if((beats[i]>b))
            return random[i-1];
        }
        
    }
        
}

function get_mesure(beats, t, scale, variety)
{
    var tnotes = [];
    var bnotes = [];
    var notes = {treble:tnotes,bass:bnotes};
    var available_b = t;
    var n,b;


    while(available_b>0)
    {
        
        n = scale.rh[random(7)];
        b = get_beat(beats, available_b, variety);
        tnotes.push(new VF.StaveNote({clef: "treble", keys: n, duration: lengths[b]}));
        available_b -= beats[b]; 
    }

    var available_b = t;

    while(available_b>0)
    {
        
        n = scale.lh[random(7)];
        b = get_beat(beats, available_b, variety);
        tnotes.push(new VF.StaveNote({clef: "bass", keys: n, duration: lengths[b]}));
        available_b -= beats[b]; 
    }

    return notes;
}

function get_music(time_signature, scale, variety, independence, position, octave, chords, leap, accidental, nb_mesures)
{
    var tbeats = time_signature[0];
    var bbeats = time_signature[0];
    var timedbeats,i;
    for(i=0; i<=variety; i++)
    {
        timedbeats = notebeats[i] * time_signature[2];
    }

    get_mesure(timedbeats, time_signature[0], scales[scale], variety);
}

// new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "h"})