// new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';

var output = document.getElementById("output");

// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

function isQuestion(word) {
  switch(word.toLowerCase()) {
    case "how": 
    case "what":
    case "when": 
    case "who": 
    case "why":
    case "where": 
    case "can": 
      return true; 
    default:
      return false; 
  }
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    let latest = Object.keys(event.results).length - 1;
    var transcript = event.results[latest][0].transcript;
    let currentText = output.innerHTML; 
    transcript  = transcript.trim();
    let firstWord = transcript.split(" ")[0]; 
    transcript = transcript[0].toUpperCase() + transcript.slice(1);
    transcript += isQuestion(firstWord) ? "? " : ". "; 

    currentText += transcript; 

    if(currentText.length > 170) {
      output.innerHTML = ""; 
    }

    var speed = 50;
    var i = 0; 
    function typeWriter() {

      if (i < transcript.length) {
          output.innerHTML += transcript.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
      }
    }
    typeWriter();


};

recognition.onend = function(event) {
    console.log("recognition ended.")
    recognition.start();

}
              
// start recognition
recognition.start();


// TODO: 
/*
    BUG: Continious talking. once stopped, the program stops :( 
*/
