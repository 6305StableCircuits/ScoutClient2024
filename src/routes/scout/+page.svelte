
<script lang=ts>
	import { goto } from "$app/navigation";
	import { Timer } from "$lib/classes/Timer";
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
    import {asLongAs} from '$lib/aslongas';
	import Layout from "../+layout.svelte";
    let team = 0;
    let round = 0;
    let allianceColor = "";
    let scouter = "";
    let matchFinished = false;
    var duplicheck = 0;
    var inSave = false;
    let saveData: any;
    let id = Date.now();
    let matchData = {
        id: id,
        team: team,
        scouter: scouter,
        color: allianceColor,
        round: round,
        harmony: false,
        climb: false,
        startTime: "",
        score: 0,
        incapLogs:[
            {},
        ],
        intakeLogs:[
            {},
        ],
        shotLogs:[
            {},
        ]
    }
    savedData.subscribe(value => {
        saveData = value;
    })
    teamNum.subscribe(value => {
        team = value;
        matchData.team = team;
    });
    roundNum.subscribe(value => {
        round = value;
        matchData.round = round;
    });
    alliance.subscribe(value=>{
        allianceColor = value;
        matchData.color = allianceColor;
    });
    scouterName.subscribe(value => {
        scouter = value;
        matchData.scouter =scouter;
    })
    $: {
        for(duplicheck = 0; duplicheck < saveData.length; duplicheck++){
            asLongAs(saveData[duplicheck].id == id, function(){
                saveData[duplicheck] = matchData;
                inSave = true;
            });
        }
        asLongAs(!inSave, function(){
            saveData.push(matchData);
        })
        savedData.set(saveData);
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
            matchData.startTime = Date().toLocaleString();
            matchStarted = true;
            console.log(matchData);
        },
        onUpdate() {
            timeRemaining = matchTime - (matchTimer.time + 1);
            asLongAs(matchTimer.time == 150, function() {
                matchTimer.stop();
            },function(){
            asLongAs((matchTimer.time + 1) == 0, function() {
                matchPhase = "Pregame"
            },function(){ asLongAs((matchTimer.time + 1) <= 15, function() {
                matchPhase = "Auto"
            }, function(){asLongAs((matchTimer.time + 1) > 15, function() {
                matchPhase = "Teleop"
            },function(){ asLongAs((matchTimer.time + 1) >= 150, function(){
                matchPhase = "Postgame"
            })})})})});
        },
        onEnd() {
            matchStarted = false;
            matchFinished = true;
        }
    });
    let incapStart = "";
    let incapTimer = new Timer("incapTimer", {
        onStart() {
            incapStart = Date().toLocaleString();
            isIncap = true;
        },
        onUpdate() {
            stopwatch = incapTimer.time + 1;
        },
        onEnd() {
            matchData.incapLogs.push({
                start: incapStart.toString(),
                end: Date().toLocaleString().toString(),
                duration: Number(Date.parse(Date().toLocaleString().toString())-Date.parse(incapStart)),
            })
            incapTimer.reset();
            stopwatch = 0;
            isIncap = false;
        }
    });

    $: {
        matchData.score = points;
    }
    
    let autoInvalid = true;
    $: autoInvalid = matchPhase == "Auto" || matchPhase == "Pregame";

    let preGameInvalid = true;
    $: preGameInvalid = matchPhase == "Pregame";
    
    let matchPhase: string = "Pregame";

    function scoreAmp() {
        asLongAs(matchPhase == "Auto" && hasIntaked, function() {
            points += 2;
        }, function() {
            points += 1;
        });
        matchData.shotLogs.push({type:"amp"});
        hasIntaked = false;
    }

    function scoreSpeaker() {
        asLongAs((isCharge || matchPhase == "Auto" && hasIntaked),  function() {
            points += 5;   
        }, function() {
            points += 2;
        });
        matchData.shotLogs.push({type:"speaker"});
        hasIntaked = false;
    }
    
    function intake(type: number) {
        hasIntaked = true;
        matchData.intakeLogs.push({
            type: type == 1 ? "ground" : (type == 0 ? "source" : "unknown")
        });
    }
    let harmonyInteract = false;
    /*$:  if(harmonyInteract){ 
    if(matchData.harmony){
        points+=2;
    }else if(!matchData.harmony){
        points-=2;
    }
}*/
const harmony = function(e: any){
    matchData.harmony = e.target.checked;
    if(!harmonyInteract && matchData.harmony){
        points+=2;
    }else if(harmonyInteract && !matchData.harmony){
        points-=2;
    }else if(harmonyInteract && matchData.harmony){
        points+=2;
    }
    harmonyInteract = true;
}
</script>

<div class="bg-black-olive h-screen">
    <button on:click={() => goto('/')} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>              
    </button>
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Undo</button>
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Redo</button>
    </div>
    <div class="flex pt-sm items-center justify-center">
        {#if !matchStarted}
        <button disabled={matchFinished} class="text-4xl text-floral-white text-center bg-eerie-black px-md py-sm rounded-2xl disabled:opacity-50 hover:opacity-85" on:click={() => matchTimer.start()}>Start Match</button>
        {/if}
        {#if matchStarted&&!matchFinished}
        <div class="text-4xl text-floral-white text-center bg-eerie-black px-md py-sm rounded-2xl" id="matchTimer">
            {matchPhase} | {Math.floor(((timeRemaining) / 60))}:{String((timeRemaining) % 60).padStart(2, '0')}
        </div>
        {/if}
    </div>
    {#if matchStarted}
    {#if !hasIntaked&&!matchFinished}
    <div class="flex pt-sm items-center justify-center">
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85" on:click={()=>{intake(1)}}>Ground Intake</button>
        <button disabled={autoInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85" on:click={()=>{intake(0)}}>Source Intake</button>
    </div>
    {/if}
    {/if}
    {#if matchStarted&&hasIntaked&&!matchFinished}
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85" on:click={scoreAmp}>Amp Score</button>
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm" on:click={scoreSpeaker}>Speaker Score</button>
    </div>
    {/if}
    <div class="flex pt-sm items-center justify-center">
        {#if matchStarted&&!matchFinished}
        {#if !isIncap}
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click={() => incapTimer.start()}>Start Incap</button>
        {/if}
        {#if isIncap}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:opacity-85 w-[15%]" on:click={() => incapTimer.stop()}>
            {Math.floor(((stopwatch) / 60))}:{String((stopwatch) % 60).padStart(2, '0')} | End Incap
        </button>
        {/if}
        {#if matchPhase == "Auto" || matchPhase == "Pregame"}
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click|once={() => {points += 2}}>Leave</button>
        {/if}
        {#if matchPhase == "Teleop"}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]" on:click={() => {matchData.climb = true}}>Climb</button>
        <input type="checkbox" name="harmony" on:click={(event) => {harmony(event);}}>
        <label for="harmony"> Harmony</label>
        {/if} 
        {/if}        
    </div>
    <center>
        <h1 class="text-8xl text-floral-white">{points}</h1>
    </center>
</div>