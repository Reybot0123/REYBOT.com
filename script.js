// Define variables for REYBOT
const recognition = new webkitSpeechRecognition();
const synthesis = window.speechSynthesis;
let voices = [];

// Set up speech recognition
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Load voices
function loadVoices() {
  voices = synthesis.getVoices();
}

// Speak function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices.find(voice => voice.name === 'Google US English');
  synthesis.speak(utterance);
}

// Listen function
function listen() {
  recognition.start();
}

// Handle speech recognition results
recognition.onresult = function(event) {
  const result = event.results[0][0].transcript;
  console.log(result);
  
  // TODO: Add functionality to handle speech recognition results
};

// Handle errors
recognition.onerror = function(event) {
  console.error(event.error);
};

// Load voices on page load
window.onload = function() {
  loadVoices();
};
