
<script lang=ts>
	import { goto } from "$app/navigation";
	import { Timer } from "$lib/classes/Timer";
    let matchData = {
        team: "",
        scouter: "",
        color: "",
        startTime: Date(),
        score: Number,
        incapLogs:[
            {},
            
        ],
        intakeLogs: [
            {},
            
        ],
    };
    if(localStorage.getItem("pregameinfo") !== null){
        goto('./preGameInfo');
    }else{
        var thing;
        var pregameinfo;
        //hey bro i heard you like sandboxing so i sandboxed your sandboxes
        try{
            try{
            thing = localStorage.getItem("pregameinfo");
            }catch(err){
                thing = null;
                goto('./preGameInfo');
            }
            try{
            if(thing == null){
                goto('./preGameInfo');
            }else{
                try{
                pregameinfo = JSON.parse(thing);
                }catch(err){
                    pregameinfo = {};
                    goto('./preGameInfo');
                }
                try{
                    try{
                        matchData.team = pregameinfo.team;
                    }catch(err){
                        goto('./preGameInfo');
                    }
                    try{
                        matchData.color = pregameinfo.color;
                    }catch(err){
                        goto('./preGameInfo');
                    }
                    try{
                        matchData.scouter = pregameinfo.scouter;
                    }catch(err){
                        goto('./preGameInfo');
                    }
                }catch(err){
                    goto('./preGameInfo');
                }
                console.log(matchData);
            }
        }catch(err){
            goto('./pregameInfo');
        }
        }catch(err){
            goto('./preGameInfo');
        }
    }
    
    var actions = [];
    let matchStarted: Boolean = false;
    let matchTime: number = 150;
    let isIncap: Boolean = false;
    let startIncap: number;
    let endIncap: number;
    let hasIntaked: Boolean = false;
    let isCharge: Boolean = false;
    let points: number = 0;
    let timeRemaining = 150;
    let stopwatch: number = 0;
    let matchTimer = new Timer("matchTimer", {
        onStart() {
            matchStarted = true;
        },
        onUpdate() {
            timeRemaining = matchTime - (matchTimer.time + 1);

            if(matchTimer.time == 150) {
                matchTimer.stop();
            }
            if((matchTimer.time + 1) == 0) {
                matchPhase = "Pregame"
            } else if((matchTimer.time + 1) <= 15) {
                matchPhase = "Auto"
            } else if((matchTimer.time + 1) > 15) {
                matchPhase = "Teleop"
            } else if((matchTimer.time + 1) >= 150) {
                matchPhase = "Postgame"
            }
        },
        onEnd() {
            matchStarted = false;
        }
    });
    let incapStart = "";
    let incapTimer = new Timer("incapTimer", {
        onStart() {
            incapStart = Date();
            isIncap = true;
        },
        onUpdate() {
            stopwatch = incapTimer.time + 1;
        },
        onEnd() {
            matchData.incapLogs.push({
                start: incapStart.toString(),
                end: Date().toString(),
                duration: Number(Date.parse(Date().toString())-Date.parse(incapStart)),
            })
            incapTimer.reset();
            stopwatch = 0;
            isIncap = false;
        }
    });
    
    let autoInvalid = true;
    $: autoInvalid = matchPhase == "Auto" || matchPhase == "Pregame";

    let preGameInvalid = true;
    $: preGameInvalid = matchPhase == "Pregame";
    
    let matchPhase: string = "Pregame";

    function scoreAmp() {
        if(matchPhase == "Auto") {
            points += 2;
        } else {
            points += 1;
        }
        hasIntaked = false;
    }

    function scoreSpeaker() {
        if(isCharge || matchPhase == "Auto") {
            points += 5;
        } else {
            points += 2;
        }
        hasIntaked = false;
    }

    function intake() {
        hasIntaked = true;
    }
</script>

<div class="bg-black-olive h-screen">
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Undo</button>
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Redo</button>
    </div>
    <div class="flex pt-sm items-center justify-center">
        {#if !matchStarted}
        <button class="text-4xl text-floral-white text-center bg-eerie-black px-md py-sm rounded-2xl hover:opacity-85" on:click={() => matchTimer.start()}>Start Match</button>
        {/if}
        {#if matchStarted}
        <div class="text-4xl text-floral-white text-center bg-eerie-black px-md py-sm rounded-2xl" id="matchTimer">
            {matchPhase} | {Math.floor(((timeRemaining) / 60))}:{String((timeRemaining) % 60).padStart(2, '0')}
        </div>
        {/if}
    </div>
    {#if !hasIntaked}
    <div class="flex pt-sm items-center justify-center">
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85" on:click={intake}>Ground Intake</button>
        <button disabled={autoInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85" on:click={intake}>Source Intake</button>
    </div>
    {/if}
    {#if hasIntaked}
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85" on:click={scoreAmp}>Amp Score</button>
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm" on:click={scoreSpeaker}>Speaker Score</button>
    </div>
    {/if}
    <div class="flex pt-sm items-center justify-center">
        {#if !isIncap}
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click={() => incapTimer.start()}>Start Incap</button>
        {/if}
        {#if isIncap}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:opacity-85 w-[15%]" on:click={() => incapTimer.stop()}>
            {Math.floor(((stopwatch) / 60))}:{String((stopwatch) % 60).padStart(2, '0')} | End Incap
        </button>
        {/if}
        {#if matchPhase == "Auto" || matchPhase == "Pregame"}
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click={() => {points += 2}}>Leave</button>
        {/if}
        {#if matchPhase == "Teleop"}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Climb</button>
        {/if}         
    </div>
    <h1 class="text-8xl text-floral-white">{points}</h1>
</div>