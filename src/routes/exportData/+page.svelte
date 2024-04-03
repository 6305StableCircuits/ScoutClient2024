<script lang=ts>
    import { goto, pushState } from "$app/navigation";
    import {onMount} from 'svelte';
    import {asLongAs} from '$lib/aslongas';
    import {savedData} from "$lib/stores.js";
    //import {loadObserver} from "$lib/utils";
	//import type { A } from "vitest/dist/reporters-MmQN-57K.js";
	import { get} from "svelte/store";
    var document = {
        readyState: "initialized",
        load: ()=>{
            document.readyState="complete"
        }
    };
    onMount(document.load);
	//import { split, split } from "postcss/lib/list";
    var saveDataMod:any;
    var saveData:any;
    savedData.subscribe(value => {
        saveData = value;
    });
    //var saveData = get(savedData);
    $: {
        asLongAs(saveDataMod == undefined || saveDataMod == null, function(){
            saveDataMod = saveData;
        })
    }
    var download:any;
    const sendData = function(){
        var file = new Blob([JSON.stringify(saveData)],{type: 'text/json;charset=utf-8;'});
        var url = URL.createObjectURL(file);
        download.href = url;
        download.click();
        download.href = "about:blank";
    }
    let dialogRef: any;
  
    const editEvent = () => {
      dialogRef.showModal();
    };
  
    const closeDialog = () => {
      dialogRef.close();
    };

    /*onMount(() => {
        console.log(saveData);
        /*var dataElem = [];
        var createElem;
        var datastuff;
        var scheiße;
        var schwanz;
        for(var i = 0; i < saveData.length; i++){
            changeItem(0,'scouter','balls');
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
            
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <select><option>" + (datastuff.climb) + "</option><option>" + !!!datastuff.climb + "</option></select></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <select><option>" + (datastuff.harmony) + "</option><option>" + !!!datastuff.harmony + "</option></select></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spotlight: <select><option>" + (datastuff.spotlight) + "</option><option>" + !!!datastuff.spotlight + "</option></select></span><br>";
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
    var modalStuffData: any;
    var modalContents: any;
    var span: any;
    var modal: any;
    var body: any;
    $: {
        (modalContents || {innerHTML:"true"}).innerHTML = (modalStuffData||{innerHTML:"true"}).innerHTML;
        if(domLoaded && oldchecks !== checks){
            for(thingthingthingthing = 0; thingthingthingthing < checks.length; thingthingthingthing++){
                disables[thingthingthingthing] = !checks[thingthingthingthing];
            }
            oldchecks = checks;
        }
    }
    const fileName = function(){
        var d = new Date();
        var date = (["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"][d.getMonth()] + "_" + d.getDate() + ",_" + d.getFullYear() + "_at_" + d.getHours() + ":" + d.getMinutes() + (d.getHours() > 12 ? "PM" : "AM"));
        return "scoutSessions_on_" + date + ".json";
    }
    let domLoaded = false;
    let loaded = false;
    let things:Array<any>;
    let checks=[
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
    ]; //session limit is 150
    let teams:Array<any>;
    let scouters:Array<any>;
    let rounds:Array<any>;
    let scores:Array<any>;
    let disables:Array<any>;
    let alliances:Array<any>;
    let climbs:Array<any>;
    let spotlights:Array<any>;
    let harmonies:Array<any>;
    let traps:Array<any>;
    let misses:Array<any>;
    let intakes:Array<any>;
    let incaps:Array<any>;
    let shots:Array<any>;
    let wins:Array<any>;
    let ties:Array<any>;
    let coops:Array<any>;
    let penalties:Array<any>;
    let fouls:Array<any>;
    let leaves:Array<any>;
    let ensembles:Array<any>;
    let melodies:Array<any>;
    let techFouls:Array<any>;
    let parks:Array<any>;
    let dqs:Array<any>;
    onMount(()=>{
        loaded = true;
        loadDate = Date.now()+10;
    });
    var thingthingthingthingthing:any;
    $:if(domLoaded){
        for(thingthingthingthingthing = 0; thingthingthingthingthing < checks.length; thingthingthingthingthing++){
            teams[thingthingthingthingthing].contenteditable = checks[thingthingthingthingthing];
            scouters[thingthingthingthingthing].contenteditable = checks[thingthingthingthingthing];
            rounds[thingthingthingthingthing].contenteditable = checks[thingthingthingthingthing];
            scores[thingthingthingthingthing].contenteditable = checks[thingthingthingthingthing];
            alliances[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            spotlights[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            harmonies[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            misses[thingthingthingthingthing].contenteditable = checks[thingthingthingthingthing];
            climbs[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            ties[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            coops[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            disables[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            wins[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            leaves[thingthingthingthingthing].disabled = !checks[thingthingthingthingthing];
            
        }
    }
    var loadDate = 0;
    const changeItem = function(index:any, item:any, value:any){
        var stuffthing = saveData;
        var thingthingthing = Number(index);
        var stuffthingthing = JSON.parse(JSON.stringify(stuffthing[+index]));
        stuffthingthing[item] = value;
        (stuffthing as Array<any>)[Number(index)] = stuffthingthing;
        savedData.set(stuffthing);
        console.log(saveData);
    }
    var thingthingthingthing = 0;
    var oldchecks:Array<any>;
    var sD = JSON.parse(JSON.stringify(saveData));
    var a:any;
    $: {
        if(domLoaded == true && loaded == true){
            for(a = 0; a<sD.length;a++){
                teams[a].oninput = function(e:any){
                    changeItem(a,"team",e.target.innerText);
                }
                scouters[a].oninput = function(e:any){
                    changeItem(a,"scouter",e.target.innerText);
                }
                rounds[a].oninput = function(e:any){
                    changeItem(a,"round",+e.target.innerText);
                }
                scores[a].oninput = function(e:any){
                    changeItem(a,"score",+e.target.innerText);
                }
                misses[a].oninput = function(e:any){
                    changeItem(a,"misses",+e.target.innerText);
                }
                climbs[a].oninput = function(e:any){
                    changeItem(a, "climb", e.target.value);
                }
                harmonies[a].oninput = function(e:any){
                    changeItem(a, "harmony", e.target.value);
                }
                spotlights[a].oninput = function(e:any){
                    changeItem(a, "spotlight", e.target.value);
                }
            }
        }
    }
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
    /*input[type="checkbox"] {
        margin-right: 10px; 
    }*/

    .editable{
        padding-right: 50px;
    }

    .modal {
        display: none;
        position: absolute; 
        z-index: 999; 
        padding-top: 100px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: auto; 
        background-color: rgba(0,0,0,0);
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor:pointer;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
</style>
<div aria-hidden="true" on:click={(event) => {if (event.target == modal) {modal.style.display = "none";}}} bind:this={body} class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <div class="flex p-sm justify-center md:border-b-[16px] border-b-8 border-timberwolf dark:border-eerie-black text-wrap items-center relative">
        <button on:click={() => {location.href = "/"}} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-3xl-3xl">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <h1 class="text-8xl text-center font-bold text-eerie-black dark:text-floral-white">Stable Scout 3.0</h1>
    </div>
    <div class="flex md:flex-row flex-col w-full flex-grow items-center bg-eerie-black dark:bg-floral-white">
        <div id="data">
            {#if loaded == true}
            {#await loadDate < Date.now()}
            <!--don't remove this comment, otherwise the scary yellow lines come back-->
            {:then}
            {#each saveData as datastuff, i}
            <div id={i.toString()} bind:this={things[i]}>
                <input type='checkbox' name='data${i}' bind:checked={checks[i]}>
                <label for='data{i}'>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: {JSON.parse(JSON.stringify(datastuff)).id}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: {JSON.parse(JSON.stringify(datastuff)).startTime}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable={checks[i]} class='editable'bind:this={teams[i]} >{JSON.parse(JSON.stringify(datastuff)).team}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable={checks[i]} class='editable' bind:this={rounds[i]}>{JSON.parse(JSON.stringify(datastuff)).round}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable={checks[i]} class='editable' bind:this={scouters[i]}>{JSON.parse(JSON.stringify(datastuff)).scouter}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <select bind:this={alliances[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).color}</option><option>{["Red","Blue"][+(!!!["Red","Blue"].indexOf(JSON.parse(JSON.stringify(datastuff)).color))]}</option></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable={checks[i]} class='editable'bind:this={scores[i]}>{JSON.parse(JSON.stringify(datastuff)).score}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable={checks[i]} class='editable'bind:this={misses[i]}>{JSON.parse(JSON.stringify(datastuff)).misses}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <select bind:this={climbs[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).climb.toString()}</option><option>{(!!!JSON.parse(JSON.stringify(datastuff)).climb).toString()}</option></select></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <select bind:this={harmonies[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).harmony.toString()}</option><option>{(!!!JSON.parse(JSON.stringify(datastuff)).harmony).toString()}</option></select></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spotlight: <select bind:this={spotlights[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).spotlight.toString()}</option><option>{(!!!JSON.parse(JSON.stringify(datastuff)).spotlight).toString()}</option></select></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trap: <select bind:this={traps[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).trap.toString()}</option><option>{(!!!JSON.parse(JSON.stringify(datastuff)).trap).toString()}</option></select></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Win: <select bind:this={wins[i]} disabled={!checks[i]}><option>{JSON.parse(JSON.stringify(datastuff)).won.toString()}</option><option>{(!!!JSON.parse(JSON.stringify(datastuff)).won).toString()}</option></select></span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p bind:this={intakes[i]}>
                    {#each JSON.parse(JSON.stringify(datastuff)).intakeLogs as intakeThing, w}
                    {#if (intakeThing.type == "ground" || intakeThing.type == "source")}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: {intakeThing.type}</span><br>
                    {/if}
                    {/each}
                    </p></details><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p bind:this={shots[i]}>
                    {#each JSON.parse(JSON.stringify(datastuff)).shotLogs as shotThing, w}
                    {#if (shotThing.type == "speaker" || shotThing.type == "amp")}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: {shotThing.type}</span><br>
                    {/if}
                    {/each}
                    </p></details><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Incap Logs</summary><p bind:this={incaps[i]}>
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
            {#await i == JSON.parse(JSON.stringify(savedData)).length}
            <script>
                domLoaded = false;
            </script>
            {:then}
            <script>
                domLoaded = true;
            </script>
            {/await}
            {/each}
            {/await}
            {/if}
        </div>
        <!--<button style="padding:4%; padding-top:2%; padding-bottom:2%; margin-top:2%; border-radius:10px" class="border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto" bind:this={btn} on:click={() => {modal.style.display = "block"}}>Edit Info</button>-->
        <div id="myModal" class="modal" bind:this={modal}>
        <div class="modal-content">
            <span aria-hidden="true" class="close" bind:this={span} on:click={() => {modal.style.display = "none"}}>&times;</span>
            <p bind:this={modalContents} contenteditable="true">If you see/hear this, get some help</p>
        </div>
        </div>
        <button on:click={() => {sendData()}} class="text-l bg-eerie-black text-floral-white px-md py-sm rounded-xl mx-sm hover:bg-opacity-85 w-[40%]">Export Data</button>
        <a bind:this={download} style="display:none" href="about:blank" download={fileName()}><span></span></a>
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