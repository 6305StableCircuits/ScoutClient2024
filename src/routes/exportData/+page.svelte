<script lang=ts>
    import { goto } from "$app/navigation";
    import {onMount} from 'svelte';
    import { teamNum, roundNum, alliance, scouterName, savedData } from "$lib/stores.js";
    let saveData: any;
    let saveDataMod:any;
    savedData.subscribe(value => {
        saveData = value;
    });
    $: {
        if(saveDataMod == undefined || saveDataMod == null){
            saveDataMod = saveData;
        }
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
            createElem = document.createElement("li");
            createElem.id = i.toString();
            createElem.innerHTML = `<input type='checkbox' checked onclick="document.getElementById('${i.toString}').disabled = !this.checked">`;
            datastuff = saveData[i];
            var translate = "";
            translate+="<span>" + datastuff.id + "</span><br><span>" + datastuff.startTime + "</span><br>";
            translate+="<span>" + datastuff.team + "</span><br>";
            translate+="<span>" + datastuff.round + "</span><br>";
            translate+="<span>" + datastuff.scouter + "</span><br>";
            translate+="<span>" + datastuff.color + "</span><br>";
            for(var fixintake = 0; fixintake < datastuff.intakeLogs.length; fixintake++){
                datastuff.intakeLogs[fixintake] = JSON.stringify(datastuff.intakeLogs[fixintake]);
            }
            datastuff.intakeLogs = datastuff.intakeLogs.join('<br>');
            for(var incapfix = 0; incapfix < datastuff.incapLogs.length; incapfix++){
                datastuff.incapLogs[incapfix] = JSON.stringify(datastuff.incapLogs[incapfix]);
            }
            datastuff.incapLogs = datastuff.incapLogs.join('<br>');
            translate+="<h3>Intake Logs</h3>"+datastuff.intakeLogs + "<br>";
            translate+="<h3>Incap Logs</h3>"+datastuff.incapLogs + "<br>";
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
        display: flex; /* Align checkbox and text horizontally */
        align-items: center; /* Center vertically */
    }
    input[type="checkbox"] {
        margin-right: 10px; /* Add some spacing between checkbox and text */  
    }
    li.disabled {
        color: #888; /* Grayed out text color */
        pointer-events: none; /* Disable interactions */
    }
</style>
<div class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <div class="flex p-sm justify-center md:border-b-[16px] border-b-8 border-timberwolf dark:border-eerie-black text-wrap items-center relative">
        <button on:click={() => goto('/')} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
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