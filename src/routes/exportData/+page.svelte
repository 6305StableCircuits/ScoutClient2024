<script lang=ts>
    import { goto } from "$app/navigation";
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
</script>

<div class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <div class="flex p-sm justify-center md:border-b-[16px] border-b-8 border-timberwolf dark:border-eerie-black text-wrap">
        <h1 class="text-8xl text-center font-bold text-eerie-black dark:text-floral-white">Stable Scout 3.0</h1>
    </div>
    <div class="flex md:flex-row flex-col w-full flex-grow items-center bg-eerie-black dark:bg-floral-white">
        <div id=""></div>
        <button on:click={() => {sendData()}} class="text-8xl w-full h-full border-timberwolf dark:border-eerie-black text-eerie-black bg-floral-white dark:bg-black-olive dark:text-floral-white hover:bg-light-hover dark:hover:bg-dark-hover active:bg-opacity-90 mx-auto items-center">Export Data</button>
    </div>
</div>