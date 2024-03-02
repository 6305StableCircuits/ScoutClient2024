<script lang=ts>
    import { goto } from "$app/navigation";
    import { teamNum, roundNum, alliance, scouterName } from "$lib/stores.js";
    var team: number;
    var color = 'Red';
    var scouter = "";
    var round = 0;
    const saveData = function(){
        teamNum.set(team);
        alliance.set(color);
        scouterName.set(scouter);
        roundNum.set(round);
    }
</script>
<div class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <script src="$lib/stepper.min.js"></script>
    <div class="flex p-sm justify-center md:border-b-[16px] border-b-8 border-timberwolf dark:border-eerie-black text-wrap items-center relative">
        <button on:click={() => goto('/')} class="text-eerie-black dark:text-floral-white bg-floral-white dark:bg-black-olive rounded-2xl hover:bg-light-hover dark:hover:bg-dark-hover absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl-3xl h-2xl-3xl">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>              
        </button>
        <h1 class="text-8xl text-center font-bold text-eerie-black dark:text-floral-white">Pregame Info</h1>
    </div>
    <div class="w-full h-full bg-floral-white dark:bg-black-olive" id="inpts">
        <label for="team">Team</label>&nbsp;&nbsp;<input type="number" bind:value={team} name="team" min="0" max="99999"><br>
        <label for="scouter">Scouter Name</label>&nbsp;&nbsp;<input type="text" bind:value={scouter} name="scouter" autocorrect="false"><br>
        <label for="round">Round</label>&nbsp;&nbsp;<input type="number" bind:value={round} name="round"><br>
        <label for="color">Color</label>&nbsp;&nbsp;<select name="color" bind:value={color}><option>Red</option><option>Blue</option></select><br>
        <button on:click={()=>{saveData();goto('/scout')}}>Start</button>
    </div>
</div>