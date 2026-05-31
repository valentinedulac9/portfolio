/* Valentine Dulac — Experience, Skills & Tools, Contact, Footer */

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

function Experience() {
  return (
    <section className="section exp" id="experiences">
      <div className="wrap">
        <div className="section-tag reveal">
          <span className="idx">02 — Parcours</span><span className="rule"></span>
        </div>
        <h2 className="display reveal" style={{ fontSize: "clamp(30px,4.4vw,56px)", marginBottom: 8 }}>
          Expériences
        </h2>
        <p className="reveal d1" style={{ color: "var(--fg-mute)", maxWidth: 560, marginTop: 0 }}>
          Agence, freelance, deux terrains où j'ai piloté la communication.
        </p>

        <div className="timeline">
          {window.EXPERIENCES.map((e, i) => (
            <div className={"row reveal d" + (i + 1)} key={i}>
              <div className="when">
                <span className="dt">{e.when}</span>
                <div className={"tagrole" + (e.live ? " live" : "")}>{e.role}</div>
              </div>
              <div className="what">
                <h3>{e.company}</h3>
                <div className="sub">{e.sub}</div>
                <ul>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="clients" id="marques">
          <div className="head reveal">
            <h3>Ils m'ont fait confiance</h3>
            <span className="note">Marques accompagnées</span>
          </div>
          <div className="client-wall">
            {window.CLIENTS.map((c) => (
              <div className="client-cell reveal" key={c.name} title={c.name}>
                <img className="client-logo" src={c.logo} alt={c.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolBadge({ t }) {
  const [err, setErr] = React.useState(false);
  const src = t.img || `https://cdn.simpleicons.org/${t.slug}`;
  return (
    <div className="tool">
      <div className="ic">
        {err
          ? <span className="fallback">{t.name[0]}</span>
          : <img src={src} alt={t.name}
                 loading="lazy" onError={() => setErr(true)} />}
      </div>
      <div className="meta">
        <div className="nm">{t.name}</div>
        <div className="ds">{t.desc}</div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="section skills" id="competences">
      <div className="wrap">
        <div className="section-tag reveal">
          <span className="idx">03 — Savoir-faire</span><span className="rule"></span>
        </div>
        <h2 className="display reveal" style={{ fontSize: "clamp(30px,4.4vw,56px)", marginBottom: 40 }}>
          Compétences &amp; Outils
        </h2>

        <div className="cols">
          <div className="col reveal d1">
            <h3>Compétences <span className="c">/ {String(window.SKILLS.length).padStart(2, "0")}</span></h3>
            <div className="skill-list">
              {window.SKILLS.map((s, i) => (
                <div className="skill-row" key={i}>
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="n">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col reveal d2">
            <h3>Outils <span className="c">/ {window.TOOLS.length}</span></h3>
            <div className="tools-grid">
              {window.TOOLS.map((t) => <ToolBadge t={t} key={t.name} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const c = window.CONTACT;
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <p className="eyebrow reveal">04 — Contact</p>
        <h2 className="reveal d1">Parlons-en.</h2>
        <p className="sentence reveal d1">Disponible pour de nouvelles opportunités.</p>

        <div className="channels reveal d2">
          <a className="channel" href={"mailto:" + c.email}>
            <span className="txt">
              <span className="lbl">Email</span>
              <span className="val">{c.email}</span>
            </span>
          </a>
        </div>

        <div className="actions reveal d3">
          <a className="btn btn-solid" href={c.linkedin} target="_blank" rel="noopener">
            Voir mon LinkedIn <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href={"mailto:" + c.email}>M'écrire</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="c">Valentine Dulac · Paris 75004</span>
        <span className="c">2026</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Experience, Skills, Contact, Footer, ToolBadge });
