const services = [
['المقاولات والأعمال المدنية','Contracting & civil works','إنشاء المباني والبنية التحتية والتجديد والتشطيبات والأسوار، وتوريد وتصنيع وتركيب الواجهات والكلادينج.','Building construction, infrastructure, renovation, fit-out and fencing, plus façade and cladding supply, fabrication and installation.','construction.png'],
['الأنظمة الميكانيكية والتكييف','Mechanical & HVAC','التكييف المركزي والمياه المبردة والتهوية ومجاري الهواء والعزل، من التركيب إلى الاختبار والتشغيل.','Central air conditioning, chilled water, ventilation, ductwork and insulation, through installation, testing and commissioning.','hvac.png'],
['الكهرباء والتحكم وأجهزة القياس','Electrical & instrumentation','اللوحات والكابلات وأنظمة الجهد المنخفض وBMS، وأجهزة القياس والتحكم PLC وRTU وSCADA.','Panels, cabling, low-voltage systems, BMS, process instrumentation and PLC, RTU and SCADA automation.','electrical.png'],
['السباكة ومكافحة الحريق','Plumbing & fire protection','شبكات المياه والصرف والمضخات والخزانات ومعالجة المياه، وأنظمة الإطفاء والإنذار والاختبار والتشغيل.','Water and drainage networks, pumps, tanks and water treatment, plus firefighting, fire alarm, testing and commissioning.',null],
['دعم مشاريع النفط والغاز','Oil & gas project support','أعمال مدنية وكهروميكانيكية وأجهزة قياس وتجهيز مرافق مؤقتة لدعم احتياجات المواقع الصناعية ومشاريع النفط والغاز.','Civil, MEP, instrumentation and temporary facility solutions supporting industrial sites and oil & gas project requirements.',null],
['الطاقة الشمسية وتأجير المعدات','Solar & equipment rental','تركيبات الطاقة الشمسية، وتأجير معدات الرفع والنقل والطاقة والإنشاء وفق احتياجات المشروع.','Solar installations and rental of lifting, transport, power and construction equipment to suit project needs.',null]
];
let language='ar';
try{language=localStorage.getItem('gge-language')==='en'?'en':'ar'}catch{}
function render(){
document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[language].replace(/\\n/g, "\n"));
const toggle=document.getElementById('language');toggle.textContent=language==='ar'?'English ↗':'العربية ↗';toggle.setAttribute('aria-label',language==='ar'?'Switch to English':'التبديل إلى العربية');
document.querySelector('meta[name=description]').content=language==='ar'?'Gulf Green Eye Est. — المقاولات والخدمات الكهروميكانيكية والكبائن المتنقلة في السعودية.':'Gulf Green Eye Est. — contracting, MEP services and portable cabins in Saudi Arabia.';
document.getElementById('service-grid').innerHTML=services.map((s,i)=>`<article class="service-card ${s[4]?'':'no-image'}">${s[4]?`<img src="assets/${s[4]}" alt="${s[language==='ar'?0:1]}" loading="lazy">`:''}<div class="body"><span class="number">0${i+1}</span><h3>${s[language==='ar'?0:1]}</h3><p>${s[language==='ar'?2:3]}</p></div></article>`).join('');
}
document.getElementById('language').addEventListener('click',()=>{language=language==='ar'?'en':'ar';try{localStorage.setItem('gge-language',language)}catch{}render()});
document.getElementById('year').textContent=new Date().getFullYear();render();
