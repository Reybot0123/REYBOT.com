// Initialize the OpenAI API client
const openai = require('openai')('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');

// Define the conversation history
let conversationHistory = '';

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's message from the input field
  const userInput = document.querySelector('#input').value;

  // Add the user's message to the conversation history
  conversationHistory += `You: ${userInput}\n`;

  // Send the conversation history and user's message to the OpenAI API
  const response = await openai.complete({
    engine: 'text-davinci-002',
    prompt: conversationHistory,
    maxTokens: 150,
    temperature: 0.7,
    n: 1,
    stop: '\n'
  });

  // Get the response text from the API and add it to the conversation history
  const chatbotResponse = response.data[0].text.trim();
  conversationHistory += `Chatbot: ${chatbotResponse}\n`;

  // Display the conversation history in the chat window
  const output = document.querySelector('#output');
  output.innerHTML = conversationHistory.replace(/\n/g, '<br>');
  output.scrollTop = output.scrollHeight;

  // Clear the input field
  document.querySelector('#input').value = '';
});
