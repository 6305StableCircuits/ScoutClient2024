
<script lang=ts>
	import { goto } from "$app/navigation";
	import { Timer } from "$lib/classes/Timer";
    import { get } from 'svelte/store';
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
    import {asLongAs} from '$lib/aslongas';
	import Layout from "../+layout.svelte";
    let team = 0; //the 170 line text wall of variables commences. you cannot escape it. do not try to escape it. it is too late for you. pray to whoever you believe in. call your parents, for once. tell them goodbye, and what you had for lunch. i had a sandwich.
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
        autoScore: 0,
        teleopScore: 0,
        advancedScoring: {
            autoamp: 0,
            autospeaker:0,
            teleamp:0,
            telespeaker:{
                charged: 0,
                reg: 0
            },
            rankingscore:0,
        },
        left: false,
        spotlight: false,
        trap: false,
        melody: false,
        ensemble: false,
        coopertition: false,
        dq: false,
        disabled: false,
        park: false,
        won: false,
        tie: false,
        misses: 0,
        foul: false,
        techFoul: false,
        redCard: false,
        yellowCard: false,
        summary: {
            text: "",
            preferences: {
                intake: "",
                score: "",
                scoreAuto: false,
            }
        },
        incapLogs:[
            <any>{},
        ],
        intakeLogs:[
            <any>{},
        ],
        shotLogs:[
            <any>{},
        ]
    };
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
    let lastAction: Array<any> = [];
    let undone: Array<any> = [];
    var thingthing = 0;
    var grounds = 0;
    var sources = 0;
    var thingthingthingthingthingthing = 0;
    var speakers = 0;
    var amps = 0;
    let melodyInteract = false;
    let melodyVal = false;
    let winVal = false;
    let winInteract = false;
    let parkVal = false;
    let dqVal = false;
    let dqInteract = false;
    let parkInteract = false;
    let parkBtn: any;
    let parkBtnStyle = "";
    let tieVal = false;
    let tieInteract = false;
    let coopVal = false;
    let coopInteract = false;
    let disabledInteract = false;
    let disabledBtn:any;
    let disabledVal = false;
    let climbInteract = false;
    let climbVal = false;
    let disabledBtnStyle = "";
    let ensembleInteract = false;
    let ensembleVal = false;
    let spotlightInteract = false;
    let harmonyInteract = false;
    let harmonyVal = false;
    let spotlightVal = false;
    let trapVal = false;
    let trapInteract = false;
    let lastRecordedSL = false;
    let lastRecordedE = false;
    let lastRecordedH = false;
    let lastRecordedW = false;
    let lastRecordedM = false;
    let lastRecordedT = false;
    let lastRecordedC = false;
    let lastRecordedP = false;
    let lastRecordedCl = false;
    let lastRecordedTr = false;
    let isFirstH = true;
    let isFirstE = true;
    let isFirstM = true;
    let isFirstW = true;
    let isFirstC = true;
    let isFirstP = true;
    let isFirstCl = true;
    let isFirstT = true;
    let isFirstSL = true
    let isFirstL = true;
    let isFirstD = true;
    let isFirstDq = true;
    let isFirstTr = true;
    let lastRecordedL = false;
    let leaveInteract = false;
    let leaveVal = false;
    var winBtn: any;
    var tieBtn: any;
    var tieBtnStyle = "";
    var winBtnStyle = "";
    var climbBtn:any;
    var climbBtnStyle = "";
    var sptlghtBtn:any;
    var melodyBtn:any;
    var ensembleBtn:any;
    var coopertitionBtn:any;
    var dqBtn:any;
    var leaveBtn: any;
    var trapBtn: any;
    var leaveBtnStyle = "";
    var ensembleBtnStyle = "";
    var dqBtnStyle = "";
    var coopertitionBtnStyle = "";
    var melodyBtnStyle = "";
    var sptlghtBtnStyle = "";
    var trapBtnStyle = "";
    var foulBtn:any;
    var foulBtnStyle = "";
    var tfoulBtn:any;
    var tfoulBtnStyle = "";
    var foulVal = false;
    var tfoulVal = false;
    var foulInteract = false;
    var tfoulInteract = false;
    var isFirstF = true;
    var isFirstTF = true;
    var lastRecordedF = false;
    var lastRecordedTF = false;
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
                matchPhase = "Auto";
                matchData.autoScore = matchData.score;
            }, function(){asLongAs((matchTimer.time + 1) > 15, function() {
                matchPhase = "Teleop";
                matchData.teleopScore = matchData.score;
            },function(){ asLongAs((matchTimer.time + 1) >= 150, function(){
                matchPhase = "Postgame";
            })})})})});
        },
        onEnd() {
            matchStarted = false;
            matchFinished = true;
        }
    });
    const summarize = function(){ //better than chatgpt
            for(thingthing = 0; thingthing < matchData.intakeLogs.length; thingthing++){
                if((matchData.intakeLogs[thingthing]).type == "ground"){
                    grounds++;
                }else{
                    sources++;
                }
            }
            for(thingthingthingthingthingthing = 0; thingthingthingthingthingthing < matchData.intakeLogs.length; thingthingthingthingthingthing++){
                if((matchData.intakeLogs[thingthingthingthingthingthing]).type == "speaker"){
                    speakers++;
                }else{
                    amps++;
                }
            }
            if(matchData.autoScore > 0){
                matchData.summary.preferences.scoreAuto = true;
            }
            matchData.summary.preferences.intake = grounds > sources ? "ground" : "source";
            matchData.summary.preferences.score = speakers > amps ? "speaker" : "amp";
            if(speakers == amps){
                if(speakers == 0){
                    matchData.summary.preferences.score = "neither";
                }else{
                    matchData.summary.preferences.score = "both";
                }
            }
            if(grounds == sources){
                if(grounds == 0){
                    matchData.summary.preferences.intake = "neither";
                }else{
                    matchData.summary.preferences.intake = "both";
                }
            }
            if(matchData.disabled && matchData.summary.preferences.intake == "neither" && matchData.summary.preferences.score == "neither"){
                matchData.summary.text = `In round ${matchData.round}, team ${matchData.team}'s robot was disabled the entire time.`;
            }else{
                matchData.summary.text = `In round ${matchData.round}, team ${matchData.team} ${matchData.autoScore > 0 ? "waited until Teleop to start. " : `immediately started scoring points, totalling ${matchData.autoScore == 1 ? matchData.autoScore + " point" : matchData.autoScore + " points"} earned in Autonomous. `} In Teleop, the bot preferred scoring the ${matchData.summary.preferences.score}, intaking${matchData.summary.preferences.intake == "both" ? "" : " mainly"} using ${matchData.summary.preferences.intake == "both" ? "both intakes" : "the " + matchData.summary.preferences.intake + " intake"}, and generated a total of ${matchData.teleopScore == 1 ? matchData.teleopScore + " point" : matchData.teleopScore + " points"}. In the end, team ${matchData.team}'s bot scored ${matchData.score == 1 ? matchData.score + " point" : matchData.score + " points"}, and their alliance ${matchData.won ? "won" : "lost"} the game.${matchData.dq == true ? ` ${matchData.team}'s robot was disqualified. ` : ""}`;
            }
            console.log(matchData.summary);
    }
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
    let cycleStart = 0;
    let cycleTime = 0;
    function scoreAmp(undo: boolean=false, redo: boolean=false) {
        cycleTime = Date.now()-cycleStart;
        if(!redo && !undo) {
            undone = [];
            asLongAs(matchPhase == "Auto" && hasIntaked, function() {
            matchData.advancedScoring.autoamp += 2;
            points += 2;
            }, function() {
                points += 1;
            });
            hasIntaked = false;
        }
        if(undo) {
            undone = [...undone, {type:"ampScore", points: -1, name: "Amp Score"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            matchData.advancedScoring.teleamp -= 1;
            points -= 1;
            hasIntaked = true;
        } else if(redo) {
            lastAction = [...lastAction, {type:"ampScore", points: 1, name: "Amp Score"}];
            if(undone.length != 0) {
                undone.pop();
            }
            matchData.advancedScoring.teleamp += 1;
            points += 1;
            hasIntaked = false;
        } else {
            lastAction = [...lastAction, {type:"ampScore", name: "Amp Score"}];
            if(undone.length != 0) {
                undone.pop();
            }
        }
        matchData.score = points;
        matchData.shotLogs.push({type:"amp",cycle:cycleTime.toString()+"ms"});
    }

    function scoreSpeaker(isCharge: boolean, undo: boolean=false, redo: boolean=false) {
        cycleTime = Date.now()-cycleStart;
        if(!redo && !undo) {
            asLongAs((isCharge || matchPhase == "Auto" && hasIntaked),  function() {
                points += 5;   
                if(isCharge){
                matchData.advancedScoring.telespeaker.charged+=5;
                }else{
                    matchData.advancedScoring.autospeaker+=5;
                }
            }, function() {
                points += 2;
                matchData.advancedScoring.telespeaker.reg+=2;
            });
            hasIntaked = false;
        } 
        if(undo && !isCharge) {
            undone = [...undone, {type:"speakerScore",points:-2,name: "Speaker Score"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            points -= 2;
            matchData.advancedScoring.telespeaker.reg -=2;
            hasIntaked = true;
        } else if(undo && isCharge) {
            undone = [...undone, {type:"chargedSpeakerScore",points:-5, name: "Charged Speaker Score"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            matchData.advancedScoring.telespeaker.charged-=5;
            points -= 5;
            hasIntaked = true;
        } else if(redo && !isCharge) {
            lastAction = [...lastAction, {type:"speakerScore",points:2, name: "Speaker Score"}];
            if(undone.length != 0) {
                undone.pop();
            }
            points += 2;
            matchData.advancedScoring.telespeaker.reg+=2;
            hasIntaked = false;
        } else if(redo && isCharge) {
            lastAction = [...lastAction, {type:"chargedSpeakerScore",points:5, name: "Charged Speaker Score"}];
            if(undone.length != 0) {
                undone.pop();
            }
            points += 5;
            matchData.advancedScoring.telespeaker.charged+=5;
            hasIntaked = false;
        } else {
            lastAction = [...lastAction, {type:"speakerScore", name: "Speaker Score"}];
            if(undone.length != 0) {
                undone.pop();
            }
        }
        matchData.score = points;
        matchData.shotLogs.push({type:"speaker",cycle:cycleTime.toString()+"ms"});
    }
    function intake(type: number, undo: boolean=false, redo: boolean=false) {
        cycleStart = Date.now();
        if(!redo && !undo) {
            hasIntaked = true;
        } 
        if(undo && type == 1) {
            undone = [...undone, {type:"groundIntake", name: "Ground Intake"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            hasIntaked = false;
        } else if(undo && type == 0) {
            undone = [...undone, {type:"sourceIntake", name: "Source Intake"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            hasIntaked = false;
        } else if(redo && type == 1) {
            lastAction = [...lastAction, {type:"groundIntake", name: "Ground Intake"}];
            if(undone.length != 0) {
                undone.pop();
            }
            hasIntaked = true;
        } else {
            lastAction = [...lastAction, {type: (type == 0 ? "sourceIntake" : "groundIntake"), name: (type == 0 ? "Source Intake" : "Ground Intake")}];
            if(undone.length != 0) {
                undone.pop();
            }
            hasIntaked = true;
        }
        matchData.intakeLogs.push({
            type: type == 1 ? "ground" : (type == 0 ? "source" : "unknown")
        });
    }

    function noteMiss(undo: boolean=false, redo: boolean=false) {
        if(!redo && !undo) {
            matchData.misses++;
            hasIntaked = false;
            }
        if(undo) {
            undone = [...undone, {type:"miss", name: "Miss"}];
            if(lastAction.length != 0) {
                lastAction.pop();
            }
            hasIntaked = true;
        } else if(redo) {
            lastAction = [...lastAction, {type:"miss", name: "Miss"}];
            if(undone.length != 0) {
                undone.pop();
            }
            hasIntaked = false;
        } else {
            lastAction = [...lastAction, {type:"miss", name: "Miss"}];
            if(undone.length != 0) {
                undone.pop();
            }
        }
    }
    $: if(spotlightInteract && lastRecordedSL !== matchData.spotlight && isFirstSL == false){
        if(spotlightVal == true){
            points+=1;
            matchData.score = points;
        }else if(spotlightVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedSL = spotlightVal;
    }
    $: if(ensembleInteract && lastRecordedE !== matchData.ensemble && isFirstE == false){
        if(ensembleVal == true){
            points+=1;
            matchData.score = points;
        }else if(ensembleVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedE = ensembleVal;
    }
    $:  if(harmonyInteract && lastRecordedH !== matchData.harmony && isFirstH == false){ 
        if(harmonyVal == true){
            points+=2;
            matchData.score = points;
        }else if(harmonyVal == false){
            points-=2;
            matchData.score = points;
        }
        lastRecordedH = harmonyVal;
    }
    $:  if(melodyInteract && lastRecordedM !== matchData.melody && isFirstM == false){ 
        if(melodyVal == true){
            points+=1;
            matchData.score = points;
        }else if(melodyVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedM = melodyVal;
    }
    $:  if(winInteract && lastRecordedW !== matchData.won && isFirstW == false){ 
        if(winVal == true){
            points+=2;
            matchData.score = points;
        }else if(winVal == false){
            points-=2;
            matchData.score = points;
        }
        lastRecordedW = winVal;
    }
    $:  if(tieInteract && lastRecordedT !== matchData.tie && isFirstT == false){ 
        if(tieVal == true){
            points+=1;
            matchData.score = points;
        }else if(tieVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedT = tieVal;
    }
    $:  if(parkInteract && lastRecordedP !== matchData.park && isFirstP == false){ 
        if(parkVal == true){
            points+=1;
            matchData.score = points;
        }else if(parkVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedP = parkVal;
    }
    $:  if(coopInteract && lastRecordedC !== matchData.coopertition && isFirstC == false){ 
        if(coopVal == true){
            points+=1;
            matchData.score = points;
        }else if(coopVal == false){
            points-=1;
            matchData.score = points;
        }
        lastRecordedC = coopVal;
    }
    $:  if(climbInteract && lastRecordedCl !== matchData.climb && isFirstCl == false){ 
        if(matchData.climb == true){
            points+=3;
            matchData.score = points;
        }else if(matchData.climb == false){
            points-=3;
            matchData.score = points;
        }
        lastRecordedCl = climbVal;
    }
    $: if(trapInteract && lastRecordedTr !== matchData.trap && isFirstTr == false){
        if(matchData.trap == true){
            points+=5;
            matchData.score = points;
        }else if(matchData.trap == false){
            points-=5;
            matchData.score = points;
        }
        lastRecordedTr = trapVal;
    }
    const ensemble = function(e: boolean){
        matchData.ensemble = e;
        ensembleVal = e;
        if(isFirstE == true){
            ensembleInteract = true;
            isFirstE = false;
        }
    }
    const spotlight = function(e: boolean){
        matchData.spotlight = e;
        spotlightVal = e;
        if(isFirstSL == true){
            spotlightInteract = true;
            isFirstSL = false;
        }
    }
    const melody = function(e: boolean){
        matchData.melody = e;
        melodyVal = e;
        if(isFirstM == true){
            melodyInteract = true;
            isFirstM = false;
        }
    }
    const park = function(e: boolean){
        matchData.park = e;
        parkVal = e;
        if(isFirstP == true){
            parkInteract = true;
            isFirstP = false;
        }
    }
    const win = function(e: boolean){
        matchData.won = e;
        winVal = e;
        if(isFirstW == true){
            winInteract = true;
            isFirstW = false;
        }
        if(matchData.tie == true && e == true){
            matchData.tie = false;
            tieVal = false;
        }
    }
    const tie = function(e: boolean){
        matchData.tie = e;
        tieVal = e;
        if(isFirstT == true){
            tieInteract = true;
            isFirstT = false;
        }
        if(matchData.won == true && e == true){
            matchData.won = false;
            winVal = false;
        }
    }
    const dq = function(e: boolean){
        matchData.dq = e;
        dqVal = e;
        if(isFirstDq == true){
            dqInteract = true;
            isFirstDq = false;
        }
    }
    const disabled = function(e: boolean){
        matchData.disabled = e;
        disabledVal = e;
        if(isFirstD == true){
            disabledInteract = true;
            isFirstD = false;
        }
    }
    const coop = function(e: boolean){
        matchData.coopertition = e;
        coopVal = e;
        if(isFirstC == true){
            coopInteract = true;
            isFirstC = false;
        }
    }
    const climb = function(e: boolean){
        matchData.climb = e;
        climbVal = e;
        if(isFirstCl == true){
            climbInteract = true;
            isFirstCl = false;
        }
        lastAction = [...lastAction, {type:"climb",points:3, name: "Climb"}];
    }
    const trap = function(e: boolean){
        matchData.trap = e;
        matchData.score = points;
        trapVal = e;
        if(isFirstTr == true){
            trapInteract = true;
            isFirstTr = false;
        }
    }
    const harmony = function(e: boolean){
        matchData.harmony = e;
        matchData.score = points;
        if(isFirstH == true){
            harmonyInteract = true;
            isFirstH = false;
        }
    }
    const leave = function(e: boolean){
        matchData.left = e;
        matchData.score = points;
        leaveVal = e;
        if(isFirstL == true){
            leaveInteract = true;
            isFirstL = false;
        }
    }
    const foul = function(e: boolean){
        matchData.foul = e;
        matchData.score = points;
        foulVal = e;
        if(isFirstF == true){
            foulInteract = true;
            isFirstF = false;
        }
    }
    const techFoul = function(e: boolean){
        matchData.techFoul = e;
        matchData.score = points;
        tfoulVal = e;
        if(isFirstTF == true){
            tfoulInteract = true;
            isFirstTF = false;
        }
    }
    $: {
        if(matchData.harmony == true){
            climbBtnStyle="background-color:rgb(4, 201, 7)";
        }else if(matchData.climb == false){
            climbBtnStyle = "background-color:rgb(234 89 31 / var(--tw-bg-opacity))";
        }else if(matchData.harmony == false){
            climbBtnStyle = "background-color:rgb(214,4,4)";
        }
        if(matchData.spotlight == true){
            sptlghtBtnStyle="background-color:rgb(4, 201, 7)";
        }else{
            sptlghtBtnStyle="background-color:rgb(214, 4, 4)";
        }
        if(matchData.trap == true){
            trapBtnStyle="background-color:rgb(4, 201, 7)";
        }else{
            trapBtnStyle="background-color:rgb(214, 4, 4)";
        }
        if(matchData.left == true){
            leaveBtnStyle = "background-color:rgb(4,201,7)";
        }else{
            leaveBtnStyle="background-color:rgb(214,4,4)";
        }
        if(matchFinished == true){
            if(matchData.melody == true){
                melodyBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                melodyBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.ensemble == true){
                ensembleBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                ensembleBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.coopertition == true){
                coopertitionBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                coopertitionBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.dq == true){
                dqBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                dqBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.won == true){
                winBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                winBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.park == true){
                parkBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                parkBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.disabled == true){
                disabledBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                disabledBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.tie == true){
                tieBtnStyle="background-color:rgb(4, 201, 7)";
            }else{
                tieBtnStyle="background-color:rgb(214, 4, 4)";
            }
            if(matchData.techFoul == true){
                tfoulBtnStyle = "background-color:rgb(4,201,7)";
            }else{
                tfoulBtnStyle = "background-color:rgb(214,4,4)";
            }
            if(matchData.foul == true){
                foulBtnStyle = "background-color:rgb(4,201,7)";
            }else{
                foulBtnStyle = "background-color:rgb(214,4,4)";
            }
        }
    }
$:  if(leaveInteract && lastRecordedL !== leaveVal){ 
        if(leaveVal == true){
            points+=2;
            matchData.score = points;
        }else if(leaveVal == false){
            points-=2;
            matchData.score = points;
        }
        lastRecordedL = leaveVal;
    }
var climbBtn:any;
var sptlghtBtn:any;
var sptlghtBtnStyle = "";
var trapBtn:any;
var trapBtnStyle = "";
    $: {
        if(points < 0){
            points = 0;
            matchData.score = points;
        }
    }

const undo = function() {
    if(lastAction.length !== 0) {
        let action = lastAction[lastAction.length-1]
        switch(action.type) {
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
            case "climb":
                matchData.climb = false;
                matchData.harmony = false;
                matchData.spotlight = false;
                undone = [...undone, {type:"climb", points:-3, name: "Climb"}];
                if(lastAction.length != 0) {
                    lastAction.pop();
                }
                points-=3;
                matchData.score = points;
            break;
            case "miss":
                noteMiss(true, false);
            break;
        }
        matchData.score = points;
    }
}
const redo = function() {
        if(undone.length !== 0) {
            let action = undone[undone.length - 1];
            switch(action.type) {
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
                case "climb":
                    matchData.climb = true;
                    lastAction = [...lastAction, {type:"climb",points:3, name: "Climb"}];
                    if(undone.length != 0) {
                        undone.pop();
                    }
                    points+=3;
                    matchData.score = points;
                break;
                case "miss":
                    noteMiss(false, true);
                break;
            }
            matchData.score = points;
        }
    }

    var thing2:any;
    let emptyData = {
        id: id,
        team: team,
        scouter: scouter,
        color: allianceColor,
        round: round,
        harmony: false,
        climb: false,
        startTime: "",
        score: 0,
        autoScore: 0,
        teleopScore: 0,
        left: false,
        spotlight: false,
        trap: false,
        melody: false,
        ensemble: false,
        coopertition: false,
        dq: false,
        disabled: false,
        park: false,
        won: false,
        tie: false,
        misses: 0,
        foul: false,
        techFoul: false,
        redCard: false,
        yellowCard: false,
        summary: {
            text: "",
            preferences: {
                intake: "",
                score: "",
                scoreAuto: false,
            }
        },
        incapLogs:[
            <any>{},
        ],
        intakeLogs:[
            <any>{},
        ],
        shotLogs:[
            <any>{},
        ]
    };
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
{#if scouter.toLowerCase() == "frisk"}
<div class="bg-black-olive h-screen md:border-[16px] border-8 border-eerie-black">
    <div class="flex pt-sm items-center justify-center" style="z-index:9999">
    <button on:dblclick={() => {if((matchStarted&&!matchFinished)||(JSON.stringify(matchData)!==JSON.stringify(emptyData)&&matchStarted)){console.log(JSON.stringify(matchData));console.log(JSON.stringify(emptyData));console.log(JSON.stringify(emptyData) == JSON.stringify(matchData));console.log(matchFinished);if(confirm("Are you sure you want to leave? Your match is not finished.")){summarize();goto('/')}}else{goto('/')}}} class="text-floral-white bg-black-olive rounded-2xl hover:bg-dark-hover absolute left-5 top-2.5" style="z-index:9999999">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    </button>  <span style="color: rgb(74 71 67 / var(--tw-bg-opacity));">butts</span><!--haha i aaflip wrote butts i'm so mature-->
    <span class="text-3xl text-floral-white text-center px-md py-sm absolute top-0 md:border-[16px] border-8 border-eerie-black w-full" id="matchTimer"> 
    <b style="border-bottom: 0.1em solid #ffffff; line-height: 0.1em;"><span>Team: {team}</span></b><br>
    {#if matchPhase=="Auto"}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {/if}
    {#if matchPhase=="Teleop"}
    &nbsp;&nbsp;
    {/if}
    {#if matchPhase=="Pregame"}
    &nbsp;&nbsp;
    {/if}
    {matchPhase} <span class="text-6xl">|</span> Score: {points} <span style="right:0;" class="absolute text-5xl"><b style="position:relative;bottom:25px">{Math.floor(((timeRemaining) / 60)) < 0 ? 0 : Math.floor((timeRemaining / 60))}:{String((timeRemaining) % 60 < 0 ? 0 : timeRemaining%60).padStart(2, '0')}&nbsp;&nbsp;</b></span>
</span>
</div>
<br><br><br>
{#if matchStarted}
    <div class="flex pt-xl items-center justify-center">
<button bind:this={thing2} class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{undo()}}>Undo{#if lastAction.length != 0}<br>{lastAction[lastAction.length - 1].name}{/if}</button>
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{redo()}}>Redo{#if undone.length != 0}<br>{undone[undone.length - 1].name}{/if}</button>        
</div>
{/if}
{#if matchFinished==true}
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.melody = !matchData.melody;melody(matchData.melody);}} bind:this={melodyBtn} style={melodyBtnStyle}>Melody</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.coopertition = !matchData.coopertition;coop(matchData.coopertition);}} bind:this={coopertitionBtn} style={coopertitionBtnStyle}>Coopertition</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.ensemble = !matchData.ensemble;ensemble(matchData.ensemble);}} bind:this={ensembleBtn} style={ensembleBtnStyle}>Ensemble</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.park = !matchData.park;park(matchData.park);}} bind:this={parkBtn} style={parkBtnStyle}>Park</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.dq = !matchData.dq;dq(matchData.dq)}} bind:this={dqBtn} style={dqBtnStyle}>Disqualified</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.disabled = !matchData.disabled;disabled(matchData.disabled)}} bind:this={disabledBtn} style={disabledBtnStyle}>Disabled</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.won = !matchData.won;win(matchData.won);}} bind:this={winBtn} style={winBtnStyle}>Win</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.tie = !matchData.tie;tie(matchData.tie);}} bind:this={tieBtn} style={tieBtnStyle}>Tie</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.foul = !matchData.foul;foul(matchData.foul);}} bind:this={foulBtn} style={foulBtnStyle}>Foul</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.techFoul = !matchData.techFoul;techFoul(matchData.techFoul);}} bind:this={tfoulBtn} style={tfoulBtnStyle}>Tech Foul</button><br>
    <br>
    <b class="flex text-3xl items-center justify-center text-floral-white">Penalties</b>
    <br><br>
    <span style="font-size:calc(var(--step-10) + var(--step-7))">&nbsp;&nbsp;</span>
    <b aria-hidden="true" style={matchData.redCard == true ? "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(214, 4, 4);background-color:rgb(4,201,7);" : "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(214, 4, 4)"} class="padding-0 bg-none text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.redCard = !matchData.redCard;}}>█</b>
    <b aria-hidden="true" style={matchData.yellowCard == true ? "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(255,217,25);background-color:rgb(4,201,7)" : "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(255,217,25)"} class="padding-0 bg-none text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:dblclick={()=>{matchData.yellowCard = !matchData.yellowCard}}>█</b><span style="font-size:calc(var(--step-10) + var(--step-10))">&nbsp;</span>
{/if}
<div class="flex pt-sm items-center justify-center">
    {#if (!matchStarted)&&(!matchFinished)}
        <button class="text-4xl text-floral-white text-center justify-center mt-64 bg-flame-500 px-md py-3xl rounded-md disabled:opacity-50 hover:opacity-85" on:dblclick={() => matchTimer.start()}>Start Match</button>
    {/if}
</div>
{#if matchStarted}
{#if !hasIntaked&&!matchFinished}
<div class="flex pt-sm items-center justify-center">
    <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-3xl rounded-lg mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:dblclick={()=>{intake(1)}}>Ground Intake</button>
    <button disabled={autoInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-3xl rounded-lg mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:dblclick={()=>{intake(0)}}>Source Intake</button>
</div>
{/if}
{/if}
{#if matchStarted&&hasIntaked&&!matchFinished}
    <div class="flex pt-sm items-center justify-center">
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" on:dblclick={() => scoreAmp()}>Amp Score</button>
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" on:dblclick={() => scoreSpeaker(isCharge = false)}>Speaker Score</button>
    </div>
    <div class="flex pt-md items-center justify-center">
        {#if matchPhase=="Teleop"}
        <button disabled={autoInvalid} class="text-xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" style="border:6px rgb(100, 100, 100) solid" on:dblclick={() => scoreSpeaker(isCharge = true)}>Charged Speaker Score</button>
        {/if}
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" style="border:6px rgb(100, 100, 100) solid" on:dblclick={() => noteMiss()}>Miss</button>
    </div>
{/if}
<div class="flex pt-sm items-center justify-center">
    {#if matchPhase == "Teleop"}
    <span class="text-3xl">&nbsp;&nbsp;</span>
    {/if}
    {#if matchStarted&&!matchFinished}
    {#if !isIncap}
    <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm w-[40%] disabled:opacity-50 enabled:hover:opacity-85" on:dblclick={() => incapTimer.start()}>Start Incap</button>
    {/if}
    {#if isIncap}
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:opacity-85 w-[40%]" on:dblclick={() => incapTimer.stop()}>
        {Math.floor(((stopwatch) / 60))}:{String((stopwatch) % 60).padStart(2, '0')}<br>End
    </button>
    {/if}
    {#if matchPhase == "Auto" || matchPhase == "Pregame"}
    <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[40%]" style={leaveBtnStyle} on:dblclick={() => {matchData.left = !matchData.left;leave(matchData.left)}} bind:this={leaveBtn}>Leave Zone</button>
    {/if}
    <div class="relative">
    {#if matchPhase == "Teleop"}
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:dblclick={(e) => {if(matchData.climb == false){e.stopImmediatePropagation();matchData.climb = true;climb(matchData.climb);}else{harmonyVal = !harmonyVal;harmony(harmonyVal);}}} bind:this={climbBtn} style={climbBtnStyle}>
        {#if matchData.climb == false}Climb Menu{/if}
        {#if matchData.climb == true}<input type="checkbox" name="harmony" style="display:none;"><label for="harmony"style="cursor:pointer" > Harmony</label>{/if}
    </button>
    <div class="bottom-0">
    {#if matchData.climb == true}
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:dblclick={()=>{matchData.spotlight = !matchData.spotlight;spotlight(matchData.spotlight)}} bind:this={sptlghtBtn} style={sptlghtBtnStyle}>Spotlight</button>
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:dblclick={()=>{matchData.trap = !matchData.trap;trap(matchData.trap)}} bind:this={trapBtn} style={trapBtnStyle}>Trap</button>
    {/if}
    </div>
    {/if}
    </div>
    {/if}
</div><br><br>
</div>
{:else}
{#if scouter.toLowerCase() == "sans"}
<style>
    *{
        font-family:cursive;
    }
</style>
{/if}
<div class="bg-black-olive h-screen md:border-[16px] border-8 border-eerie-black">
    <div class="flex pt-sm items-center justify-center" style="z-index:9999">
    <button on:click={() => {if((matchStarted&&!matchFinished)||(JSON.stringify(matchData)!==JSON.stringify(emptyData)&&matchStarted)){console.log(JSON.stringify(matchData));console.log(JSON.stringify(emptyData));console.log(JSON.stringify(emptyData) == JSON.stringify(matchData));if(confirm("Are you sure you want to leave? Your match is not finished.")){summarize();goto('/')}}else{goto('/')}}} class="text-floral-white bg-black-olive rounded-2xl hover:bg-dark-hover absolute left-5 top-2.5" style="z-index:9999999">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    </button>  <span style="color: rgb(74 71 67 / var(--tw-bg-opacity));">butts</span><!--haha i aaflip wrote butts i'm so mature-->
    <span class="text-3xl text-floral-white text-center px-md py-sm absolute top-0 md:border-[16px] border-8 border-eerie-black w-full" id="matchTimer"> 
    <b style="border-bottom: 0.1em solid #ffffff; line-height: 0.1em;"><span>Team: {team}</span></b><br>
    {#if matchPhase=="Auto"}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {/if}
    {#if matchPhase=="Teleop"}
    &nbsp;&nbsp;
    {/if}
    {#if matchPhase=="Pregame"}
    &nbsp;&nbsp;
    {/if}
    {matchPhase} <span class="text-6xl">|</span> Score: {points} <span style="right:0;" class="absolute text-5xl"><b style="position:relative;bottom:25px">{Math.floor(((timeRemaining) / 60)) < 0 ? 0 : Math.floor((timeRemaining / 60))}:{String((timeRemaining) % 60 < 0 ? 0 : timeRemaining%60).padStart(2, '0')}&nbsp;&nbsp;</b></span>
</span>
</div>
<br><br><br>
{#if matchStarted}
    <div class="flex pt-xl items-center justify-center">
<button bind:this={thing2} class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{undo()}}>Undo{#if lastAction.length != 0}<br>{lastAction[lastAction.length - 1].name}{/if}</button>
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-md rounded-lg mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{redo()}}>Redo{#if undone.length != 0}<br>{undone[undone.length - 1].name}{/if}</button>        
</div>
{/if}
{#if matchFinished==true}
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.melody = !matchData.melody;melody(matchData.melody);}} bind:this={melodyBtn} style={melodyBtnStyle}>Melody</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.coopertition = !matchData.coopertition;coop(matchData.coopertition);}} bind:this={coopertitionBtn} style={coopertitionBtnStyle}>Coopertition</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.ensemble = !matchData.ensemble;ensemble(matchData.ensemble);}} bind:this={ensembleBtn} style={ensembleBtnStyle}>Ensemble</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.park = !matchData.park;park(matchData.park);}} bind:this={parkBtn} style={parkBtnStyle}>Park</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.dq = !matchData.dq;dq(matchData.dq)}} bind:this={dqBtn} style={dqBtnStyle}>Disqualified</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.disabled = !matchData.disabled;disabled(matchData.disabled)}} bind:this={disabledBtn} style={disabledBtnStyle}>Disabled</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.won = !matchData.won;win(matchData.won);}} bind:this={winBtn} style={winBtnStyle}>Win</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.tie = !matchData.tie;tie(matchData.tie);}} bind:this={tieBtn} style={tieBtnStyle}>Tie</button><br>
    &nbsp;&nbsp;<button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.foul = !matchData.foul;foul(matchData.foul);}} bind:this={foulBtn} style={foulBtnStyle}>Foul</button>
    <button class="text-2xl bg-flame-500 text-floral-white px-md py-md rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.techFoul = !matchData.techFoul;techFoul(matchData.techFoul);}} bind:this={tfoulBtn} style={tfoulBtnStyle}>Tech Foul</button><br>
    <br>
    <b class="flex text-3xl items-center justify-center text-floral-white">Penalties</b>
    <br><br>
    <span style="font-size:calc(var(--step-10) + var(--step-7))">&nbsp;&nbsp;</span>
    <b aria-hidden="true" style={matchData.redCard == true ? "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(214, 4, 4);background-color:rgb(4,201,7);" : "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(214, 4, 4)"} class="padding-0 bg-none text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.redCard = !matchData.redCard;}}>█</b>
    <b aria-hidden="true" style={matchData.yellowCard == true ? "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(255,217,25);background-color:rgb(4,201,7)" : "font-size:calc(var(--step-10) + var(--step-10));margin-top:-100px;color:rgb(255,217,25)"} class="padding-0 bg-none text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[40%]" on:click={()=>{matchData.yellowCard = !matchData.yellowCard}}>█</b><span style="font-size:calc(var(--step-10) + var(--step-10))">&nbsp;</span>
{/if}
<div class="flex pt-sm items-center justify-center">
    {#if (!matchStarted)&&(!matchFinished)}
        <button class="text-4xl text-floral-white text-center justify-center mt-64 bg-flame-500 px-md py-3xl rounded-md disabled:opacity-50 hover:opacity-85" on:click={() => matchTimer.start()}>Start Match</button>
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
        <button class="text-4xl bg-flame-500 text-floral-white px-md py-lg rounded-lg mx-sm w-[40%] hover:bg-opacity-85" style="border:6px rgb(100, 100, 100) solid" on:click={() => noteMiss()}>Miss</button>
    </div>
{/if}
<div class="flex pt-sm items-center justify-center">
    {#if matchPhase == "Teleop"}
    <span class="text-3xl">&nbsp;&nbsp;</span>
    {/if}
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
    <button disabled={preGameInvalid} class="text-4xl bg-flame-500 text-floral-white px-md py-2xl rounded-lg mt-sm mx-sm disabled:opacity-50 enabled:hover:opacity-85 w-[40%]" style={leaveBtnStyle} on:click={() => {matchData.left = !matchData.left;leave(matchData.left)}} bind:this={leaveBtn}>Leave Zone</button>
    {/if}
    <div class="relative">
    {#if matchPhase == "Teleop"}
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:click={(e) => {if(matchData.climb == false){e.stopImmediatePropagation();matchData.climb = true;climb(matchData.climb);}else{harmonyVal = !harmonyVal;harmony(harmonyVal);}}} bind:this={climbBtn} style={climbBtnStyle}>
        {#if matchData.climb == false}Climb Menu{/if}
        {#if matchData.climb == true}<input type="checkbox" name="harmony" style="display:none;"><label for="harmony"style="cursor:pointer" > Harmony</label>{/if}
    </button>
    <div class="bottom-0">
    {#if matchData.climb == true}
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:click={()=>{matchData.spotlight = !matchData.spotlight;spotlight(matchData.spotlight)}} bind:this={sptlghtBtn} style={sptlghtBtnStyle}>Spotlight</button>
    <button class="text-4xl bg-flame-500 text-floral-white px-md py-sm rounded-lg mt-sm mx-sm hover:bg-opacity-85 w-[70%]" on:click={()=>{matchData.trap = !matchData.trap;trap(matchData.trap)}} bind:this={trapBtn} style={trapBtnStyle}>Trap</button>
    {/if}
    </div>
    {/if}
    </div>
    {/if}
</div><br><br>
</div>
{/if}
<!--whoa thats a lot of lines for something that was basically 85% done in 2 months, and mostly worked on by two people who didn't know the languages before starting-->