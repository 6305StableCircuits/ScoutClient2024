<script lang=ts>
    import { goto } from "$app/navigation";
    import {onMount} from 'svelte';
    import {asLongAs} from '$lib/aslongas';
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
	import type { A } from "vitest/dist/reporters-MmQN-57K.js";
    let saveData: any;
    let saveDataMod:any;
    savedData.subscribe(value => {
        saveData = value;
    });
    $: {
        asLongAs(saveDataMod == undefined || saveDataMod == null, function(){
            saveDataMod = saveData;
        })
    }
    const sendData = function(){

    }
    let dialogRef: any;
  
    const editEvent = () => {
      dialogRef.showModal();
    };
  
    const closeDialog = () => {
      dialogRef.close();
    };

    onMount(() => {
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
            createElem.innerHTML = `<input type='checkbox' name='data${i}' checked onclick="document.getElementById('${i}').disabled = !this.checked">`;
            scheiße = JSON.parse(JSON.stringify(saveData[i])); //for some reason variables bind to each other
            schwanz = scheiße;
            datastuff = schwanz;
            var translate = `<label for='data${i}'>`;
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: " + datastuff.id + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: " + datastuff.startTime + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable='true' class='editable'>" + datastuff.team + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable='true' class='editable'>" + datastuff.round + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable='true' class='editable'>" + datastuff.scouter + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span contenteditable='true' class='editable'>" + datastuff.color + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable='true' class='editable'>" + datastuff.score + "</span></span><br>";
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
        }*/
    });
    var modalStuffData: any;
    var modalContents: any;
    var span: any;
    var modal: any;
    var body: any;
    $: {
        (modalContents || {innerHTML:"true"}).innerHTML = (modalStuffData||{innerHTML:"true"}).innerHTML;
    }
    var things:Array<any>;
    var checks:Array<any>;
    var teams:Array<any>;
    var scouters:Array<any>;
    var rounds:Array<any>;
    var scores:Array<any>;
    var alliances:Array<any>;
    var climbs:Array<any>;
    var spotlights:Array<any>;
    var harmonies:Array<any>;
    var traps:Array<any>;
    var misses:Array<any>;
    const changeItem = function(index:any, item:any, value:any){
        var stuffthing = saveData;
        var stuffthingthing = JSON.parse(JSON.stringify(stuffthing[+index]));
        stuffthingthing[item] = value;
        stuffthing[+index] = stuffthingthing;
        savedData.set(stuffthing);
        console.log(saveData);
    }
    var i:any;
    $: {
        for(i = 0; i<saveData.length;i++){
            teams[i].oninput = function(e:any){
                changeItem(i,"team",e.target.innerText);
            }
            scouters[i].oninput = function(e:any){
                changeItem(i,"scouter",e.target.innerText);
            }
            rounds[i].oninput = function(e:any){
                changeItem(i,"round",+e.target.innerText);
            }
            scores[i].oninput = function(e:any){
                changeItem(i,"score",+e.target.innerText);
            }
            climbs[i].oninput = function(e:any){
                changeItem(i, "climb", e.target.value);
            }
            harmonies[i].oninput = function(e:any){
                changeItem(i, "harmony", e.target.value);
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
    li.disabled {
        color: #888;
        pointer-events: none; 
    }

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
        <button on:click={() => {window.location.href = ('/')}} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-3xl-3xl">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <h1 class="text-8xl text-center font-bold text-eerie-black dark:text-floral-white">Stable Scout 3.0</h1>
    </div>
    <div class="flex md:flex-row flex-col w-full flex-grow items-center bg-eerie-black dark:bg-floral-white">
        <div id="data">
            <script lang="ts">
                           
            </script>
            {#each saveData as datastuff, i}
            <div id={i.toString()} bind:this={things[i]}>
                <input type='checkbox' name='data${i}' bind:this={checks[i]} checked on:click={()=>{(things[i]||{disabled:false}).disabled = !(checks[i]||{checked:true}).checked}}>
                <label for='data{i}'>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: {datastuff.id}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: {datastuff.startTime}</span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable='true' class='editable'bind:this={teams[i]} >{datastuff.team}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable='true' class='editable' bind:this={rounds[i]}>{datastuff.round}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable='true' class='editable' bind:this={scouters[i]}>{datastuff.scouter}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <select bind:this={alliances[i]}><option>{datastuff.color}</option><option>{["Red","Blue"][+(!!!["Red","Blue"].indexOf(datastuff.color))]}</option></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable='true' class='editable'bind:this={scores[i]}>{datastuff.score}</span></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <select bind:this={climbs[i]}><option>{datastuff.climb.toString()}</option><option>{(!!!datastuff.climb).toString()}</option></select></span><br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <select bind:this={harmonies[i]}><option>{datastuff.harmony.toString()}</option><option>{(!!!datastuff.harmony).toString()}</option></select></span><br>
                </label>
            </div>
            {/each}
        </div>
        <!--<button style="padding:4%; padding-top:2%; padding-bottom:2%; margin-top:2%; border-radius:10px" class="border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto" bind:this={btn} on:click={() => {modal.style.display = "block"}}>Edit Info</button>-->
        <div id="myModal" class="modal" bind:this={modal}>
        <div class="modal-content">
            <span aria-hidden="true" class="close" bind:this={span} on:click={() => {modal.style.display = "none"}}>&times;</span>
            <p bind:this={modalContents} contenteditable="true">If you see/hear this, get some help</p>
        </div>
        </div>
        <!--<button on:click={() => {sendData()}} class="text-8xl w-full h-full border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto items-center">Export Data</button>-->
    </div>
</div>
<!--bind:innerHTML={(document.querySelector('div[id=data]')||{innerHTML: false}).innerHTML}-->