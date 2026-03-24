const express = require("express");

const app = express();

// чтобы принимать JSON
app.use(express.json());

// главная страница
app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

// GET /analyze (проверка)
app.get("/analyze", (req, res) => {
  res.send("analyze работает ✅");
});

// POST /analyze (основной endpoint)
app.post("/analyze", (req, res) => {
  console.log("NEW VERSION 🚀");

  res.json({
    food: "Паста",
    calories: 520
  });
});

// ВАЖНО ДЛЯ RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
