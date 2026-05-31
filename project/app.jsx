/* Valentine Dulac — motion hooks, Tweaks, mount */

/* animated count-up */
function Counter({ to, dur = 1500 }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  const done = React.useRef(false);
  React.useEffect(() => {
    if (window.__nomotion) { setN(to); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}
window.Counter = Counter;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#a99bc6", "#7a6f9b"],
  "tint": "Encre",
  "titleFont": "Archivo",
  "grain": false,
  "motion": true
}/*EDITMODE-END*/;

const FONT_MAP = {
  "Archivo": "'Archivo', sans-serif",
  "Bricolage": "'Bricolage Grotesque', sans-serif",
  "Newsreader": "'Newsreader', serif",
};

function App() {
  const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const s = document.documentElement.style;
    const pal = Array.isArray(t.accent) ? t.accent : [t.accent, t.accent];
    s.setProperty("--accent", pal[0]);
    s.setProperty("--accent-deep", pal[1]);
    s.setProperty("--display", FONT_MAP[t.titleFont] || FONT_MAP.Archivo);
    document.body.classList.toggle("grain", !!t.grain);
    document.body.classList.toggle("nomotion", !t.motion);
    document.body.classList.toggle("tint-nuit", t.tint === "Nuit");
    window.__nomotion = !t.motion;
  }, [t]);

  // scroll reveal
  React.useEffect(() => {
    if (window.__nomotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t.motion]);

  return (
    <React.Fragment>
      <window.Nav />
      <window.Hero />
      <main>
        <window.About />
        <window.Experience />
        <window.Skills />
        <window.Contact />
      </main>
      <window.Footer />

      <TweaksPanel title="Réglages">
        <TweakSection label="Couleur d'accent" />
        <TweakColor label="Accent" value={t.accent}
          options={[["#a99bc6", "#7a6f9b"], ["#9bb0c6", "#6f7f9b"], ["#9cc6a9", "#6f9b7c"], ["#c6a79b", "#9b7a6f"]]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Ambiance" />
        <TweakRadio label="Fond" value={t.tint} options={["Encre", "Nuit"]}
          onChange={(v) => setTweak("tint", v)} />
        <TweakRadio label="Titres" value={t.titleFont} options={["Archivo", "Bricolage", "Newsreader"]}
          onChange={(v) => setTweak("titleFont", v)} />
        <TweakSection label="Effets" />
        <TweakToggle label="Grain filmique" value={t.grain} onChange={(v) => setTweak("grain", v)} />
        <TweakToggle label="Animations" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
