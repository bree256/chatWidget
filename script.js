let button = document.getElementById("Button");
let chatBox = document.querySelector(".chatBox");
let textarea = document.getElementById("textarea");
console.log(textarea);
let inputField = document.getElementById("input");
console.log(input);

// when I click the button
button.addEventListener("click", function () {
  // I want my chatbox to show up
  if (chatBox.style.visibility === "hidden") {
    chatBox.style.visibility = "visible";
  } else {
    chatBox.style.visibility = "hidden";
  }

  // then I want my icon to rotate
  if (button.style.transform === "rotate(180deg)") {
    button.style.transform = "rotate(-90deg)";
  } else {
    button.style.transform = "rotate(180deg)";
  }
});

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevents the default behavior of adding a new line

    // Get user input
    let userInput = inputField.value;

    // Display user message in the textarea
    appendMessage("User", userInput, "right");

    // Get chatbot response based on user input
    let chatbotResponse = respondToUser(userInput);

    // Get chatbot response based on user input with a delay
    setTimeout(function () {
      let chatbotResponse = respondToUser(userInput);

      // Display chatbot response in the textarea on the left
      appendMessage("Chatbot", chatbotResponse, "left");

      if (userInput.toLowerCase().includes("speak to someone")) {
        // Simulate agent response after a delay
        setTimeout(function () {
          let agentResponse = "Hi there! I’m Bridget. How can I help you?";
          // Display agent response in the textarea on the left
          appendMessage("Agent", agentResponse, "left");

          // Scroll the textarea to the bottom to show the latest messages
          textarea.scrollTop = textarea.scrollHeight;
        }, 2000); // 1000 milliseconds (1 second) delay for agent response
      }
    }, 1000); // 1000 milliseconds (1 second) delay for chatbot response

    // Clear the input field after sending the message
    inputField.value = "";
  }
});

// Function to append a message to the textarea
function appendMessage(sender, message, position) {
  let messageBlock = document.createElement("div");
  messageBlock.textContent = message;

  // Add different classes for user, chatbot, and agent messages
  if (sender === "User") {
    messageBlock.classList.add("userMessage", "right"); // Add "left" class for user messages
  } else if (sender === "Chatbot") {
    messageBlock.classList.add("chatbotMessage", "left");
  } else if (sender === "Agent") {
    messageBlock.classList.add("agentMessage", "left");
  }

  textarea.appendChild(messageBlock);

  // Scroll the textarea to the bottom to show the latest messages
  textarea.scrollTop = textarea.scrollHeight;
}
// Function to simulate chatbot response (case-insensitive)
function respondToUser(userMessage) {
  let lowercaseUserMessage = userMessage.toLowerCase();

  if (lowercaseUserMessage.includes("hello")) {
    return "Hi there! How can I help you?";
  } else if (lowercaseUserMessage.includes("speak to someone")) {
    return "No problem! Let me connect you to a customer support agent.";
  } else {
    return "I'm sorry, I didn't understand. Can you please rephrase?";
  }
}
