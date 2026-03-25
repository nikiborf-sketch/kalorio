const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// =======================
// НАСТРОЙКА ЗАГРУЗКИ ФАЙЛОВ
// =======================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =======================
// СТАТИКА (ФРОНТЕНД)
// =======================
app.use(express.static(path.join(__dirname, "public")));

// =======================
// ГЛАВНАЯ СТРАНИЦА
// =======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// ПРОВЕРКА
// =======================
app.get("/analyze", (req, res) => {
  res.send("GET работает ✅");
});

// =======================
// ОСНОВНОЙ ENDPOINT (POST)
// =======================
app.post("/analyze", upload.single("image"), (req, res) => {
  console.log("NEW REQUEST 🚀");

  if (!req.file) {
    return res.status(400).json({ error: "Нет файла" });
  }

  // Пока заглушка (потом подключим OpenAI)
  res.json({
    food: "Паста",
    calories: 520,
    protein: 20,
    fat: 10,
    carbs: 70
  });
});

// =======================
// PORT ДЛЯ RAILWAY
// =======================
const PORT = process.env.PORT || 3000;

// ВАЖНО: 0.0.0.0 для Railway
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
