import express from "express";

const app = express();

console.log("NEW VERSION");

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

app.post("/analyze", async (req, res) => {
  const image = req.body.image;

  res.json({
    food: "Паста",
    calories: 520
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
