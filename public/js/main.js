var textbuffer = ["     **** fractured login terminal ****     \n","128k RAM SYSTEM   85912 bytes free\n", "Advanced encryption chip: detected\n","Network shield: detected\n" , "fractured science welcomes you.\n", "You can find your login in your information sheet.\n", "For any questions please contact 0x0033941F\n", "\n"]
var linebuffer = []
var lastbuffer = ""

var lastcommand = ""
var password = ""
var buffer = ""
var delay1 = 32 
var delay2 = 200
var delaybuffer = 0
var mediafile = new Audio()
var defaultcolor = "#A0A0FF"
var spookcounter = 0
var buffercolor = ""
function $(elid) {
  return document.getElementById(elid);
}
var socket

var enterpress = false
var cursor;
window.onload = init;
running = false;
function onstart(){
  setInterval(spooktimer, 87500)
  setTimeout(function(){
    tvchannel.style.display = 'none'
  }, 500)
  socket = io();
  socket.on('connect', function(){
      textbuffer.push("Establishing connection to remote server......                                   \n")
    send("helloworld<br>")
  });
  socket.on("admin", function(data){
    console.log(data)
  })
  socket.on('message', function(data){
    var answer
    answer = JSON.parse(data)
    //if you see this, a better solution is very much welcome. use the feedback command and put in a pastebin link <3
    if (answer.change.auth == true) {
      auth = answer.auth
    }
    if (answer.change.user == true) {
      user = answer.user
    }
    if (answer.change.sam == true) {
      Speak(answer.sam)
    }
    if (answer.change.screen == true) {
      clearscreen("true");
      textbuffer = answer.screen
    }
    if (answer.change.program == true) {
      program = answer.program
    }
    if (answer.change.html == true) {
      payload.innerHTML = answer.html
    }
    if (answer.change.scare == true) {
       spooklevel = answer.scare
    }
    if (answer.change.reply == true ) {
      textbuffer.push(answer.reply)
    }
    if (answer.change.cls == true ) {
      clearscreen("true");
    }
    if (answer.change.speed == true) {
      delay1 = answer.speed
    }
    if (answer.change.password == true) {
      password = answer.password
    }
    if (answer.change.colour == true) {
      coloradjustment(answer.colour)
    }
    spookcounter = answer.spookcounter
    if (answer.hardspook == 1) {
      spook("go")
    }
    if (answer.songlocation) {
      mediastart(answer.songlocation)
    }
    userinput.value = ""
    buffercheck()
  });
  socket.on('disconnect', function(){});


  socket.onopen = function (event) {

  }
  socket.onerror = function(event){
    textbuffer.push("\n")
    textbuffer.push(event.data)
  }
  socket.onclose = function(event){
    textbuffer.push("\n")
    textbuffer.push(event.data)
  }
  socket.onmessage = function(event){
  }
}
//game settings
var user = ""
var auth = ""
var program = "helloworld"

var locked = false


function send(message){
  if (locked == false) {
    lockscreen(true)
    var jsonresponse = new Object();
    jsonresponse.user = user
    jsonresponse.auth = auth
    jsonresponse.screen = setter.value
    jsonresponse.program = program
    jsonresponse.password = password
    jsonresponse.speed = delay1
    jsonresponse.spookcounter = spookcounter
    jsonresponse.spooklevel = spooklevel
    checkregex = new RegExp(lastbuffer + ".+")
    jsonresponse.command = userinput.value.replace("\n", "")
    lastcommand = userinput.value.replace("\n", "")
    socket.emit("message", JSON.stringify(jsonresponse))
  } else {
    userinput.value = userinput.value.replace("\n", "")
  }

}

function debug(state){
  delay1 = 4
  delay2 = 4
  writer.style.animationDuration="1s"
}

function lockscreen(state){
  if (state == true) {
    locked = true
    setter.setAttribute("readonly", "true")
  } else {
    setter.removeAttribute("readonly", "true")
    locked = false
  }
}

function clearscreen(complete) {
  lockscreen(true)
  writer.innerHTML = setter.value
  if (setter.value != "") {
    screenarray = setter.value.split("<br>")
  }
  if (complete == "true") {
    if (screenarray.length > 0) {
      screenarray.shift()
      setter.value = ""
      clearscreen();
    }
  } 
  if (screenarray.length <= 2) {
   lockscreen(false) 
  }
  
}

function soundstart() {
    var audio_file = new Audio('mp3/fan.mp3')
  audio_file.addEventListener('timeupdate', function(){
                var buffer = .44
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0
                    this.volume = 0.1
                    this.play()
                }}, false);
  audio_file.volume = 0.1
  audio_file.play()
  bootup = new Audio("/mp3/startup.mp3")
  bootup.volume = 0.1
  bootup.play()
  //setTimeout(soundstop, 6000)
}

function soundstop(){
  bootup.pause();
}

function init() {
  cursor = $("cursor");
  cursor.style.top = "-2px";
}

function nl2br(txt) {
  return txt.replace(/\n/g, "<br />");
}

function buffercheck(){
  if (running != true) {
    if (textbuffer.length > 0) {
      running = true
      var text = textbuffer.shift()
      for (var i = 0; i < text.length; i++) {
        linebuffer.push(text[i])
      }
      lastbuffer = text + ""
      lastbuffer = lastbuffer.replace("\n", "<br>")
      bufferwrite();
    } else {
      writer.innerHTML = setter.value
      writer.innerHTML += userinput.value
      writer.innerHTML = nl2br(writer.innerHTML);
    }
  }
  if (running == false && enterpress == true) {
    send(setter.value)
    enterpress = false
  } 
}

function coloradjustment(color1){
  if (color1 == "default") {
    writer.style.color = defaultcolor
    return true
  }
        writer.style.color = color1
}

function bufferwrite(){
    lockscreen(true)
    this.value = $("writer").innerHTML + linebuffer.shift()
    writeit(this, this)
    var  randomnumber = Math.floor((Math.random() * 1) + 1);
    var soundi = new Audio("/mp3/cursor" +randomnumber+".mp3")
    soundi.volume = 0.1
    soundi.play()
    if (linebuffer.length > 0) {
      setTimeout(bufferwrite, delay1)  //original value 50
    } else {
      running = false
      setTimeout(buffercheck, delay2) //original value 200
      lockscreen(false)
    }
}

function typeit(from, event){
  var keycode = event.keyCode
  if (event.type == "keypress" || (event.type == "keydown" && keycode == 8) ) {
    var  randomnumber = Math.floor((Math.random() * 2) + 1);
    var typesound = new Audio("/mp3/" +randomnumber+".mp3")
    typesound.volume = 0.3
    typesound.play()
  }
  if (keycode == 13){
    enterpress = true
  }
  if (event.type == "keydown" && keycode == 38 && program != "play"){
    var  randomnumber = Math.floor((Math.random() * 2) + 1);
    var typesound = new Audio("/mp3/" +randomnumber+".mp3")
    typesound.volume = 0.3
    typesound.play()
    userinput.value = lastcommand
  }
  if (event.type == "keydown" && keycode == 40 && program != "play"){
    var  randomnumber = Math.floor((Math.random() * 2) + 1);
    var typesound = new Audio("/mp3/" +randomnumber+".mp3")
    typesound.volume = 0.3
    typesound.play()
    userinput.value = ""
  }
  setTimeout(buffercheck, 40)
}

function writeit(from, event) {
  var w = $("writer");
  var tw = from.value;
  w.innerHTML = nl2br(tw);
  setter.value = w.innerHTML
  buffercheck();
}

function mediastart(location){    
    mediafile = new Audio(location)
    mediafile.volume = 0.3
    mediafile.play()
    mediafile.ontimeupdate = function() {mediascrubber()};
}

function mediascript(event) {
    if (program == "play") {
      var keycode = event.keyCode
      switch(keycode){
        case 38:
        if (mediafile.volume < 0.9) {mediafile.volume += 0.05}
        break;
        case 40:
        if (mediafile.volume > 0.1) {mediafile.volume -= 0.05}
        break;
        case 39:
        mediafile.currentTime += 5
        break;
        case 37:
        mediafile.currentTime -= 5
        if (mediafile.paused) {
          mediafile.play()
        }
        break;  
      }
    }

}
function mediascrubber() {
    if (program != "play") {mediafile.pause(); return}
  var timer = Math.floor((mediafile.currentTime / (mediafile.duration / 100))/10)
  var scrubber = ["-","-","-","-","-","-","-","-","-","-"]
  for (var i = 0; i < timer; i++) {
    scrubber[i] = "#"
  }
  scrapper.innerHTML = "[" + scrubber.join() + "]"
}


//sam implementation
function PlayWebkit(context, audiobuffer)
{
    var source = context.createBufferSource();
    var soundBuffer = context.createBuffer(1, audiobuffer.length, 22050);
    var buffer = soundBuffer.getChannelData(0);
    for(var i=0; i<audiobuffer.length; i++) buffer[i] = audiobuffer[i];
    source.buffer = soundBuffer;
    source.connect(context.destination);
    source.start();    
}

function PlayBuffer(audiobuffer)
{
    PlayWebkit(new AudioContext(), audiobuffer);
}

function Speak(text)
{
    //alert(text);

    var input = text;
    while (input.length < 256) input += " ";
    var ptr = allocate(intArrayFromString(input), 'i8', ALLOC_STACK);
    _TextToPhonemes(ptr);
    //alert(Pointer_stringify(ptr));
    _SetInput(ptr);
    _Code39771();

    var bufferlength = Math.floor(_GetBufferLength()/50);
    var bufferptr = _GetBuffer();

    audiobuffer = new Float32Array(bufferlength);

    for(var i=0; i<bufferlength; i++)
        audiobuffer[i] = ((getValue(bufferptr+i, 'i8')&0xFF)-128)/256;
    PlayBuffer(audiobuffer);
}