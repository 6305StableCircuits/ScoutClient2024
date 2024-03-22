
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
        misses: 0,
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
    let matchStarted: Boolean = false;
    let matchTime: number = 150;
    let isIncap: Boolean = false;
    let startIncap: number;
    let endIncap: number;
    let hasIntaked: Boolean = false;
    let isCharge: Boolean = false;
    let timeRemaining = 150;
    let stopwatch: number = 0;
    let action: String = "";
    let lastAction: Array<String> = [];
    let undone: Array<String> = [];
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

    function scoreAmp(undo: boolean=false, redo: boolean=false) {
        if(!redo && !undo) {
            undone = [];
            asLongAs(matchPhase == "Auto" && hasIntaked, function() {
            points += 2;
            }, function() {
                points += 1;
            });
            hasIntaked = false;
        }
        if(undo) {
            undone = [...undone, "ampScore"];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            points -= 1;
        } else if(redo) {
            lastAction = [...lastAction, "ampScore"];
            if(undone.length != 0) {
                undone.pop();
            }
            points += 1;
        } else {
            lastAction = [...lastAction, "ampScore"];
            if(undone.length != 0) {
                undone.pop();
            }
        }
        matchData.score = points;
        matchData.shotLogs.push({type:"amp"});
    }

    function scoreSpeaker(isCharge: boolean, undo: boolean=false, redo: boolean=false) {
        if(!redo && !undo) {
            asLongAs((isCharge || matchPhase == "Auto" && hasIntaked),  function() {
                points += 5;   
            }, function() {
                points += 2;
            });
        } 
        if(undo && !isCharge) {
            undone = [...undone, "speakerScore"];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            points -= 2;
        } else if(undo && isCharge) {
            undone = [...undone, "chargedSpeakerScore"];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            points -= 5;
        } else if(redo && !isCharge) {
            lastAction = [...lastAction, "speakerScore"];
            if(undone.length != 0) {
                undone.pop();
            }
            points += 2;
        } else if(redo && isCharge) {
            lastAction = [...lastAction, "chargedSpeakerScore"];
            if(undone.length != 0) {
                undone.pop();
            }
            points += 5;
        } else {
            lastAction = [...lastAction, "speakerScore"];
            if(undone.length != 0) {
                undone.pop();
            }
        }
        matchData.score = points;
        matchData.shotLogs.push({type:"speaker"});
        hasIntaked = false;
    }
    
    function intake(type: number, undo: boolean=false, redo: boolean=false) {
        if(!redo && !undo) {
            hasIntaked = true;
        } 
        if(undo && type == 1) {
            undone = [...undone, "groundIntake"];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            hasIntaked = false;
        } else if(undo && type == 0) {
            undone = [...undone, "sourceIntake"];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            hasIntaked = false;
        } else if(redo && type == 1) {
            lastAction = [...lastAction, "groundIntake"];
            if(undone.length != 0) {
                undone.pop();
            }
            hasIntaked = true;
        } else {
            lastAction = [...lastAction, "sourceIntake"];
            if(undone.length != 0) {
                undone.pop();
            }
            hasIntaked = true;
        }
        matchData.intakeLogs.push({
            type: type == 1 ? "ground" : (type == 0 ? "source" : "unknown")
        });
    }
    let spotlightInteract = false;
    let harmonyInteract = false;
    let harmonyVal = false;
    let spotlightVal = false;
    let lastRecordedSL = false;
    let lastRecordedH = false;
    $: if(spotlightInteract && lastRecordedSL !== spotlightVal){
        if(spotlightVal == true){
            points+=1;
            matchData.score = points;
        }else if(spotlightVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedSL = spotlightVal;
        }
    $:  if(harmonyInteract && lastRecordedH !== harmonyVal){ 
            if(harmonyVal == true){
                points+=2;
                matchData.score = points;
            }else if(harmonyVal == false){
                points-=2;
                matchData.score = points;
            }
            lastRecordedH = harmonyVal;
        } 
    const harmony = function(e: boolean){
        console.log(e);
        console.log(harmonyInteract);
        matchData.harmony = e;
        harmonyVal = e;
        harmonyInteract = true;
    }
    const spotlight = function(e: boolean){
        console.log(e);
        console.log(spotlightInteract);
        matchData.spotlight = e;
        spotlightVal = e;
        spotlightInteract = true;
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
<<<<<<< HEAD
const harmony = function(e: boolean){
    matchData.harmony = e;
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
=======
>>>>>>> 8766308b9937255e1286357c4c4d405c99d8fa92
    }

    $: {
        if(points < 0){
            points = 0;
            matchData.score = points;
        }
    }

function undo() {
    if(lastAction.length !== 0) {
        let action = lastAction[lastAction.length-1]
        switch(action) {
            case "groundIntake":
                intake(1, true, false);
            break;
            case "sourceIntake":
                intake(0, true, false);
            break;
            case "speakerScore":
                scoreSpeaker(false, true, false);
            break;
            case "chargedSpeakerScore":
                scoreSpeaker(true, true, false);
            break;
            case "ampScore":
                scoreAmp(true, false);
            break;
        }
    }
}
    function redo() {
        if(undone.length !== 0) {
            let action = undone[undone.length - 1];
            switch(action) {
                case "groundIntake":
                    intake(1, false, true);
                break;
                case "sourceIntake":
                    intake(0, false, true);
                break;
                case "speakerScore":
                    scoreSpeaker(false, false, true);
                break;
                case "chargedSpeakerScore":
                    scoreSpeaker(true, false, true);
                break;
                case "ampScore":
                    scoreAmp(false, true);
                break;
            }
        }
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
    button:disabled{
        cursor: default;
    }
</style>
<div class="bg-black-olive h-screen md:border-[16px] border-8 border-eerie-black">
    <div class="flex pt-sm items-center justify-center" style="z-index:9999">
    <button on:click={() => goto('/')} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-5 top-2.5" style="z-index:9999999">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    </button>  
        <span class="text-3xl text-floral-white text-center px-md py-sm absolute top-0 md:border-[16px] border-8 border-eerie-black w-full" id="matchTimer"> 
        {#if matchStarted&&!matchFinished}
            <b style="border-bottom: 0.1em solid #ffffff; line-height: 0.1em;"><span>Team: {team}</span></b><br>
            {#if matchPhase=="Auto"}&nbsp;&nbsp;&nbsp;&nbsp;{/if}{#if matchPhase=="Teleop"}&nbsp;&nbsp;{/if}{#if matchPhase=="Pregame"}&nbsp;&nbsp;{/if}{matchPhase} <span class="text-6xl">|</span> Score: {points} <span style="right:0;" class="absolute text-5xl"><b style="position:relative;bottom:25px">{Math.floor(((timeRemaining) / 60))}:{String((timeRemaining) % 60).padStart(2, '0')}</b></span>
        {/if}
        {#if !(matchStarted&&matchFinished == false)} 
           <b>Team {team}</b> 
        {/if}
    </span>
    </div>
    <br><br><br>
    {#if matchStarted}
        <div class="flex pt-xl items-center justify-center">
<<<<<<< HEAD
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:click={undo}>Undo{#if lastAction.length != 0}<br>{lastAction[lastAction.length - 1]}{/if}</button>
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:click={redo}>Redo{#if undone.length != 0}<br>{undone[undone.length - 1]}{/if}</button>
=======
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%] disabled:opacity-50 enabled:hover:opacity-85">Undo</button>
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%] disabled:opacity-50 enabled:hover:opacity-85">Redo</button>
>>>>>>> 8766308b9937255e1286357c4c4d405c99d8fa92
        </div>
    {/if}
    <div class="flex pt-sm items-center justify-center">
        {#if !matchStarted}
            <button disabled={matchFinished} class="text-4xl text-floral-white text-center justify-center mt-64 bg-flame-500 px-md py-3xl rounded-md disabled:opacity-50 hover:opacity-85" on:click={() => matchTimer.start()}>Start Match</button>
        {/if}
    </div>
    {#if matchStarted}
    {#if !hasIntaked&&!matchFinished}
    <div class="flex pt-sm items-center justify-center">
        <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-3xl rounded-lg mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:click={()=>{intake(1)}}>Ground Intake</button>
        <button disabled={autoInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-3xl rounded-lg mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:click={()=>{intake(0)}}>Source Intake</button>
    </div>
    {/if}
    {/if}
    {#if matchStarted&&hasIntaked&&!matchFinished}
        <div class="flex pt-sm items-center justify-center">
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" on:click={() => scoreAmp()}>Amp Score</button>
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" on:click={() => scoreSpeaker(isCharge = false)}>Speaker Score</button>
        </div>
        <div class="flex pt-md items-center justify-center">
            {#if matchPhase=="Teleop"}
            <button disabled={autoInvalid} class="text-xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" style="border:6px rgb(100, 100, 100) solid" on:click={() => scoreSpeaker(isCharge = true)}>Charged Speaker Score</button>
            {/if}
            <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" style="border:6px rgb(100, 100, 100) solid" on:click={()=>{matchData.misses++;}}>Miss</button>
        </div>
    {/if}
    <div class="flex pt-sm items-center justify-center">
        {#if matchStarted&&!matchFinished}
        {#if !isIncap}
        <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:click={() => incapTimer.start()}>Start Incap</button>
        {/if}
        {#if isIncap}
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:opacity-85 w-[40%]" on:click={() => incapTimer.stop()}>
            {Math.floor(((stopwatch) / 60))}:{String((stopwatch) % 60).padStart(2, '0')}<br>End
        </button>
        {/if}
        {#if matchPhase == "Auto" || matchPhase == "Pregame"}
        <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[40%]" on:click|once={() => {points += 2; matchData.score = points;matchData.left = true;}}>Leave Zone</button>
        {/if}
        {#if matchPhase == "Teleop"}
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={(e) => {if(matchData.climb == false){e.stopImmediatePropagation();matchData.climb = true;}else{harmonyVal = !harmonyVal;harmony(harmonyVal);}}} bind:this={climbBtn}>{#if matchData.climb == false}Climb Menu{/if}{#if matchData.climb == true}<input type="checkbox" name="harmony" style="display:none;"><label for="harmony"style="cursor:pointer" > Harmony</label>{/if}</button>
        {#if matchData.climb == true}
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.spotlight = !matchData.spotlight;spotlight(matchData.spotlight)}} bind:this={sptlghtBtn} style={sptlghtBtnStyle}>Spotlight</button>
        {/if}
        {/if} 
        {/if}
    </div>
</div>