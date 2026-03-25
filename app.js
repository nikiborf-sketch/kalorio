import express from "express";
import multer from "multer";

const app = express();
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Kalorio — Mini App</title>
  <style>
    :root{--bg:#0f0f12;--card:#16161a;--accent:#7c4dff;color-scheme:dark}
    html,body{height:100%;margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,-apple-system,Arial}
    body{background:linear-gradient(180deg,#07070a, #0f0f12);display:flex;align-items:center;justify-content:center;padding:24px;color:#e6e6e6}
    .wrap{width:100%;max-width:720px;background:var(--card);border-radius:12px;padding:20px;box-shadow:0 6px 30px rgba(0,0,0,.6)}
    h1{margin:0 0 12px;font-size:20px}
    .row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
    .filebox{flex:1;display:flex;gap:12px;align-items:center}
    input[type=file]{display:none}
    .btn{background:var(--accent);color:white;padding:10px 14px;border-radius:8px;border:0;cursor:pointer}
    button.secondary{background:transparent;border:1px solid rgba(255,255,255,.06);color:#ddd}
    .preview{width:140px;height:140px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#0b0b0d}
    .preview img{width:100%;height:100%;object-fit:cover}
    pre.result{background:#0b0b0d;padding:12px;border-radius:8px;margin-top:14px;color:#bcd}
    .hint{opacity:.6;font-size:13px;margin-top:10px}
    .center{display:flex;justify-content:center}
    .spinner{width:18px;height:18px;border:3px solid rgba(255,255,255,.08);border-top-color:var(--accent);border-radius:50%;animation:spin 1s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    footer{margin-top:14px;font-size:13px;opacity:.6}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Kalorio — Mini App (демо)</h1>

    <div class="row">
      <div class="filebox">
        <label class="btn" id="chooseBtn">Выбрать фото</label>
        <input type="file" id="fileInput" accept="image/*">
        <button class="btn" id="sendBtn" disabled>Анализировать</button>
        <button class="secondary" id="clearBtn">Очистить</button>
      </div>

      <div class="preview" id="preview">
        <span style="opacity:.6">Превью</span>
      </div>
    </div>

    <div class="hint">Отправка на <code>/analyze</code> (POST multipart/form-data field: <strong>image</strong>).</div>

    <pre class="result" id="result" style="display:none"></pre>
    <div class="center" id="status" style="margin-top:10px"></div>

    <footer>Демо: фото отправляются на твой бекенд. Позже подключим OpenAI и модель распознавания.</footer>
  </div>

<script>
const chooseBtn = document.getElementById('chooseBtn');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const resultEl = document.getElementById('result');
const statusEl = document.getElementById('status');

let currentFile = null;

chooseBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  const f = fileInput.files[0];
  if (!f) return resetInput();
  currentFile = f;
  const url = URL.createObjectURL(f);
  preview.innerHTML = '';
  const img = document.createElement('img');
  img.src = url;
  preview.appendChild(img);
  sendBtn.disabled = false;
  resultEl.style.display = 'none';
});

clearBtn.addEventListener('click', resetInput);

function resetInput(){
  fileInput.value = '';
  currentFile = null;
  preview.innerHTML = '<span style="opacity:.6">Превью</span>';
  sendBtn.disabled = true;
  resultEl.style.display = 'none';
  statusEl.innerHTML = '';
}

sendBtn.addEventListener('click', async () => {
  if (!currentFile) return;
  statusEl.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
  resultEl.style.display = 'none';
  try {
    const fd = new FormData();
    // поле должно называться "image" — так настроен бекенд
    fd.append('image', currentFile);

    // Если фронтенд и бэк находятся на одном домене, можно отправить относительный путь:
    const res = await fetch('/analyze', {
      method: 'POST',
      body: fd
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error('Server: ' + res.status + ' — ' + text);
    }
    const json = await res.json();
    resultEl.textContent = JSON.stringify(json, null, 2);
    resultEl.style.display = 'block';
  } catch (err) {
    resultEl.textContent = 'Ошибка: ' + err.message;
    resultEl.style.display = 'block';
  } finally {
    statusEl.innerHTML = '';
  }
});
</script>
</body>
</html>
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
