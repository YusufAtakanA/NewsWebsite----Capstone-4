import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

const messages = []; 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contacts.ejs");
  });

app.get("/api/news", async (req, res) => {
  const apiKey = "H77LCVJ70cq1CHcba4LsLZkvSs5GWZvN";
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const articles = data.results.map(article => ({
      title: article.title,
      description: article.abstract,
      url: article.url,
      image: article.multimedia?.[0]?.url || null
    }));

    res.json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Handle contact form submissions
app.post("/submit-contact", (req, res) => {
  const { name, email, message } = req.body;
  messages.push({ name, email, message });
  console.log("New message received:", { name, email, message });
  res.send("Thank you for contacting us!");
});


app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});