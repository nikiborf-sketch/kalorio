const express = require("express");
const multer = require("multer");

const app = express();

// загрузка файлов
const upload = multer({ dest: "uploads/" });

// главная
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
