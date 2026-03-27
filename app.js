import express from "express";
import multer from "multer";
import OpenAI from "openai";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// главная страница
app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

// анализ фото еды
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Нет изображения" });
    }

    const base64Image = image.buffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Ты эксперт по питанию. Определи еду и оцени КБЖУ.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Определи блюдо и верни JSON: food, calories, protein, fat, carbs",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const result = response.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка анализа" });
  }
});

// порт для Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
