function $(elid) {
  return document.getElementById(elid);
}

var standardbeginning = {
  "change": {
    "auth": false,
    "user": false,
    "screen": false,
    "program": true,
    "html": false,
    "scare": false,
    "reply": true,
    "cls": true,
    "sam": false,
    "password": false
  },
  "newsletter": "",
  "hardspook": 0,
  "sam": "",
  "auth": "",
  "user": "",
  "screen": [],
  "program": "adminintervention",
  "html": "",
  "scare": [],
  "reply": "An administrator has locked your terminal\nYou are now talking to: Administrator\n",
  "save": "",
  "spookcounter": 0
}

var unlocking = {
  "change": {
    "auth": false,
    "user": false,
    "screen": false,
    "program": true,
    "html": false,
    "scare": false,
    "reply": true,
    "cls": true,
    "sam": false,
    "password": false
  },
  "newsletter": "",
  "hardspook": 0,
  "sam": "",
  "auth": "",
  "user": "",
  "screen": [],
  "program": "commandline",
  "html": "",
  "scare": [],
  "reply": "Your session has been unlocked\nC:",
  "save": "",
  "spookcounter": 0
}


var chatanswer = {
  "change": {
    "auth": false,
    "user": false,
    "screen": false,
    "program": true,
    "html": false,
    "scare": false,
    "reply": true,
    "cls": true,
    "sam": false,
    "password": false
  },
  "newsletter": "",
  "hardspook": 0,
  "sam": "",
  "auth": "",
  "user": "",
  "screen": [],
  "program": "adminintervention",
  "html": "",
  "scare": [],
  "reply": "",
  "save": "",
  "spookcounter": 0
}

var password = ""
function onstart(){
  setInterval(screencheck, 800)
  socket = io();
  socket.on('connect', function(){
      console.log("connected succesfully")
  });
  socket.on("admin", function(data){
    console.log(data)
  })
  socket.on('list', function(data){
    console.log(data)
    users.value = ""
    for (var i = data.length - 1; i >= 0; i--) {
      users.value += "ID: " + data[i] + "\n"
    }
    users.value += "MY OWN ID: " + socket.id
  });
  socket.on('screen', function(data){
    console.log(data)
    actualscreenoutput.innerhtml = ""
    screenoutput.value = JSON.stringify(data, null, 2);
    buffer = ""
    if (data.change.screen == true) {
              for (var i = 0; i < data.screen.length; i++) {
      buffer += data.screen[i].replace("\n", "<br>")
    }

    } else {
      buffer = data.reply.replace("\n", "<br>")
    }
    actualscreenoutput.innerHTML = buffer

  });
    socket.on('screenonly', function(data){
    actualscreenoutput.innerhtml = ""
    buffer = ""
    if (data.change.screen == true) {
              for (var i = 0; i < data.screen.length; i++) {
      buffer += data.screen[i].replace("\n", "<br>")
    }

    } else {
      buffer = data.reply.replace("\n", "<br>")
    }
    actualscreenoutput.innerHTML = buffer

  });
  socket.on('disconnect', function(){

  });
}

function screencheck(){
    if (selectuser.value != "") {socket.emit(password, "screenonly", selectuser.value)}
}

function fastchat(){
    var fastchatting = JSON.parse(JSON.stringify(chatanswer))
    fastchatting.reply = fastchatbox.value + "\n"
    socket.emit(password, "setter", selectuser.value , fastchatting)
}

function requestusers(){
    password = passwordfield.value
  socket.emit(password, "list")
}

function setvalue(){
  socket.emit(password, "setter", selectuser.value , JSON.parse(screenoutput.value))
}

function getscreen(){
  if (selectuser.value != "") {socket.emit(password, "screen", selectuser.value)}
}

function chatstart(){
  screenoutput.value = JSON.stringify(standardbeginning, null, 2);
}

function chatover(){
  screenoutput.value = JSON.stringify(unlocking, null, 2);
}

function chatmessage(){
  screenoutput.value = JSON.stringify(chatanswer, null, 2);
}

function send(message){
  if (locked == false) {
    lockscreen(true)
    var jsonresponse = new Object();
    jsonresponse.user = user
    jsonresponse.auth = auth
    jsonresponse.screen = setter.value
    jsonresponse.program = program
    jsonresponse.password = password
    jsonresponse.spookcounter = spookcounter
    checkregex = new RegExp(lastbuffer + ".+")
    jsonresponse.command = userinput.value.replace("\n", "")
    lastcommand = userinput.value
    socket.emit("message", JSON.stringify(jsonresponse))
  } else {
    userinput.value = userinput.value.replace("\n", "")
  }
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