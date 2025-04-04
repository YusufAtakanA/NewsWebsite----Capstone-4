document.addEventListener("DOMContentLoaded", () => {
  const adminPassword = "admin123";
  const adminLoginBtn = document.getElementById("admin-login-btn");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminMessagesSection = document.getElementById("admin-messages");
  const messagesList = document.getElementById("messages-list");

  // Fetch messages from the server
  async function fetchMessages() {
    try {
      const response = await fetch("/api/messages");
      const messages = await response.json();

      messagesList.innerHTML = "";
      messages.forEach((message) => {
        const messageCard = document.createElement("li");
        messageCard.classList.add("message-card");

        messageCard.innerHTML = `
          <h4>${message.name}</h4>
          <p>${message.message}</p>
          <a href="mailto:${message.email}" class="email">${message.email}</a>
        `;

        messagesList.appendChild(messageCard);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // Handle admin login
  adminLoginBtn.addEventListener("click", () => {
    if (adminPasswordInput.value === adminPassword) {
      adminMessagesSection.classList.remove("hidden");
      fetchMessages(); 
    } else {
      alert("Incorrect password!");
    }
  });
});