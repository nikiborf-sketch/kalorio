import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Kalorio API работает 🚀");
});

app.listen(3000, () => {
  console.log("Server started");
});
