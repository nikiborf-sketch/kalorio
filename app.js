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
          content: "Ты эксперт по питанию. Определи блюдо и оцени КБЖУ.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Определи блюдо и верни JSON строго в формате: food, calories, protein, fat, carbs",
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

    const raw = response.choices[0].message.content;

    // 🔥 надежное извлечение JSON
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Не удалось извлечь JSON", raw });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    res.json(parsed);
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({
      error: "Ошибка анализа",
      details: error.message,
    });
  }
});

// порт для Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
