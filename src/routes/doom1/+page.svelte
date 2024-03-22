<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DOOM</title>
    <style>
        /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
        * {
            font-family: sans-serif;
        }
        canvas{
            outline: none;
        }
        body {
            padding: 5px;
        }
    </style>
</head>

<body>
    <div id="hide">
        <p id="focushint" style="display:none"></p>
        <div class="container">
            <canvas id="screen" width="640" height="400" tabindex="0">This is where the DooM screen should render.</canvas>
            <span>&nbsp;</span>
            <div id="output" style="display:none"></div>
        </div>
        gettmilliseconds calls per second: <span id="getmsps_stats">0</span> Total getmilliseconds calls: <span id="getms_stats">0</span><br /> DooM FPS: <span id="fps_stats">0</span> (target: 35FPS) Total Frames drawn: <span id="drawframes_stats">0</span><br
        /> Browser Animation FPS: <span id="animationfps_stats">0</span> (target: around 60FPS, depending on browser)<br />
    </div>
</body>

<script>
"use strict";
window.onload = function(){
    alert("Arrow keys to move, Ctrl to shoot, Enter to select, Space to open doors");
}
var memory = new WebAssembly.Memory({ initial: 108 });

function readWasmString(offset, length) {
  var bytes = new Uint8Array(memory.buffer, offset, length);
  return new TextDecoder("utf8").decode(bytes);
}

function consoleLogString(offset, length) {
  var string = readWasmString(offset, length);
  console.log('"' + string + '"');
}

function appendOutput(style) {
  return function (offset, length) {
    var lines = readWasmString(offset, length).split("\n");
    for (var i = 0; i < lines.length; ++i) {
      if (lines[i].length == 0) {
        continue;
      }
      var t = document.createElement("span");
      t.classList.add(style);
      t.appendChild(document.createTextNode(lines[i]));
      document.getElementById("output").appendChild(t);
      document.getElementById("output").appendChild(document.createElement("br"));
      t.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      }); 
    }
  };
}
var getms_calls_total = 0;
var getms_calls = 0; 
window.setInterval(function () {
  getms_calls_total += getms_calls;
  document.getElementById("getmsps_stats").innerText = getms_calls / 1000 + "k";
  document.getElementById("getms_stats").innerText = getms_calls_total;
  getms_calls = 0;
}, 1000);

function getMilliseconds() {
  ++getms_calls;
  return performance.now();
}

var canvas = document.getElementById("screen");
var doom_screen_width = 320 * 2;
var doom_screen_height = 200 * 2;
var forwardKey = (e, type) => {
    var ev = new KeyboardEvent(type, {
        key: e.key,
        keyCode: e.keyCode,
    });
    canvas.dispatchEvent(ev);
};

document.body.addEventListener("keydown", function(e) {
    forwardKey(e, "keydown");
});

document.body.addEventListener("keyup", function(e) {
    forwardKey(e, "keyup");
});
var fps_stats = document.getElementById("fps_stats");
var drawframes_stats = document.getElementById("drawframes_stats");
var number_of_draws_total = 0;
var number_of_draws = 0; 
window.setInterval(function () {
  number_of_draws_total += number_of_draws;
  drawframes_stats.innerText = number_of_draws_total;
  fps_stats.innerText = number_of_draws;
  number_of_draws = 0;
}, 1000);

function drawCanvas(ptr) {
  var doom_screen = new Uint8ClampedArray(
    memory.buffer,
    ptr,
    doom_screen_width * doom_screen_height * 4
  );
  var render_screen = new ImageData(
    doom_screen,
    doom_screen_width,
    doom_screen_height
  );
  var ctx = canvas.getContext("2d");

  ctx.putImageData(render_screen, 0, 0);

  ++number_of_draws;
}

var importObject = {
  js: {
    js_console_log: appendOutput("log"),
    js_stdout: appendOutput("stdout"),
    js_stderr: appendOutput("stderr"),
    js_milliseconds_since_start: getMilliseconds,
    js_draw_screen: drawCanvas,
  },
  env: {
    memory: memory,
  },
};

WebAssembly.instantiateStreaming(fetch("src/routes/doom.wasm"), importObject).then(
  (obj) => {
    
    obj.instance.exports.main();

    
    let doomKeyCode = function (keyCode) {
      switch (keyCode) {
        case 8:
          return 127; // KEY_BACKSPACE
        case 17:
          return 0x80 + 0x1d; // KEY_RCTRL
        case 18:
          return 0x80 + 0x38; // KEY_RALT
        case 37:
          return 0xac; // KEY_LEFTARROW
        case 38:
          return 0xad; // KEY_UPARROW
        case 39:
          return 0xae; // KEY_RIGHTARROW
        case 40:
          return 0xaf; // KEY_DOWNARROW
        default:
          if (keyCode >= 65 /*A*/ && keyCode <= 90 /*Z*/) {
            return keyCode + 32; // ASCII to lower case
          }
          if (keyCode >= 112 /*F1*/ && keyCode <= 123 /*F12*/) {
            return keyCode + 75; // KEY_F1
          }
          return keyCode;
      }
    };
    let keyDown = function (keyCode) {
      obj.instance.exports.add_browser_event(0 /*KeyDown*/, keyCode);
    };
    let keyUp = function (keyCode) {
      obj.instance.exports.add_browser_event(1 /*KeyUp*/, keyCode);
    };
    canvas.addEventListener(
      "keydown",
      function (event) {
        keyDown(doomKeyCode(event.keyCode));
        event.preventDefault();
      },
      false
    );
    canvas.addEventListener(
      "keyup",
      function (event) {
        keyUp(doomKeyCode(event.keyCode));
        event.preventDefault();
      },
      false
    );

    canvas.focus();
    var animationfps_stats = document.getElementById("animationfps_stats");
    var number_of_animation_frames = 0; 
    window.setInterval(function () {
      animationfps_stats.innerText = number_of_animation_frames;
      number_of_animation_frames = 0;
    }, 1000);

    function step(timestamp) {
      ++number_of_animation_frames;
      obj.instance.exports.doom_loop_step();
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
);
</script>

</html>
