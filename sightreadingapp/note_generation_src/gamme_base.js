var cmaj_rh = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5"];
var cmaj_lh = ["c/3", "d/3", "e/3", "f/3", "g/3", "a/3", "b/3", "c/4"];

var scales = {cmaj:{rh:cmaj_rh,lh:cmaj_lh}};

var lengths = ["w","h","q","8","16"];
var notebeats = [1,1/2,1/4,1/8,1/16];


var VF = Vex.Flox;

function random(min,max)
{
   return (Math.floor(Math.random() * (max+1-min)))+min;
}

function get_beat(beats, b, v)
{
    var i;
    if((b%1)!=0)
    {
        for(i=v; i>=0; i--)
        {
            if(((beats[i]+b)%1==0)||((beats[i]-b)%1==0))
            {
                if(beats[i]-b==0||random(1,3)%2==1)
                    return random(i,v);
            }
        }
    }

    for(i=0; i<=v; i++)
    {
         if(beats[i]<=b)
            return random(i,v);
    }
    return random(0,v);  
}

function get_mesure(beats, t, scale, variety)
{
    console.log("NEW MESURE");
    console.log(beats);
    console.log(lengths);
    var tnotes = [];
    var bnotes = [];
    var notes = {treble:tnotes,bass:bnotes};
    var available_b = t;
    var n,b;

    while(available_b>0)
    {
        console.log(available_b);
        n = [scale.rh[random(0,7)]];
        b = get_beat(beats, available_b, variety);
        tnotes.push(new VF.StaveNote({clef: "treble", keys: n, duration: lengths[b]}));
        available_b -= beats[b]; 
    }

    var available_b = t;

    while(available_b>0)
    {
        
        n = [scale.lh[random(0,7)]];
        b = get_beat(beats, available_b, variety);
        bnotes.push(new VF.StaveNote({clef: "bass", keys: n, duration: lengths[b]}));
        available_b -= beats[b]; 
    }

    return notes;
}

function get_music(time_signature, scale, variety) //independence, position, octave, chords, leap, accidental, nb_mesures)
{
    var timedbeats = [],i;
    for(i=0; i<=variety; i++)
    {
        timedbeats.push(notebeats[i] * parseInt(time_signature[2]));
    }

    return get_mesure(timedbeats, parseInt(time_signature[0]), scales[scale], variety);
}

// new VF.StaveNote({clef: "bass", keys: ["d/3"], duration: "h"})