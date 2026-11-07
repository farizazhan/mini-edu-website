// ---- Тёмная тема (запоминается в браузере) ----
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);

const toggle = document.getElementById("theme-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// ---- Счётчик посещений ----
const visits = document.getElementById("visits");
if (visits) {
  const n = Number(localStorage.getItem("visits") || 0) + 1;
  localStorage.setItem("visits", n);
  visits.textContent = n;
}

// ---- Викторина ----
const quizBox = document.getElementById("quiz");
if (quizBox) {
  const questions = [
    { q: "Что означает CI?", a: ["Continuous Integration", "Code Inspection", "Cloud Instance"], c: 0 },
    { q: "Где лежит файл workflow?", a: [".github/workflows/", "/src/actions/", "/docs/ci/"], c: 0 },
    { q: "Какой сервис бесплатно хостит статические сайты?", a: ["GitHub Pages", "GitHub Issues", "GitHub Gists"], c: 0 },
    { q: "Что делает ключ needs: lint?", a: ["Запускает job после успешного lint", "Удаляет lint", "Ускоряет сборку"], c: 0 }
  ];
  let i = 0, score = 0;

  function render() {
    if (i >= questions.length) {
      quizBox.innerHTML = `<h2>Результат: ${score} из ${questions.length} 🎉</h2>
        <button id="again" type="button">Пройти заново</button>`;
      document.getElementById("again").onclick = () => { i = 0; score = 0; render(); };
      return;
    }
    const item = questions[i];
    quizBox.innerHTML = `<h2>Вопрос ${i + 1}/${questions.length}</h2><p>${item.q}</p>`;
    item.a.forEach((text, idx) => {
      const b = document.createElement("button");
      b.className = "option"; b.type = "button"; b.textContent = text;
      b.onclick = () => {
        const all = quizBox.querySelectorAll(".option");
        all.forEach(x => x.disabled = true);
        all[item.c].classList.add("correct");
        if (idx === item.c) score++; else b.classList.add("wrong");
        setTimeout(() => { i++; render(); }, 900);
      };
      quizBox.appendChild(b);
    });
  }
  render();
}
