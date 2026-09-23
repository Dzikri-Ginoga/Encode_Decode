import { renderHome } from "./home.js";
import { renderClassic1 } from "./modules/classic1/view.js";
import { renderClassic2 } from "./modules/classic2/view.js";
import { renderModern1 } from "./modules/modern1/view.js";
import { renderModern2 } from "./modules/modern2/view.js";
import { renderSuper } from "./modules/super-crypto/view.js";

const STORE_KEY = "kripto-shell-collapsed";

const routes = {
  home: { render: renderHome, label: "Beranda", live: true },
  classic1: { render: renderClassic1, label: "Caesar Cipher", live: true },
  classic2: { render: renderClassic2, label: "Vignere Cipher", live: true },
  modern1: { render: renderModern1, label: "Aliran LFSR", live: true },
  modern2: { render: renderModern2, label: "Block Chiper", live: true },
  super: { render: renderSuper, label: "Super Enkripsi", live: true }
};

const app = document.getElementById("app");
const tabs = document.getElementById("tabs");
const shell = document.getElementById("shell");

tabs.innerHTML = Object.entries(routes)
  .map(([k, r]) => `<a href="#/${k}" data-route="${k}">` +
    `<span class="lbl">${r.label}</span><span class="dot ${r.live ? "live" : ""}"></span></a>`)
  .join("");

function loadCollapsed() {
  try { return localStorage.getItem(STORE_KEY) === "1"; }
  catch { return false; }
}

function saveCollapsed(v) {
  try { localStorage.setItem(STORE_KEY, v ? "1" : "0"); }
  catch { /* storage unavailable, ignore */ }
}

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

const collapseBtn = document.getElementById("collapse");
const expandBtn = document.createElement("button");
expandBtn.id = "expand";
expandBtn.className = "expand-btn";
expandBtn.type = "button";
expandBtn.innerHTML = '<i class="iconoir-menu"></i>';
expandBtn.setAttribute("aria-label", "Tampilkan navigasi");
document.body.append(expandBtn);

function setCollapsed(collapsed) {
  shell.classList.toggle("collapsed", collapsed);
  collapseBtn.setAttribute("aria-expanded", String(!collapsed));
  collapseBtn.setAttribute("aria-label", collapsed ? "Tampilkan navigasi" : "Sembunyikan navigasi");
  collapseBtn.title = collapsed ? "Tampilkan navigasi" : "Sembunyikan navigasi";
  collapseBtn.querySelector("i").className = collapsed ? "iconoir-sidebar-expand" : "iconoir-sidebar-collapse";
  collapseBtn.querySelector("span").textContent = collapsed ? "Tampilkan" : "Sembunyikan";
  expandBtn.hidden = !collapsed || isMobile();
  saveCollapsed(collapsed);
}

collapseBtn.onclick = () => setCollapsed(!shell.classList.contains("collapsed"));
expandBtn.onclick = () => setCollapsed(false);
window.matchMedia("(max-width: 768px)").addEventListener("change", () => {
  setCollapsed(shell.classList.contains("collapsed"));
});

setCollapsed(loadCollapsed());

function current() {
  const h = location.hash.replace("#/", "");
  return routes[h] ? h : "home";
}

function render() {
  const name = current();
  tabs.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === name);
  });
  app.innerHTML = "";
  routes[name].render(app);
}

window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "#/home";
render();
