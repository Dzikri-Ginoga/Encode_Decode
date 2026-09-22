import { renderHome } from "./home.js";
import { renderClassic1 } from "./modules/classic1/view.js";
import { renderClassic2 } from "./modules/classic2/view.js";
import { renderModern1 } from "./modules/modern1/view.js";
import { renderModern2 } from "./modules/modern2/view.js";
import { renderSuper } from "./modules/super-crypto/view.js";

const routes = {
  home: { render: renderHome, label: "Beranda", icon: "home", live: true },
  classic1: { render: renderClassic1, label: "Menu 1 - Klasik 1", icon: "key", live: false },
  classic2: { render: renderClassic2, label: "Menu 2 - Klasik 2", icon: "key", live: false },
  modern1: { render: renderModern1, label: "Menu 3 - Aliran LFSR", icon: "lock", live: true },
  modern2: { render: renderModern2, label: "Menu 4 - Modern 2", icon: "cpu", live: false },
  super: { render: renderSuper, label: "Menu 5 - Super Enkripsi", icon: "layers", live: true }
};

const app = document.getElementById("app");
const tabs = document.getElementById("tabs");
const shell = document.getElementById("shell");

tabs.innerHTML = Object.entries(routes)
  .map(([k, r]) => `<a href="#/${k}" data-route="${k}" title="${r.label}">
    <i class="iconoir-${r.icon}"></i><span class="lbl">${r.label}</span><span class="dot ${r.live ? "live" : ""}"></span></a>`)
  .join("");

document.getElementById("collapse").onclick = () => {
  const collapsed = shell.classList.toggle("collapsed");
  document.querySelector("#collapse i").className =
    collapsed ? "iconoir-nav-arrow-right" : "iconoir-nav-arrow-left";
};

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
