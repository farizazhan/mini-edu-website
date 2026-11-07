// Тёмная тема (запоминается в браузере)
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

// Счётчик посещений
const visits = document.getElementById("visits");
if (visits) {
  const n = Number(localStorage.getItem("visits") || 0) + 1;
  localStorage.setItem("visits", n);
  visits.textContent = n;
}
