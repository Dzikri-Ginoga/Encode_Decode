/**
 * Landing page. Static cards, no cipher math.
 * @module home
 */

/**
 * Render home landing.
 * @param {HTMLElement} root - container
 * @returns {void}
 */
export function renderHome(root) {
  const cards = [
    ["classic1", "key", "Menu 1 - Classic 1", "Member-owned module.", false],
    ["classic2", "key", "Menu 2 - Classic 2", "Member-owned module.", false],
    ["modern1", "lock", "Menu 3 - LFSR Stream", "Live. Configurable-tap stream cipher with bit trace.", true],
    ["modern2", "cpu", "Menu 4 - Modern 2", "Member-owned module.", false],
    ["super", "layers", "Menu 5 - Super Encrypt", "Chains all four stages with aggregated trace.", true]
  ];
  root.innerHTML = `
    <section class="rounded-2xl border border-white/10 bg-gradient-to-br from-panel to-abyss p-8 mb-5">
      <p class="text-xs uppercase tracking-widest text-accent flex items-center gap-2"><i class="iconoir-shield-check"></i>Interactive crypto lab</p>
      <h2 class="text-3xl font-bold mt-2">See every bit move.</h2>
      <p class="text-slate-400 mt-2 max-w-xl text-sm">Five cipher menus with full step-by-step execution visibility. Everything runs in your browser, nothing leaves the page.</p>
      <div class="flex gap-2 mt-4">
        <a href="#/modern1" class="rounded-lg bg-accent text-slate-950 font-bold px-4 py-2 text-sm flex items-center gap-2"><i class="iconoir-play"></i>Try the live LFSR demo</a>
      </div>
    </section>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      ${cards.map(([r, ic, t, d, live]) => `
        <a href="#/${r}" class="rounded-2xl border border-white/10 bg-panel/80 p-5 hover:border-accent transition block">
          <i class="iconoir-${ic} text-xl ${live ? "text-accent" : "text-slate-500"}"></i>
          <h3 class="font-bold mt-2">${t}</h3>
          <p class="text-xs text-slate-400 mt-1">${d}</p>
          <span class="inline-block mt-3 text-[11px] px-2 py-0.5 rounded-full ${live ? "bg-accent/15 text-accent" : "bg-white/5 text-slate-500"}">${live ? "live" : "stub"}</span>
        </a>`).join("")}
    </div>
    <section class="rounded-2xl border border-white/10 bg-panel/80 p-5">
      <h3 class="font-bold flex items-center gap-2"><i class="iconoir-help-circle text-accent"></i>How it works</h3>
      <ol class="text-sm text-slate-400 mt-2 space-y-1 list-decimal list-inside">
        <li>Pick a menu and enter input plus key.</li>
        <li>Run encrypt or decrypt.</li>
        <li>Step through the trace to see each transformation.</li>
      </ol>
    </section>`;
}
