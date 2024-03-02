<script lang=ts>
    import { goto } from "$app/navigation";
    import {onMount} from 'svelte';
    import {asLongAs} from '$lib/aslongas';
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
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
    onMount(() => {
        console.log(saveData);
        var dataElem = [];
        var createElem;
        var datastuff;
        //Doesn't display more than one dataset at a time
        for(var i = 0; i < saveData.length; i++){
            createElem = document.createElement("div");
            createElem.id = i.toString();
            createElem.innerHTML = `<input type='checkbox' name='data${i.toString()}' checked onclick="document.getElementById('${i.toString()}').disabled = !this.checked">`;
            datastuff = saveData[i];
            var translate = `<label for='data${i.toString()}'>`;
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: " + datastuff.id + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: " + datastuff.startTime + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: " + datastuff.team + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: " + datastuff.round + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: " + datastuff.scouter + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: " + datastuff.color + "</span><br>";
            datastuff.climb = datastuff.climb==undefined ? "false" : datastuff.climb.toString();
            datastuff.harmony = datastuff.harmony==undefined ? "false" : datastuff.harmony.toString();
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: " + (datastuff.climb) + "</span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: " + (datastuff.harmony) + "</span><br>";
            for(var fixintake = 1; fixintake < datastuff.intakeLogs.length; fixintake++){
                datastuff.intakeLogs[fixintake] = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: " + datastuff.intakeLogs[fixintake].type + "</span>";
            }
            datastuff.intakeLogs.shift();
            datastuff.intakeLogs = datastuff.intakeLogs.join('<br>');
            for(var incapfix = 1; incapfix < datastuff.incapLogs.length; incapfix++){
                datastuff.incapLogs[incapfix] = "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: " + datastuff.incapLogs[incapfix].start + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time: " + datastuff.incapLogs[incapfix].end + "</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration: " + (+datastuff.incapLogs[incapfix].duration)/1000 + " seconds</span>";
            }
            datastuff.incapLogs.shift();
            datastuff.incapLogs = datastuff.incapLogs.join('<br>');
            translate+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p>"+datastuff.intakeLogs + "</p></details><br>";
            translate+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Incap Logs</summary><p>"+datastuff.incapLogs + "</p></details><br>";
            translate+="</label>";
            createElem.innerHTML+=translate;

            dataElem.push(createElem);
            (document.querySelector('div[id=data]')||{appendChild: (thing: any)=>{return thing||false;}}).appendChild(createElem);
        }
    });
</script>
<style>
    ul {
        list-style-type: none; /* Remove default bullet points */
    }
    li {
        text-indent: 4em;
        margin-left: 40px;
        display: flex; /* Align checkbox and text horizontally */
        align-items: center; /* Center vertically */
    }
    /*input[type="checkbox"] {
        margin-right: 10px; 
    }*/
    li.disabled {
        color: #888; /* Grayed out text color */
        pointer-events: none; /* Disable interactions */
    }
</style>
<div class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
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

        </div>
        <!--<button on:click={() => {sendData()}} class="text-8xl w-full h-full border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto items-center">Export Data</button>-->
    </div>
</div>