function toggleNavbar() {
    const navbarMenu = document.getElementById('navbar-menu');
    navbarMenu.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", async () => {
  const newsGrid = document.getElementById("news-grid");

  try {
    const response = await fetch("/api/news");
    const data = await response.json();

    data.articles.forEach(article => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      newsCard.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/300x200'}" alt="${article.title}">
        <div class="content">
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        </div>
      `;

      newsGrid.appendChild(newsCard);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsGrid.innerHTML = "<p>Failed to load news. Please try again later.</p>";
  }
});