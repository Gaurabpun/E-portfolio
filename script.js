// Display current year in the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// === Chatbot ===
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chat-input');

const SYSTEM_PROMPT = `
You are an AI assistant for Gaurab Pun's portfolio website.
Use this information to answer questions:

About:
Hi, I'm Gaurab Pun, a passionate Computer Science student. I'm interested in software development, web technologies, and AI. I'm continuously looking for opportunities to enhance my skills and work on exciting projects!

Projects:
1. Web Development – A responsive website using HTML, CSS, and JavaScript. Showcases my understanding of front-end development and design.
2. AI Chatbot – A simple AI chatbot using Python and machine learning libraries, focusing on NLP and user interaction.

Contact:
Email: gaurab.pun24@gmail.com
GitHub and LinkedIn links are available on the website.
`;

chatbotBtn.onclick = () => {
  const isOpen = chatbotWindow.style.display === 'flex';
  chatbotWindow.style.display = isOpen ? 'none' : 'flex';

  if (!isOpen) {
    setTimeout(() => chatInput.focus(), 100);

    // ✅ Add welcome message only if chat is empty
    if (chatMessages.innerHTML.trim() === '') {
      addMessage("Hello! I'm here to help you with any questions about Gaurab Pun's portfolio.", 'bot');
    }
  }
};


async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  chatInput.value = '';
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;


  try {
  const response = await fetch("https://gpt-chatbot-backend-c8zs.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}`,
    }),
  });

  const data = await response.json();
  const botReply = data.reply || "Sorry, something went wrong.";
  removeLastBotMessage();
  addMessage(botReply, 'bot');

} catch (error) {
  console.error("Error:", error);
  removeLastBotMessage();
  addMessage("Sorry, the server is not responding.", 'bot');
}
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msg.innerHTML = `<div>${text}</div><small style="display:block; color:#999;">${time}</small>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLastBotMessage() {
  const typing = chatMessages.querySelector('.typing');
  if (typing) typing.remove();
}

const sendBtn = document.getElementById('chat-send-btn');
sendBtn.addEventListener('click', sendMessage);

// Optional: Send on "Enter" key press
chatInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

document.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.pageYOffset > 50) { // Checks if the page is scrolled down 100 pixels or more
      header.classList.add("minimized");
  } else {
      header.classList.remove("minimized");
  }
});

function toggleDetails(id) {
  const element = document.getElementById(id);
  element.classList.toggle('open');
}

// === Fade-in on scroll ===
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // trigger once
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));