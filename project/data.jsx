/* Valentine Dulac — content data */

const STRENGTHS = [
  {
    n: "01",
    title: "Aisance rédactionnelle",
    body: "Des messages clairs et incarnés — du concept créatif à la copy de campagne, je traduis les intentions en mots qui portent.",
    glyph: "R",
  },
  {
    n: "02",
    title: "Sens de l'organisation",
    body: "Plannings, livrables, validations : je structure les projets avec rigueur pour que rien ne dérape et que chaque échéance soit tenue.",
    glyph: "O",
  },
  {
    n: "03",
    title: "Art de la synthèse",
    body: "Je transforme la complexité en clarté — recommandations, reportings et décisions lisibles d'un coup d'œil par les clients comme les équipes.",
    glyph: "S",
  },
];

const FORMATION = [
  { grade: "Master 2", school: "ESP Paris", detail: "Stratégie digitale & e-business", year: "2023–2024" },
  { grade: "Master 1", school: "ESP Paris", detail: "Innovation, communication & digital marketing", year: "2022–2023" },
  { grade: "Bachelor", school: "MediaSchool", detail: "Supdeweb — communication & web", year: "2019–2022" },
];

const EXPERIENCES = [
  {
    when: "Janvier 2026 — Aujourd'hui",
    role: "CDI · Chef de Groupe Digital",
    live: true,
    company: "Red Agency",
    sub: "Gestion de projet · Budgétisation · Stratégie digitale",
    bullets: [
      "Accompagnement des clients sur leurs besoins en communication digitale",
      "Réflexions stratégiques & recommandations de campagne (SMA, SMS, CRM, UGC)",
      "Suivi des plannings, livrables et validations clients",
      "Analyse des performances de campagnes & reporting",
      "Gestion de la relation client, suivi des budgets et de la rentabilité",
    ],
  },
  {
    when: "Septembre 2024 — Aujourd'hui",
    role: "Indépendante",
    live: true,
    company: "Freelance",
    sub: "Gestion de projet · Recommandations · Stratégie digitale",
    bullets: [
      "Pilotage de projets digitaux pour des clients variés, du cadrage à la livraison",
      "Coordination créative et production de contenus",
      "Conseil en stratégie de communication et gestion de campagnes",
    ],
  },
  {
    when: "Septembre 2022 — Octobre 2024",
    role: "Alternance · Chef de Projet",
    live: false,
    company: "Sharing Agency",
    sub: "Gestion de projet · Social Media · Shooting photo & vidéo",
    bullets: [
      "Gestion de projets social media et campagnes digitales",
      "Coordination des shootings, productions de contenus et équipes créatives",
      "Analyse des performances et reporting des campagnes",
      "Gestion des plannings et suivi de production",
    ],
  },
  {
    when: "Mars 2021 — Septembre 2021",
    role: "Stage · Communication & RP",
    live: false,
    company: "Consonance Communication",
    sub: "Communication · Relation presse",
    bullets: [
      "Gestion des réseaux sociaux",
      "Stratégie de relations presse",
      "Rédaction de communiqués de presse",
      "Constitution de listings presse",
    ],
  },
];

const CLIENTS = [
  { name: "Puressentiel", logo: "assets/clients/puressentiel.png" },
  { name: "Sebbin Paris", logo: "assets/clients/sebbin.png" },
  { name: "Caparol", logo: "assets/clients/caparol.svg" },
  { name: "Hager", logo: "assets/clients/hager.png" },
  { name: "Gypass", logo: "assets/clients/gypass.webp" },
  { name: "Marguerite", logo: "assets/clients/marguerite.jpg" },
];

const SKILLS = [
  "Stratégie digitale",
  "Gestion de projet",
  "Relation client",
  "Reporting & analyse",
  "Coordination créative",
  "Social Media Advertising (SMA)",
  "SMS marketing",
];

/* tool logos via simpleicons CDN — slug + label + short descriptor */
const TOOLS = [
  { name: "Notion",    slug: "notion",           color: "000000", desc: "Gestion & wiki" },
  { name: "Jira",      slug: "jira",             color: "0052CC", desc: "Suivi de projet" },
  { name: "Trello",    slug: "trello",           color: "0052CC", desc: "Kanban" },
  { name: "Brevo",     slug: "brevo",            color: "0B996E", desc: "CRM & emailing" },
  { name: "Figma",     slug: "figma",            color: "F24E1E", desc: "Design & maquettes" },
  { name: "Canva",     slug: "canva",            color: "00C4CC", desc: "Création visuelle" },
  { name: "Shopify",   slug: "shopify",          color: "7AB55C", desc: "E-commerce" },
  { name: "WordPress", slug: "wordpress",        color: "21759B", desc: "CMS & sites" },
  { name: "Meta Ads",  slug: "meta",             color: "0467DF", desc: "Publicité sociale" },
  { name: "GA4",       slug: "googleanalytics",  color: "E37400", desc: "Analyse d'audience" },
  { name: "Claude",    slug: "claude",           color: "D97757", desc: "IA générative" },
  { name: "ChatGPT",   slug: "openai",           color: "412991", desc: "IA générative", img: "assets/tools/chatgpt.png" },
];

const CONTACT = {
  email: "valentinedulac9@gmail.com",
  linkedin: "https://www.linkedin.com/",
  location: "Paris · 75004",
};

Object.assign(window, { STRENGTHS, FORMATION, EXPERIENCES, CLIENTS, SKILLS, TOOLS, CONTACT });
