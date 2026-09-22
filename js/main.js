import { renderClassic1 } from "./modules/classic1/view.js";
import { renderClassic2 } from "./modules/classic2/view.js";
import { renderModern1 } from "./modules/modern1/view.js";
import { renderModern2 } from "./modules/modern2/view.js";
import { renderSuper } from "./modules/super-crypto/view.js";

const views = {
  classic1: renderClassic1,
  classic2: renderClassic2,
  modern1: renderModern1,
  modern2: renderModern2,
  super: renderSuper
};

const app = document.getElementById("app");
const tabs = document.getElementById("tabs");

function setTab(name) {
  if (!views[name]) return;
  tabs.querySelectorAll("button").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === name);
  });
  app.innerHTML = "";
  views[name](app);
}

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-tab]");
  if (btn) setTab(btn.dataset.tab);
});

setTab("modern1");
