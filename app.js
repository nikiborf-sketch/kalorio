const express = require("express");
const multer = require("multer");

const app = express();

// загрузка файлов
const upload = multer({ dest: "uploads/" });

// главная
app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

// POST
app.post("/analyze", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Нет файла" });
  }

  res.json({
    food: "Паста",
    calories: 520
  });
});

// порт
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
