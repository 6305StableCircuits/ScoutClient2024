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
    let dialogRef: any;
  
    const editEvent = () => {
      dialogRef.showModal();
    };
  
    const closeDialog = () => {
      dialogRef.close();
    };

    const htmlToJson = function(html:string){
        var json = {};
        var id = html.split("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: ")[1].split("</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: ")[0];
        var currentSplit = html.split("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: ")[1].split("</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: ");
        currentSplit.shift();
        currentSplit.join("</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time: ").toString();
        var startTime = (currentSplit as any as string).split("</span><br>")[0];
        currentSplit = (currentSplit as any as string).split("</span><br>");
        currentSplit.shift();
        currentSplit.join("</span><br>");
        var team = (currentSplit as any as string).split("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable='true' class='editable'>")[1].split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        var round = (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        var scouter = (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        var alliance = (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        var score = (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        var climbed = (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <span contenteditable='true' class='editable'>")[0];
        (currentSplit as any as string).split("</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <span contenteditable='true' class='editable'>");
        currentSplit.shift();
        currentSplit.join("");
        (currentSplit as any as string).split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ");
        currentSplit.shift();
        currentSplit.join("");
        var stuff = currentSplit;
        var intakeLogs = [];
        var incapLogs = [];
        var shotLogs = [];
        var intakeThing: any;
        var incapThing: any;
        var shotThing: any;
        if(!stuff.includes("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p></p></details><br>")){
            intakeThing = (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ")[0];
            intakeLogs.push(intakeThing);
            while(stuff.includes("ground")||stuff.includes("source")){
                (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ");
                currentSplit.shift();
                currentSplit.join("");
                stuff = currentSplit;
                intakeThing = (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ")[0];
                intakeLogs.push({type: intakeThing});
            }
            (currentSplit as any as string).split("</span></p></details><br>");
            currentSplit.shift();
            currentSplit.join("</span></p></details><br>");
            stuff = currentSplit;
        }else{
            (currentSplit as any as string).split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Intake Logs</summary><p></details><br>");
            currentSplit.shift();
            try{
                currentSplit.join("");
            }catch(err){}
            stuff = currentSplit;
        }
        if(!stuff.includes("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p></p></details><br>")){
            while(stuff.includes("amp")||stuff.includes("speaker")){
                (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ");
                currentSplit.shift();
                currentSplit.join("");
                stuff = currentSplit;
                shotThing = (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ")[0];
                shotLogs.push({type: shotThing}); 
            }
            (currentSplit as any as string).split("</span></p></details><br>");
            currentSplit.shift();
            currentSplit.join("</span></p></details><br>");
            stuff = currentSplit;
        }else{
            (currentSplit as any as string).split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p></p></details><br>");
            currentSplit.shift();
            try{
                currentSplit.join("");
            }catch(err){}
            stuff = currentSplit;
        }
        if(!stuff.includes("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Incap Logs</summary><p></p></details><br>")){
            while(stuff.includes("duration")){
                (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ");
                currentSplit.shift();
                currentSplit.join("");
                stuff = currentSplit;
                shotThing = (currentSplit as any as string).split("</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type: ")[0];
                shotLogs.push({type: shotThing}); 
            }
            (currentSplit as any as string).split("</span></p></details><br>");
            currentSplit.shift();
            currentSplit.join("</span></p></details><br>");
            stuff = currentSplit;
        }else{
            (currentSplit as any as string).split("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<details style='padding:none;display:inline;margin:none;'><summary>Shot Logs</summary><p></p></details><br>");
            currentSplit.shift();
            try{
                currentSplit.join("");
            }catch(err){}
            stuff = currentSplit;
        }
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
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team: <span contenteditable='true' class='editable'>" + datastuff.team + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Round: <span contenteditable='true' class='editable'>" + datastuff.round + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scouter: <span contenteditable='true' class='editable'>" + datastuff.scouter + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alliance: <span contenteditable='true' class='editable'>" + datastuff.color + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: <span contenteditable='true' class='editable'>" + datastuff.score + "</span></span><br>";
            datastuff.climb = datastuff.climb==undefined ? "false" : datastuff.climb.toString();
            datastuff.harmony = datastuff.harmony==undefined ? "false" : datastuff.harmony.toString();
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climbed: <span contenteditable='true' class='editable'>" + (datastuff.climb) + "</span></span><br>";
            translate+="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Harmony: <span contenteditable='true' class='editable'>" + (datastuff.harmony) + "</span></span><br>";
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

            dataElem.push(createElem);
            modalStuffData.appendChild(createElem);
        }
    });
    var modalStuffData: any;
    var modalContents: any;
    var span: any;
    var modal: any;
    var body: any;
    $: {
        (modalContents || {innerHTML:"true"}).innerHTML = (modalStuffData||{innerHTML:"true"}).innerHTML;
    }
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
        <div id="data" bind:this={modalStuffData}>
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