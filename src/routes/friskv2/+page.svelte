<script lang="ts">
    import {onMount} from 'svelte';
    onMount(()=>{
        alert("You said you wanted hell, so here you go, make the scouting app yourself! And no, this isn't VSCode, this is Notepad!");
    })
    var txtarea:any;
    var myField:any;
    var sel:any;

	// code edit from http://jsfiddle.net/Znarkus/Z99mK/
	function insertAtCursor(myValue:any) {
		myField = txtarea;
	    //MOZILLA and others
	    if (myField.selectionStart || myField.selectionStart == '0') {
	        var startPos = myField.selectionStart;
	        var endPos = myField.selectionEnd;
	        myField.value = myField.value.substring(0, startPos)
	            + myValue
	            + myField.value.substring(endPos, myField.value.length);
	        myField.selectionStart = startPos + myValue.length;
	        myField.selectionEnd = startPos + myValue.length;
	    } else {
	        myField.value += myValue;
	    }
	}
</script>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Web-Notepad</title>
	<style>
	@import url(http://fonts.googleapis.com/earlyaccess/notosanstc.css);
	html, body{
		width: 100%;
		height: 100%;
		border: 0;
		margin: 0;
	}
	textarea{
		width: 100vw;
    	height: 100vh;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size:2rem;
		padding:4rem;
		line-height:1.4;
		border: none;
		display: flex;
    	align-items: center;
    	justify-content: center;
    	font-family: 'Noto Sans TC', sans-serif;
	}
	textarea:focus{
    	outline: 0;
	}
	</style>
</head>
<body>
	<textarea id="textarea" bind:this={txtarea} on:keydown = {(e)=>{
		if (e.keyCode == 9) {
			insertAtCursor('    ');
			return false;
		}
	}} autofocus spellcheck="false"></textarea>
</body>
</html>