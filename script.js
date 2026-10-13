const techStack = [
  { name: "TypeScript", group: "Frontend" },
  { name: "React", group: "Frontend" },
  { name: "Redux", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "React Query", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "Express.js", group: "Backend" },
  { name: "NestJS", group: "Backend" },
  { name: "Python", group: "Backend" },
  { name: "FastAPI", group: "Backend" },
  { name: "PostgreSQL", group: "Database" },
  { name: "MongoDB", group: "Database" },
  { name: "Redis", group: "Database" },
  { name: "Firebase", group: "Database" },
  { name: "Supabase", group: "Database" },
  { name: "Docker", group: "DevOps" },
  { name: "Nginx", group: "DevOps" },
  { name: "Git", group: "DevOps" },
  { name: "GitHub", group: "DevOps" },
  { name: "Linux", group: "DevOps" },
  { name: "LangChain", group: "AI" },
  { name: "LangGraph", group: "AI" },
];

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

const menu = document.getElementById("menu");

document.getElementById("menuToggle").addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

const filters = document.getElementById("filters");
const techGrid = document.getElementById("techGrid");
const groups = ["All", ...new Set(techStack.map((t) => t.group))];

function renderTech(group) {
  const items = group === "All" ? techStack : techStack.filter((t) => t.group === group);
  techGrid.innerHTML = items.map((t) => `<div class="tech-item">${t.name}</div>`).join("");
}

groups.forEach((group, index) => {
  const btn = document.createElement("button");
  btn.className = "filter-btn" + (index === 0 ? " active" : "");
  btn.textContent = group;
  btn.addEventListener("click", () => {
    filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTech(group);
  });
  filters.appendChild(btn);
});

renderTech("All");
document.getElementById("statTech").textContent = techStack.length;

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = ["name", "email", "message"].map((id) => document.getElementById(id));
  const [name, email, message] = fields;
  fields.forEach((f) => f.classList.remove("error"));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  if (!name.value.trim() || !emailValid || message.value.trim().length < 10) {
    if (!name.value.trim()) name.classList.add("error");
    if (!emailValid) email.classList.add("error");
    if (message.value.trim().length < 10) message.classList.add("error");
    status.className = "form-status error";
    status.textContent = "Please fill every field correctly (message: 10 characters minimum).";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(`${message.value.trim()}\n\nFrom: ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:akramferkioui.contact@gmail.com?subject=${subject}&body=${body}`;

  status.className = "form-status success";
  status.textContent = "Opening your email app...";
  form.reset();
});

const topBtn = document.getElementById("topBtn");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section .container, .card").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();