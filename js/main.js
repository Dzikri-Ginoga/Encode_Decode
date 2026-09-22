import { renderHome } from "./home.js";
import { renderClassic1 } from "./modules/classic1/view.js";
import { renderClassic2 } from "./modules/classic2/view.js";
import { renderModern1 } from "./modules/modern1/view.js";
import { renderModern2 } from "./modules/modern2/view.js";
import { renderSuper } from "./modules/super-crypto/view.js";

const routes = {
  home: { render: renderHome, label: "Home", icon: "home" },
  classic1: { render: renderClassic1, label: "Menu 1 - Classic 1", icon: "key" },
  classic2: { render: renderClassic2, label: "Menu 2 - Classic 2", icon: "key" },
  modern1: { render: renderModern1, label: "Menu 3 - LFSR Stream", icon: "lock" },
  modern2: { render: renderModern2, label: "Menu 4 - Modern 2", icon: "cpu" },
  super: { render: renderSuper, label: "Menu 5 - Super Encrypt", icon: "layers" }
};

const app = document.getElementById("app");
const tabs = document.getElementById("tabs");

tabs.innerHTML = Object.entries(routes)
  .map(([k, r]) => `<a href="#/${k}" data-route="${k}"
    class="rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 flex items-center gap-2 hover:border-accent transition">
    <i class="iconoir-${r.icon}"></i>${r.label}</a>`)
  .join("");

function current() {
  const h = location.hash.replace("#/", "");
  return routes[h] ? h : "home";
}

function render() {
  const name = current();
  tabs.querySelectorAll("a").forEach((a) => {
    const on = a.dataset.route === name;
    a.classList.toggle("border-accent", on);
    a.classList.toggle("text-accent", on);
  });
  app.innerHTML = "";
  routes[name].render(app);
}

window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "#/modern1";
render();
