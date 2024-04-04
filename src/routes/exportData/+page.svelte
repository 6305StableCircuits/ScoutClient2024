<script lang=ts>
    import { goto, pushState } from "$app/navigation";
    import {onMount} from 'svelte';
    import {asLongAs} from '$lib/aslongas';
    import {savedData,scouterName} from "$lib/stores.js";
	import { get} from "svelte/store";
    var document = {
        readyState: "initialized",
        load: ()=>{
            document.readyState="complete";
            loaded = true;
        }
    };
    onMount(document.load);
    var saveData:any;
    saveData = get(savedData);
    var download:any;
    const sendData = function(){
        var sD = saveData;
        if(checks.includes(false)){
            for(var w = checks.length;w<checks.length;w++){
                if(checks[w]==false){
                    sD = sD.splice(w-1, 1);
                }
            }
        }
        var file = new Blob([JSON.stringify({scouter: get(scouterName), sessions: sD})],{type: 'text/json;charset=utf-8;'});
        var url = URL.createObjectURL(file);
        download.href = url;
        download.download = fileName();
        download.click();
        download.href = "about:blank";
    }
    let dialogRef: any;
    /*
    const editEvent = () => {
      dialogRef.showModal();
    };
  
    const closeDialog = () => {
      dialogRef.close();
    };
    */
    /*onMount(() => {
        console.log(saveData);
        /*var dataElem = [];
        var createElem;
        var datastuff;
        var scheiße;
        var schwanz;
        for(var i = 0; i < saveData.length; i++){
            createElem = document.createElement("div");
            createElem.id = i.toString();
            createElem.innerHTML = `<input type='checkbox' name='data${i}' checked onclick="document.getElementById('${i}').disabled = !this">`;
            scheiße = JSON.parse(JSON.stringify(saveData[i])); //for some reason variables bind to each other
            schwanz = scheiße;
            datastuff = schwanz;
            var translate = `<label for='data${i}'>`;
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: " + datastuff.id + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: " + datastuff.startTime + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable={checks[i]} class='editable'>" + datastuff.team + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable={checks[i]} class='editable'>" + datastuff.round + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable={checks[i]} class='editable'>" + datastuff.scouter + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span contenteditable={checks[i]} class='editable'>" + datastuff.color + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable={checks[i]} class='editable'>" + datastuff.score + "</span></span><br>";
            datastuff.climb = datastuff.climb==undefined ? "false" : datastuff.climb;
            datastuff.harmony = datastuff.harmony==undefined ? "false" : datastuff.harmony;
            datastuff.spotlight = datastuff.spotlight==undefined ? "false" : datastuff.spotlight;
            
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <span>" + (datastuff.climb) + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <span>" + (datastuff.harmony) + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spotlight: <span>" + (datastuff.spotlight) + "</span></span><br>";
            for(var fixintake = 1; fixintake < datastuff.intakeLogs.length; fixintake++){
                datastuff.intakeLogs[fixintake] = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: " + datastuff.intakeLogs[fixintake].type + "</span>";
            }
            datastuff.intakeLogs.shift();
            datastuff.intakeLogs = datastuff.intakeLogs.join('<br>');
            for(var fixshots = 1; fixshots < datastuff.shotLogs.length; fixshots++){
                datastuff.shotLogs[fixshots] = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: " + datastuff.shotLogs[fixshots].type + "</span>";
            }
            datastuff.shotLogs.shift();
            datastuff.shotLogs = datastuff.shotLogs.join('<br>');
            for(var incapfix = 1; incapfix < datastuff.incapLogs.length; incapfix++){
                datastuff.incapLogs[incapfix] = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: " + datastuff.incapLogs[incapfix].start + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time: " + datastuff.incapLogs[incapfix].end + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration: " + (+datastuff.incapLogs[incapfix].duration)/1000 + " seconds</span>";
            }
            datastuff.incapLogs.shift();
            datastuff.incapLogs = datastuff.incapLogs.join('<br>');
            translate+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p>"+datastuff.intakeLogs + "</p></details><br>";
            translate+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p>"+datastuff.shotLogs + "</p></details><br>";
            translate+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Incap Logs</summary><p>"+datastuff.incapLogs + "</p></details><br>";
            translate+="</label>";
            createElem.innerHTML+=translate;
            console.log(createElem.innerHTML);
            dataElem.push(createElem);
            modalStuffData.appendChild(createElem);
        }
    });*/
    var body: any;
    const fileName = function(){
        var d = new Date();
        var date = (["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"][d.getMonth()] + "_" + d.getDate() + ",_" + d.getFullYear() + "_at_" + d.getHours() + ":" + d.getMinutes() + (d.getHours() > 12 ? "PM" : "AM"));
        return "scoutSessions_on_" + date + ".json";
    }
    let domLoaded = false;
    let loaded = false;
    let checks = [true];
    for(let checkAdd = 0; checkAdd < 1000; checkAdd++){
        checks.push(true);
    } //session limit is 1000, sorry for people who save more sessions than that
</script>
<style>
    ul {
        list-style-type: none; 
    }
    li {
        text-indent: 4em;
        margin-left: 40px;
        display: flex; 
        align-items: center; 
    }
</style>
<div bind:this={body} class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <div class="flex p-sm justify-center md:border-b-[16px] border-b-8 border-timberwolf dark:border-eerie-black text-wrap items-center relative">
        <button on:click={() => {location.href = "/"}} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-3xl-3xl">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <h1 class="text-8xl text-center font-bold text-eerie-black dark:text-floral-white">&nbsp;&nbsp;&nbsp;Stable Scout 3.0</h1>
    </div>
    <div class="flex md:flex-row flex-col w-full flex-grow items-center bg-eerie-black dark:bg-floral-white">
        <div id="data">
            {#each saveData as datastuff, i}
            <div id={i.toString()} >
                <input type='checkbox' name='data${i}' bind:checked={checks[i]}>
                <label for='data{i}' style={checks[i] == true ? "" : "color:red"}>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: {JSON.parse(JSON.stringify(datastuff)).id}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: {JSON.parse(JSON.stringify(datastuff)).startTime}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span >{JSON.parse(JSON.stringify(datastuff)).team}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span>{JSON.parse(JSON.stringify(datastuff)).round}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span>{JSON.parse(JSON.stringify(datastuff)).scouter}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span>{JSON.parse(JSON.stringify(datastuff)).color}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auto Score: <span>{JSON.parse(JSON.stringify(datastuff)).autoScore}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teleop Score: <span>{JSON.parse(JSON.stringify(datastuff)).teleopScore}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span>{JSON.parse(JSON.stringify(datastuff)).score}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Misses: <span>{JSON.parse(JSON.stringify(datastuff)).misses}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <span>{JSON.parse(JSON.stringify(datastuff)).climb.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <span>{JSON.parse(JSON.stringify(datastuff)).harmony.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spotlight: <span>{JSON.parse(JSON.stringify(datastuff)).spotlight.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trap: <span>{JSON.parse(JSON.stringify(datastuff)).trap.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Park: <span>{JSON.parse(JSON.stringify(datastuff)).park.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Win: <span>{JSON.parse(JSON.stringify(datastuff)).won.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tie: <span>{JSON.parse(JSON.stringify(datastuff)).tie.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Coopertition: <span>{JSON.parse(JSON.stringify(datastuff)).coopertition.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Melody: <span>{JSON.parse(JSON.stringify(datastuff)).melody.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ensemble: <span>{JSON.parse(JSON.stringify(datastuff)).ensemble.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disabled: <span>{JSON.parse(JSON.stringify(datastuff)).disabled.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disqualified: <span>{JSON.parse(JSON.stringify(datastuff)).dq.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Red Card: <span>{JSON.parse(JSON.stringify(datastuff)).redCard.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yellow Card: <span>{JSON.parse(JSON.stringify(datastuff)).yellowCard.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Foul: <span>{JSON.parse(JSON.stringify(datastuff)).foul.toString()}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tech Foul: <span>{JSON.parse(JSON.stringify(datastuff)).techFoul.toString()}</span></span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p >
                    {#each JSON.parse(JSON.stringify(datastuff)).intakeLogs as intakeThing, w}
                    {#if (intakeThing.type == "ground" || intakeThing.type == "source")}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: {intakeThing.type}</span><br>
                    {/if}
                    {/each}
                    </p></details><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p >
                    {#each JSON.parse(JSON.stringify(datastuff)).shotLogs as shotThing, w}
                    {#if (shotThing.type == "speaker" || shotThing.type == "amp")}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: {shotThing.type}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cycle Time: {shotThing.cycleTime}</span><br>
                    {/if}
                    {/each}
                    </p></details><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Incap Logs</summary><p >
                    {#each JSON.parse(JSON.stringify(datastuff)).incapLogs as incapThing, w}
                    {#if (incapThing.start == undefined)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: {incapThing.start}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time: {incapThing.end}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration: {+incapThing.duration/1000} seconds</span>
                    {/if}
                    {/each}
                    </p></details><br>
                </label>
            </div>
            {/each}
        </div>
        <!--<button style="padding:4%; padding-top:2%; padding-bottom:2%; margin-top:2%; border-radius:10px" class="border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto" bind:this={btn} on:click={() => {modal.style.display = "block"}}>Edit Info</button>-->
        <button on:click={() => {sendData()}} class="text-l bg-eerie-black text-floral-white px-md py-sm rounded-xl mx-sm hover:bg-opacity-85 w-[40%]">Export Data</button>
        <a bind:this={download} style="display:none" href="about:blank" download><span></span></a>
    </div>
    <div style="display:none"> <!--this also hides the scary yellow lines-->
        <ul>
        <li>
        </li>
    </ul>
    </div>
</div>
<!--bind:innerHTML={(document.querySelector('div[id=data]')||{innerHTML: false}).innerHTML}-->
<!--People say insanity is trying the same thing again and again and expecting a different result. That's not insanity, that's programming. - me[computerguy] -->