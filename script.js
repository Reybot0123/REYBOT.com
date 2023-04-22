// Initialize the speech recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Get the output div and user input field
const output = document.getElementById("output");
const input = document.getElementById("input");

// Start the speech recognition when the user clicks the microphone button
document.getElementById("microphone").addEventListener("click", () => {
  recognition.start();
});

// Handle the speech recognition result
recognition.addEventListener("result", (event) => {
  const text = event.results[0][0].transcript;
  input.value = text;
  handleUserInput(text);
});

// Handle the user input
function handleUserInput(text) {
  // Display the user input in the output div
  output.innerHTML += "<p class='user'>" + text + "</p>";
  
  // Call the API to get a response from the AI
  fetch("/api/chatbot?text=" + encodeURIComponent(text))
    .then(response => response.json())
    .then(data => {
      // Display the AI response in the output div
      output.innerHTML += "<p class='chatbot'>" + data.response + "</p>";
      
      // Speak the AI response
      const utterance = new SpeechSynthesisUtterance(data.response);
      speechSynthesis.speak(utterance);
      
      // Clear the user input field
      input.value = "";
      
      // Scroll to the bottom of the output div
      output.scrollTop = output.scrollHeight;
    });
}

// Handle the user input when the user submits the form
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text) {
    handleUserInput(text);
  }
});
