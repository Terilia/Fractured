var spooklevel = 0

function spooktimer(){
  var d = Math.random();
  d += spooklevel * 0.05
  if (d > 0.9){
    spook(); 
  }
}

function spook(hardspook){
  var d = Math.floor(Math.random() * Math.floor(4))
  var spooksound = new Audio("/mp3/buzz"+d+".mp3")
  spooksound.volume = 0.4
  if (spooklevel < 3) {
      var d = Math.floor(Math.random() * Math.floor(4))
  }
  if (hardspook != undefined) {
      var d = Math.floor(Math.random() * Math.floor(6))
  }
  switch(d){
    case 0:
    textshift(spooklevel);
    setTimeout(textclear, 50)
    break;
    case 1:
    textshift(spooklevel + 20);
    setTimeout(textclear, 200)
    break;
    case 2:
    textflip()
    break;
    case 3:
    helpme()
    break;
    case 4:
    spooksound.volume = 0.7
    colourshift()
    break;
    case 5:
    hexspam()
    setTimeout(hexstop, 12000)
    break;
    }
    spooksound.play()
}

function hexspam(){
  tension = new Audio("/mp3/spooky1.mp3")
  tension.volume = 0.2
  tension.play()
  var chars = '0123456789ABCDEF'.split('');
  buffer = writer.innerText
  var prebuffer = ""
  counter = 0
  for (var i = 480- 1; i >= 0; i--) {
    prebuffer += chars[Math.floor(Math.random() * 16)]
    counter += 1
    if (counter % 4 === 0 ) {
      prebuffer += " "
    }
    if (counter >= 32) {
      counter = 0
      prebuffer += "\n"
    }
  }
  textbuffer.push(prebuffer)
  clearscreen("true")
  linespeed(0.2)
  delaybuffer = delay1
  delay1 = 14
  buffercolor = writer.style.color
  coloradjustment("red")
  buffercheck()
}

function hexstop(){
  delay1 = delaybuffer
  tension.pause()
  clearscreen("true")
  linenormal()
  if (program == "login") {
    textbuffer = ["Please Login:"]
  } else {textbuffer = ["restarting session\n" + "Current User:" + user + "\nC:"]}
  coloradjustment(buffercolor)
  buffercheck()
}

function linespeed(speed){
  document.styleSheets[0].cssRules[15].style.animation = "wave "+speed+"s ease-in-out 0s infinite normal none running"
}

function linenormal(){
  document.styleSheets[0].cssRules[15].style.animation = "wave 30s ease-in-out 0s infinite normal none running"
}

function helpme(){
  var textlength = writer.innerText.length
  var chooser = []
  var words = ["it looks at me", "john", "I can hear it breath", "I am never alone", "sam", "Is somebody there?", "They taste bad", "I cannot sleep", "I miss home", "hello", "help me", "password"]
  for (var i = spooklevel + 1; i >= 0; i--) {
    chooser.push(Math.floor(Math.random() * Math.floor(textlength - 10)))
  }
  for (var i = chooser.length - 1; i >= 0; i--) {
    writer.innerText = writer.innerText.replace(writer.innerText[chooser[i]], words[Math.floor(Math.random() * Math.floor(words.length))])
     }
  var d = Math.floor(Math.random() * Math.floor(2))
}

function colourshift(){
  buffer = writer.innerText
  clearscreen("true")
  delaybuffer = delay1
  delay1 = 500
  buffercolor = writer.style.color
  coloradjustment("red")
  textbuffer = ["You shouldn't\n", "be here\n"]
  buffercheck()
  setTimeout(colourshiftend, 12000)
} 

function colourshiftend(){
  delay1 = delaybuffer
  clearscreen("true")
  if (program == "login") {
    textbuffer = ["Please Login:"]
  } else {textbuffer = ["Unauthorised access detected, restarting session\n" + "Current User:" + user + "\nC:"]}
  coloradjustment(buffercolor)
  buffercheck()
}
function textflip(){
  var textlength = writer.innerText.length
  var chooser = []
  for (var i = spooklevel * 2; i >= 0; i--) {
    chooser.push(Math.floor(Math.random() * Math.floor(textlength - 10)))
  }
  for (var i = chooser.length - 1; i >= 0; i--) {
    writer.innerText = writer.innerText.replace(writer.innerText[chooser[i]], String.fromCharCode(0x0041 + Math.random() * (0x005A-0x0041+1)))
    setter.value = writer.innerText  }
  var d = Math.floor(Math.random() * Math.floor(2))
}

function textshift(level, sound){
  if (level) {level = level * (Math.random() * 100 - 50)} else {level = 5}
  
  document.getElementById("getter").style.transform = "rotate("+ level + "deg)";
}

function textclear() {
  document.getElementById("getter").style.transform = "rotate(0deg)";
}

