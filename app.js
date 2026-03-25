import express from "express";
import multer from "multer";

const app = express();

// настройка загрузки файлов
const upload = multer({ dest: "uploads/" });

// главная
app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

// анализ (POST с фото)
app.post("/analyze", upload.single("image"), async (req, res) => {
  console.log("Фото получено");

  // пока заглушка (потом AI)
  res.json({
    food: "Паста",
    calories: 520,
    protein: 20,
    fat: 10,
    carbs: 70
  });
});

// порт для Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
