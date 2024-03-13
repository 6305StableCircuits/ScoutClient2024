
<script lang=ts>
	import { goto } from "$app/navigation";
	import { Timer } from "$lib/classes/Timer";
    import { get } from 'svelte/store';
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
    import {asLongAs} from '$lib/aslongas';
	import Layout from "../+layout.svelte";
    let team = 0;
    let round = 0;
    let allianceColor = "";
    let points: number = 0;
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
        left: false,
        spotlight: false,
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
    team = get(teamNum);
    matchData.team = team;
    round = get(roundNum);
    matchData.round = round;
    allianceColor = get(alliance);
    matchData.color = allianceColor;
    scouter = get(scouterName);
    matchData.scouter = scouter;
    $: {
        for(duplicheck = 0; duplicheck < saveData.length; duplicheck++){
            if(saveData[duplicheck].id == matchData.id){
                saveData[duplicheck] = matchData;
                inSave = true;
                break;
            }
        }
        if(!inSave){
            saveData.push(matchData);
        }
        savedData.set(saveData);
    }
    var actions = [];
    var actionTypes = {
        toggleHarmony: {
            eval: "matchData.harmony = !matchData.harmony",
            redo: "matchData.harmony = !matchData.harmony"
        },
        toggleClimb: {
            eval: "matchData.climb = !matchData.climb",
            redo: "matchData.climb = !matchData.climb"
        },
        doIntake: {
            eval: "intakeUndo.push(matchData.intakeLogs.pop());",
            redo: "matchData.intakeLogs.push(intakeUndo.pop());"
        },
        doIncap: {
            eval: "incapUndo.push(matchData.incapLogs.pop());",
            redo: "matchData.incapLogs.push(incapUndo.pop());"
        },
        doShot: {
            eval: "shotUndo.push(matchData.shotLogs.pop());",
            redo: "matchData.shotLogs.push(shotUndo.pop());"
        }
    }
    var incapUndo = [];
    var shotUndo = [];
    var intakeUndo = [];
    var shotHistory = [];
    let matchStarted: Boolean = false;
    let matchTime: number = 150;
    let isIncap: Boolean = false;
    let startIncap: number;
    let endIncap: number;
    let hasIntaked: Boolean = false;
    let isCharge: Boolean = false;
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
        
        matchData.score = points;
        matchData.shotLogs.push({type:"amp"});
        hasIntaked = false;
    }

    function scoreSpeaker() {
        asLongAs((isCharge || matchPhase == "Auto" && hasIntaked),  function() {
            points += 5;   
        }, function() {
            points += 2;
        });
        matchData.score = points;
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
    $:  if(harmonyInteract){ 
            if(matchData.harmony == true){
                points+=2;
                matchData.score = points;
            }else if(matchData.harmony == false){
                points-=2;
                matchData.score = points;
            }
        }
const harmony = function(e: boolean){
    matchData.harmony = e;
    /*if(!harmonyInteract && matchData.harmony){
        points+=1;
    }else if(harmonyInteract && !matchData.harmony){
        points-=1;
    }else if(harmonyInteract && matchData.harmony){
        points+=1;
    }*/
    matchData.score = points;
    harmonyInteract = true;
}
var climbBtn:any;
var sptlghtBtn:any;
var sptlghtBtnStyle = "";
$: {
    if(matchData.harmony == true){
        climbBtn.style["background-color"]="rgb(4, 201, 7)";
    }else if(matchData.climb == true){
        climbBtn.style["background-color"]="rgb(214, 4, 4)";
    }
   if(matchData.spotlight == true){
        sptlghtBtnStyle="background-color:rgb(4, 201, 7)";
    }else{
        sptlghtBtnStyle="background-color:rgb(214, 4, 4)";
    }
}
const undo = function(){

}
const redo = function(){

}
</script>
<style>
    label {
        white-space:nowrap;
        font-size: scale(0.5);
    }
    button{
        cursor: pointer;
    }
</style>
<div class="bg-black-olive h-screen">
    <button on:click={() => goto('/')} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>              
    </button>
    {#if matchStarted}
        <div class="flex pt-sm items-center justify-center">
            <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Undo</button>
            <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Redo</button>
        </div>
    {/if}
    <div class="flex pt-sm items-center justify-center">
        {#if !matchStarted}
        <button disabled={matchFinished} class="text-4xl text-floral-white text-center justify-center bg-eerie-black px-md py-sm rounded-2xl disabled:opacity-50 hover:opacity-85" on:click={() => matchTimer.start()}>Start Match</button>
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
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click|once={() => {points += 2; matchData.score = points;matchData.left = true;}}>Leave</button>
        {/if}
        {#if matchPhase == "Teleop"}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]" on:click={(e) => {if(matchData.climb == false){e.stopImmediatePropagation();matchData.climb = true;}else{matchData.harmony = !matchData.harmony;harmony(matchData.harmony);}}} bind:this={climbBtn}>{#if matchData.climb == false}Climb{/if}{#if matchData.climb == true}<input type="checkbox" name="harmony" style="display:none;"><label for="harmony"style="cursor:pointer" > Harmony</label>{/if}</button>
        {#if matchData.climb == true}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]" on:click={()=>{matchData.spotlight = !matchData.spotlight}} bind:this={sptlghtBtn} style={sptlghtBtnStyle}>Spotlight</button>
        {/if}
        {/if} 
        {/if}    
        <center><br>
            <h1 class="text-4xl text-floral-white">Team {team}<br>Score: {points}</h1>
        </center>        
    </div>
</div>