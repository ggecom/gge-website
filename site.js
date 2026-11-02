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

// ---------- quote request: email or the form (saved straight into the GGE portal)
const RFQ_SERVICES = [
  ["construction", "المقاولات والأعمال المدنية", "Contracting & civil works"],
  ["hvac", "التكييف والأنظمة الميكانيكية", "HVAC & mechanical"],
  ["electrical", "الكهرباء والتحكم وأجهزة القياس", "Electrical, controls & instrumentation"],
  ["plumbing", "السباكة ومكافحة الحريق", "Plumbing & fire protection"],
  ["oilgas", "دعم مشاريع النفط والغاز", "Oil & gas project support"],
  ["solar", "الطاقة الشمسية وتأجير المعدات", "Solar & equipment rental"],
  ["cabins", "الكبائن والمكاتب المتنقلة", "Portable cabins & offices"],
  ["other", "أخرى", "Other"],
];
const RFQ_URLS = ["https://gge-api.long-heart-f38e.workers.dev/functions/v1/api", "https://lnmnuffitbnvnkejgbin.supabase.co/functions/v1/api"];
const RFQ_KEY = "sb_publishable_8DWgomPOe01dp-dMYvtbhA_-2TeVvTK";
const RFQ_ERR = {
  inq_fields: ["اكتب اسم الشركة واسم الشخص المسؤول.", "Enter the company and contact name."],
  inq_phone: ["اكتب رقم جوال صحيح.", "Enter a valid mobile number."],
  inq_email: ["اكتب بريدًا إلكترونيًا صحيحًا.", "Enter a valid email address."],
  inq_details: ["اكتب تفاصيل طلبك.", "Describe what you need."],
  inq_size: ["حجم كل ملف لازم يكون 5 ميقا أو أقل.", "Each file must be 5 MB or smaller."],
  inq_type: ["المرفقات المسموحة: PDF أو صور أو Excel أو Word.", "Attach PDF, image, Excel or Word files."],
  inq_rate: ["وصلنا عدد كبير من الطلبات منك اليوم. تواصل معنا على sales@gge.com.sa.", "Too many requests today. Please email sales@gge.com.sa."],
  net: ["تعذّر الإرسال. تأكد من الاتصال وحاول مرة ثانية، أو راسلنا على sales@gge.com.sa.", "Couldn't send. Check your connection and try again, or email sales@gge.com.sa."],
};
const dlg = document.getElementById("rfq");
const rfqForm = document.getElementById("rfq-form");
let rfqOpenedAt = 0;
const rfqStep = (name) => dlg.querySelectorAll("[data-step]").forEach((el) => (el.hidden = el.dataset.step !== name));
function rfqFill() {
  const ar = lang === "ar";
  const sel = document.getElementById("rfq-service"), v = sel.value;
  sel.innerHTML = `<option value="">${ar ? "اختر الخدمة" : "Choose a service"}</option>` + RFQ_SERVICES.map(([k, a, e]) => `<option value="${k}">${ar ? a : e}</option>`).join("");
  sel.value = v;
  const ta = rfqForm.details; ta.placeholder = ta.dataset[ar ? "phAr" : "phEn"];
}
function rfqError(code) {
  const el = document.getElementById("rfq-err"), m = RFQ_ERR[code] || RFQ_ERR.net;
  el.textContent = m[lang === "ar" ? 0 : 1]; el.hidden = false;
}
function openRfq(e) {
  if (!dlg || typeof dlg.showModal !== "function") return; // old browsers keep the mailto link
  e.preventDefault();
  rfqFill(); rfqStep("choose"); document.getElementById("rfq-err").hidden = true;
  dlg.showModal(); rfqOpenedAt = Date.now();
}
document.querySelectorAll("[data-rfq]").forEach((a) => a.addEventListener("click", openRfq));
dlg.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => dlg.close()));
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
dlg.querySelector("[data-go-form]").addEventListener("click", () => { rfqStep("form"); rfqForm.company.focus(); });
dlg.querySelector("[data-back]").addEventListener("click", () => rfqStep("choose"));
document.getElementById("lang").addEventListener("click", rfqFill);

rfqForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errEl = document.getElementById("rfq-err"); errEl.hidden = true;
  const f = rfqForm;
  if (f.company.value.trim().length < 2 || f.contact_name.value.trim().length < 2) return rfqError("inq_fields");
  if (!/^\+?\d{9,15}$/.test(f.phone.value.replace(/[\s-]/g, ""))) return rfqError("inq_phone");
  if (!f.email.checkValidity() || !f.email.value) return rfqError("inq_email");
  if (!f.service.value) { f.service.focus(); return; }
  if (f.details.value.trim().length < 10) return rfqError("inq_details");
  const files = [...f.files.files].slice(0, 3);
  if (files.some((x) => x.size > 5 * 1024 * 1024)) return rfqError("inq_size");
  const data = new FormData();
  for (const k of ["company", "contact_name", "email", "service", "city", "details", "website"]) data.append(k, f[k].value.trim());
  data.append("phone", f.phone.value.replace(/[\s-]/g, ""));
  data.append("lang", lang);
  data.append("elapsed", String(Date.now() - rfqOpenedAt));
  files.forEach((x) => data.append("files", x));
  const btn = document.getElementById("rfq-send"); btn.disabled = true; btn.classList.add("busy");
  try {
    let res = null;
    for (const url of RFQ_URLS) {
      try { res = await fetch(url, { method: "POST", headers: { apikey: RFQ_KEY }, body: data }); if (res.status !== 403) break; }
      catch (err) { res = null; }
    }
    if (!res) throw new Error("net");
    const out = await res.json().catch(() => ({}));
    if (!res.ok) return rfqError(out.code);
    document.getElementById("rfq-no").textContent = out.number || "";
    f.reset(); rfqStep("done");
  } catch (err) { rfqError("net"); }
  finally { btn.disabled = false; btn.classList.remove("busy"); }
});
