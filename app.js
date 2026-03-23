const express = require("express");
const app = express();

// важно для работы с JSON
app.use(express.json());

// тест главной страницы
app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

// тест analyze через браузер (GET)
app.get("/analyze", (req, res) => {
  res.send("analyze работает ✅");
});

// основной endpoint (POST)
app.post("/analyze", (req, res) => {
  console.log("NEW VERSION 🚀");

  // пока заглушка (потом подключим AI)
  res.json({
    food: "Паста",
    calories: 520
  });
});

// ВАЖНО для Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
