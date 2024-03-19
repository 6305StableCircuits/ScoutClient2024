<script lang=ts>
    import { goto } from "$app/navigation";
    import { teamNum, roundNum, alliance, scouterName } from "$lib/stores.js";
    var team: number;
    var color = 'Red';
    var scouter = "";
    var round = 0;
    const saveData = function(){
        teamNum.set(+team);
        alliance.set(color);
        scouterName.set(scouter);
        roundNum.set(Math.abs(+round));
    }
    var stuff: any;
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const doomCode = ['i','d','d','q','d'];
        let userKeys = [""];
        let doomUserKeys = [""];
        function doThing(e: any){
            userKeys.push(e.key);
            doomUserKeys.push(e.key);
            if (userKeys.length > konamiCode.length) userKeys.shift();
            if(doomUserKeys.length > doomCode.length) doomUserKeys.shift();
            if (userKeys.join('') === konamiCode.join('')) activateCheats();
            if(doomUserKeys.join('') === doomCode.join('')) activateDoom();
        };
        var thing:any;
        function activateDoom(){
            var thingy = "<iframe src='";
            var url ="/doom1"; //(window.location.href.split("").pop() == "/" ? window.location.href + "doom/index.html" : window.location.href + "/doom/index.html");
            thingy+=url;
            thingy+="' width='655px' height='410px' scrolling='no' />";
            thing.innerHTML = thingy;
        }
        function activateCheats() {
            var thingy = "<iframe src='";
            thingy+="data:text/html;charset=utf-8;base64,PHN0eWxlPg0KICAgIGJvZHl7DQogICAgICAgIGJhY2tncm91bmQ6IzAwMDsNCiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpOw0KICAgIH0NCjwvc3R5bGU+DQo8cHJlIHN0eWxlPSJiYWNrZ3JvdW5kOiMwMDAiPg0KICAgIDxjYW52YXMgaWQ9ImMiIHdpZHRoPSI2NDAiIGhlaWdodD0iNDgwIiBzdHlsZT0iYmFja2dyb3VuZDojMDAwIj48L2NhbnZhcz4NCiAgICA8c2NyaXB0Pg0KICAgICAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7DQogICAgICAgIGFsZXJ0KCJRL0EgYW5kIFAvTCBhcmUgdGhlIGNvbnRyb2xzIik7DQogICAgICB9DQogICAgICBjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MnKS5nZXRDb250ZXh0KCcyZCcpDQogICAgICBjLmZpbGxTdHlsZSA9ICIjRkZGIg0KICAgICAgYy5mb250ID0gIjYwcHggbW9ub3NwYWNlIg0KICAgICAgdyA9IHMgPSAxDQogICAgICBwID0gcSA9IGEgPSBiID0gMA0KICAgICAgbSA9IG4gPSAxOTANCiAgICAgIHggPSAzMDA7DQogICAgICB5ID0gMjM1DQogICAgICB1ID0gLTU7DQogICAgICB2ID0gMw0KICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7DQogICAgICAgIGlmICh3ICYmICFzKSByZXR1cm47DQogICAgICAgIHMgPSAwDQogICAgICAgIGMuY2xlYXJSZWN0KDAsIDAsIDY0MCwgNDgwKQ0KICAgICAgICBmb3IgKGkgPSA1OyBpIDwgNDgwOyBpICs9IDIwKSBjLmZpbGxSZWN0KDMxOCwgaSwgNCwgMTApDQogICAgICAgIG0gKz0gcDsNCiAgICAgICAgbiArPSBxDQogICAgICAgIG0gPSBtIDwgMCA/IDAgOiBtOw0KICAgICAgICBtID0gbSA+IDM4MCA/IDM4MCA6IG0NCiAgICAgICAgbiA9IG4gPCAwID8gMCA6IG47DQogICAgICAgIG4gPSBuID4gMzgwID8gMzgwIDogbg0KICAgICAgICB4ICs9IHU7DQogICAgICAgIHkgKz0gdg0KICAgICAgICBpZiAoeSA8PSAwKSB7DQogICAgICAgICAgeSA9IDA7DQogICAgICAgICAgdiA9IC12DQogICAgICAgIH0NCiAgICAgICAgaWYgKHkgPj0gNDcwKSB7DQogICAgICAgICAgeSA9IDQ3MDsNCiAgICAgICAgICB2ID0gLXYNCiAgICAgICAgfQ0KICAgICAgICBpZiAoeCA8PSA0MCAmJiB4ID49IDIwICYmIHkgPCBtICsgMTEwICYmIHkgPiBtIC0gMTApIHsNCiAgICAgICAgICB1ID0gLXUgKyAwLjI7DQogICAgICAgICAgdiArPSAoeSAtIG0gLSA0NSkgLyAyMA0KICAgICAgICB9DQogICAgICAgIGlmICh4IDw9IDYxMCAmJiB4ID49IDU5MCAmJiB5IDwgbiArIDExMCAmJiB5ID4gbiAtIDEwKSB7DQogICAgICAgICAgdSA9IC11IC0gMC4yOw0KICAgICAgICAgIHYgKz0gKHkgLSBuIC0gNDUpIC8gMjANCiAgICAgICAgfQ0KICAgICAgICBpZiAoeCA8IC0xMCkgew0KICAgICAgICAgIGIrKzsNCiAgICAgICAgICB4ID0gMzYwOw0KICAgICAgICAgIHkgPSAyMzU7DQogICAgICAgICAgdSA9IDU7DQogICAgICAgICAgdyA9IDENCiAgICAgICAgfQ0KICAgICAgICBpZiAoeCA+IDY0MCkgew0KICAgICAgICAgIGErKzsNCiAgICAgICAgICB4ID0gMjgwOw0KICAgICAgICAgIHkgPSAyMzU7DQogICAgICAgICAgdSA9IC01Ow0KICAgICAgICAgIHcgPSAxDQogICAgICAgIH0NCiAgICAgICAgYy5maWxsVGV4dChhICsgIiAiICsgYiwgMjY2LCA2MCkNCiAgICAgICAgYy5maWxsUmVjdCgyMCwgbSwgMjAsIDEwMCkNCiAgICAgICAgYy5maWxsUmVjdCg2MDAsIG4sIDIwLCAxMDApDQogICAgICAgIGMuZmlsbFJlY3QoeCwgeSwgMTAsIDEwKQ0KICAgICAgfSwgMzApDQogICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7DQogICAgICAgIGsgPSAoZSB8fCB3aW5kb3cuZXZlbnQpLmtleUNvZGU7DQogICAgICAgIHcgPSB3ID8gMCA6IGsgPT0gJzI3JyA/IDEgOiAwOw0KICAgICAgICBwID0gayA9PSAnNjUnID8gNSA6IGsgPT0gJzgxJyA/IC01IDogcDsNCiAgICAgICAgcSA9IGsgPT0gJzc2JyA/IDUgOiBrID09ICc4MCcgPyAtNSA6IHE7DQogICAgICB9DQogICAgICBkb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24oZSkgew0KICAgICAgICBrID0gKGUgfHwgd2luZG93LmV2ZW50KS5rZXlDb2RlOw0KICAgICAgICBwID0gayA9PSAnNjUnIHx8IGsgPT0gJzgxJyA/IDAgOiBwOw0KICAgICAgICBxID0gayA9PSAnODAnIHx8IGsgPT0gJzc2JyA/IDAgOiBxDQogICAgICB9DQogICAgPC9zY3JpcHQ+DQogICAgPC9wcmU+'";
            thingy+=" width='640px' height='480' scrolling='no'/>";
            thing.innerHTML = thingy;
            
        }
</script>
<style>
</style>
<div class="h-screen bg-floral-white dark:bg-black-olive flex flex-col md:border-[16px] border-8 border-timberwolf dark:border-eerie-black">
    <script src="src/routes/stepper.min.js"></script>
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
        <label for="scouter">Scouter Name</label>&nbsp;&nbsp;<input type="text" bind:value={scouter} name="scouter" on:keydown={(e)=>{doThing(e)}} autocorrect="false"><br>
        <label for="round">Round</label>&nbsp;&nbsp;<input type="number" bind:value={round} name="round"><br>
        <label for="color">Color</label>&nbsp;&nbsp;<select name="color" bind:value={color}><option>Red</option><option>Blue</option></select><br>
        <center><button id="start" on:click={()=>{saveData();goto('/scout')}} class="text-l bg-eerie-black text-floral-white px-md py-sm rounded-xl mx-sm hover:bg-opacity-85 w-[10%]">Start</button></center>
        {#if scouter.toLowerCase()=="frisk"}
        <b>WARNING: This name will make your life hell. Proceed anyway?</b>
        {/if}
        {#if scouter.toLowerCase()=="alphys"}
        <b>D-don't do that.</b>
        {/if}
        {#if scouter.toLowerCase() == "asgore"}
        <b>You cannot.</b>
        {/if}
        {#if scouter.toLowerCase() == "asriel"}
        <b>...</b>
        {/if}
        {#if scouter.toLowerCase() == "flowey"}
        <b>I already chose THAT name.</b>
        {/if}
        {#if scouter.toLowerCase() == "sans"}
        <b style="font-family:cursive">nope.</b>
        {/if}
        {#if scouter.toLowerCase() == "toriel"}
        <b>I think you should think of your own name, my child.</b>
        {/if}
        {#if scouter.toLowerCase() == "undyne"}
        <b>Get your OWN name!</b>
        {/if}
        {#if scouter.toLowerCase() == "aaaaaa"}
        <b>Not very creative...?</b>
        {/if}
        {#if scouter.toLowerCase() == "papyru"}
        <b>I'LL ALLOW IT!!!!</b>
        {/if}
        {#if scouter.toLowerCase() == "napsta"}
        <b>............ (They are powerless to stop you.)</b>
        {/if}
        <div id="thing" bind:this={thing}></div>
    </div>
</div>