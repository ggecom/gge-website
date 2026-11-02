// GGE company site: services, steps and the Arabic / English switch.
const SERVICES = [
  { area: "a", kind: "photo big", img: "construction.png",
    ar: ["المقاولات والأعمال المدنية", "إنشاء المباني والبنية التحتية والترميم والتشطيبات والأسوار، وتوريد وتصنيع وتركيب الواجهات والكلادينج."],
    en: ["Contracting & civil works", "Buildings, infrastructure, renovation, finishes and fencing, plus supply, fabrication and installation of façades and cladding."] },
  { area: "b", kind: "photo", img: "hvac.png",
    ar: ["التكييف والأنظمة الميكانيكية", "التكييف المركزي والمياه المبرّدة والتهوية ومجاري الهواء والعزل، من التركيب حتى الاختبار والتشغيل."],
    en: ["HVAC & mechanical", "Central air conditioning, chilled water, ventilation, ductwork and insulation, from installation to testing and commissioning."] },
  { area: "c", kind: "photo", img: "electrical.png",
    ar: ["الكهرباء والتحكم وأجهزة القياس", "اللوحات والكابلات وأنظمة الجهد المنخفض وBMS، وأجهزة القياس والتحكم PLC وRTU وSCADA."],
    en: ["Electrical, controls & instrumentation", "Panels, cabling, low-voltage systems and BMS, plus instrumentation and PLC, RTU and SCADA controls."] },
  { area: "d", kind: "forest",
    ar: ["السباكة ومكافحة الحريق", "شبكات المياه والصرف والمضخات والخزانات ومعالجة المياه، وأنظمة الإطفاء والإنذار."],
    en: ["Plumbing & fire protection", "Water and drainage networks, pumps, tanks and water treatment, plus firefighting and fire alarm systems."] },
  { area: "e", kind: "leaf",
    ar: ["دعم مشاريع النفط والغاز", "أعمال مدنية وكهروميكانيكية وأجهزة قياس وتجهيز مرافق مؤقتة للمواقع الصناعية ومشاريع النفط والغاز."],
    en: ["Oil & gas project support", "Civil, MEP and instrumentation works and temporary facilities for industrial sites and oil & gas projects."] },
  { area: "f", kind: "wide",
    ar: ["الطاقة الشمسية وتأجير المعدات", "تركيب أنظمة الطاقة الشمسية، وتأجير معدات الرفع والنقل والطاقة والإنشاء حسب احتياج مشروعك."],
    en: ["Solar & equipment rental", "Solar power installations, and rental of lifting, transport, power and construction equipment to suit your project."] },
];
const STEPS = [
  { ar: ["فهم المتطلبات", "نزور الموقع ونحدد نطاق العمل معك."], en: ["Understand the brief", "We visit the site and agree the scope with you."] },
  { ar: ["التصميم", "مخططات وحلول تناسب الموقع والميزانية."], en: ["Design", "Drawings and solutions that fit the site and budget."] },
  { ar: ["التوريد", "نوفّر المواد والمعدات المعتمدة."], en: ["Procurement", "We source approved materials and equipment."] },
  { ar: ["التركيب والتنفيذ", "فريقنا ينفّذ الأعمال في الموقع."], en: ["Installation", "Our crews carry out the works on site."] },
  { ar: ["الاختبار والتشغيل", "نختبر الأنظمة ونشغّلها قبل التسليم."], en: ["Testing & commissioning", "Systems are tested and commissioned before handover."] },
  { ar: ["التسليم والصيانة", "نسلّم المشروع ونبقى معك للصيانة."], en: ["Handover & maintenance", "We hand over and stay on for maintenance."] },
];

let lang = "ar";
try { if (localStorage.getItem("gge-lang") === "en") lang = "en"; } catch (e) { /* storage blocked */ }
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function render() {
  const ar = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = ar ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar]").forEach((el) => {
    const t = el.dataset[lang];
    if (t.includes("\\n")) el.innerHTML = t.split("\\n").map(esc).join("<br>");
    else el.textContent = t;
  });
  const btn = document.getElementById("lang");
  btn.textContent = ar ? "English" : "العربية";
  btn.lang = ar ? "en" : "ar";
  btn.setAttribute("aria-label", ar ? "Switch to English" : "التبديل إلى العربية");
  document.title = ar ? "GGE | عين الخضراء الخليجية — Gulf Green Eye Est." : "GGE | Gulf Green Eye Est. — Contracting, MEP & portable cabins";

  document.getElementById("svc").innerHTML = SERVICES.map((s) => {
    const [h, p] = s[lang];
    const img = s.img ? `<img src="${s.img}" alt="" loading="lazy">` : "";
    const mark = s.img ? "" : `<span class="mark" aria-hidden="true"></span>`;
    return `<article class="svc ${s.kind}" style="grid-area:${s.area}">${img}${mark}<div><h3>${esc(h)}</h3><p>${esc(p)}</p></div></article>`;
  }).join("");
  document.getElementById("steps").innerHTML = STEPS.map((s) => `<li><b>${esc(s[lang][0])}</b><span>${esc(s[lang][1])}</span></li>`).join("");
}

document.getElementById("lang").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("gge-lang", lang); } catch (e) { /* storage blocked */ }
  render();
});
document.getElementById("year").textContent = new Date().getFullYear();
render();
