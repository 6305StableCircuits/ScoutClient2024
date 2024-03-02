
<script lang=ts>
	import { goto } from "$app/navigation";
	import { Timer } from "$lib/classes/Timer";
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
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
        startTime: "",
        score: 0,
        incapLogs:[
            {},
        ],
        intakeLogs: [
            {},
        ],
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
            if(saveData[duplicheck].id == id){
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
    
    function intake(type: number) {
        hasIntaked = true;
        matchData.intakeLogs.push({
            type: type == 1 ? "ground" : (type == 0 ? "source" : "unknown")
        });
    }

</script>

<div class="bg-black-olive h-screen">
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]" on:click={()=>{process.exit(0)}}>Close Server</button>
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
        <button disabled={preGameInvalid} class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[15%]" on:click={() => {points += 2}}>Leave</button>
        {/if}
        {#if matchPhase == "Teleop"}
        <button class="text-4xl bg-eerie-black text-floral-white px-md py-sm rounded-2xl mx-sm hover:bg-opacity-85 w-[15%]">Climb</button>
        {/if} 
        {/if}        
    </div>
    <center>
        <h1 class="text-8xl text-floral-white">{points}</h1>
    </center>
</div>