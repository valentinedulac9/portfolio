/* Valentine Dulac — Nav, Hero, About */
const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: "apropos", label: "À propos" },
  { id: "experiences", label: "Expériences" },
  { id: "competences", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

function smoothTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: y, behavior: window.__nomotion ? "auto" : "smooth" });
  }
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id) => { setOpen(false); smoothTo(id); };

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Valentine <b>Dulac</b>
      </div>
      <button className={"burger" + (open ? " open" : "")} onClick={() => setOpen((o) => !o)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div className={"links" + (open ? " open" : "")}>
        {SECTIONS.slice(0, 3).map((s) => (
          <a key={s.id} className={active === s.id ? "active" : ""}
             onClick={() => go(s.id)}>{s.label}</a>
        ))}
        <a className="cta" onClick={() => go("contact")}>Me contacter</a>
      </div>
    </nav>
  );
}

function Hero() {
  const glowRef = useRef(null);
  const portraitRef = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    if (window.__nomotion) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (glowRef.current) glowRef.current.style.transform = `translateX(-50%) translateY(${y * 0.3}px)`;
        if (portraitRef.current) portraitRef.current.style.transform = `translateY(${y * -0.06}px)`;
        if (h1Ref.current) h1Ref.current.style.transform = `translateY(${y * 0.08}px)`;
      });
    };
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      if (portraitRef.current) portraitRef.current.style.marginLeft = `${cx * 14}px`;
      if (glowRef.current) glowRef.current.style.marginLeft = `${cx * 30}px`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hero" id="top">
      <div className="glow" ref={glowRef}></div>
      <div className="stage">
        <p className="eyebrow anim s1">Chef de Projet Communication &amp; Digital</p>
        <img className="portrait anim s2" ref={portraitRef} src="assets/valentine.png" alt="Valentine Dulac" />
        <h1 className="display anim s3" ref={h1Ref}>Valentine<br /><span className="lav">Dulac</span></h1>
        <p className="tag anim s4">Entre stratégie, créativité et coordination, j'accompagne les marques dans la réalisation de projets de communication 360°.</p>
        <div className="ctas anim s5">
          <a className="btn btn-solid" onClick={() => smoothTo("experiences")}>Mes expériences <span className="arrow">→</span></a>
          <a className="btn btn-ghost" onClick={() => smoothTo("contact")}>Me contacter</a>
        </div>
      </div>
      <div className="footline">
        <span>Paris · 75004</span>
        <span>Red Agency — Chef de Groupe Digital</span>
        <span>Disponible pour de nouvelles opportunités</span>
      </div>
      <div className="scrollcue"><div className="dot"></div></div>
    </header>
  );
}

function About() {
  return (
    <section className="section about" id="apropos">
      <div className="wrap">
        <div className="section-tag reveal">
          <span className="idx">01 — À propos</span><span className="rule"></span>
        </div>
        <div className="lead-grid">
          <h2 className="lead reveal">
            Stratège créative et chef de projet,&nbsp;
            <span className="lav">calme, structurée et impliquée.</span>
          </h2>
          <div className="body reveal d1">
            <p>Spécialisée en communication digitale depuis plus de 3 ans, je pilote des projets 360°, de la réflexion stratégique jusqu'au déploiement opérationnel.</p>
            <p>Chef de Groupe Digital chez Red Agency, je crée des campagnes qui tiennent leur promesse.</p>
            <div className="badge">
              <span className="pulse"></span>
              <span>En poste chez <b>Red Agency</b> · ouverte aux échanges</span>
            </div>
          </div>
        </div>

        <div className="statband reveal">
          {[
            { to: 3, suf: "", label: "Années d'expérience" },
            { to: 6, suf: "", label: "Marques accompagnées" },
            { to: 12, suf: "", label: "Outils maîtrisés" },
          ].map((s, i) => {
            const Counter = window.Counter;
            return (
              <div className="stat" key={i}>
                <div className="snum">+<Counter to={s.to} />{s.suf}</div>
                <div className="slabel">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="strengths">
          {window.STRENGTHS.map((s, i) => (
            <div className={"strength reveal d" + (i + 1)} key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="glyph">{s.glyph}</div>
            </div>
          ))}
        </div>

        <div className="formation reveal">
          <div className="flabel">Formation</div>
          <div className="fgrid">
            {window.FORMATION.map((f, i) => (
              <div className="fitem" key={i}>
                <div className="fgrade">{f.grade}</div>
                <div className="fschool">{f.school}</div>
                <div className="fdetail">{f.detail}</div>
                <div className="fyear">{f.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, smoothTo, SECTIONS });
