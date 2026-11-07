const events = [
 {title:"Rhythm Nights",category:"Music",date:"15 December 2026",place:"Bhubaneswar",icon:"🎵",desc:"An evening of live music, good vibes, and local artists."},
 {title:"Future Tech Summit",category:"Technology",date:"20 December 2026",place:"Bhubaneswar",icon:"💡",desc:"Explore new ideas in AI, software, and emerging technology."},
 {title:"Creative Canvas",category:"Art",date:"05 January 2027",place:"Cuttack",icon:"🎨",desc:"A colourful showcase of art, design, and creative talent."},
 {title:"Community Run",category:"Community",date:"10 January 2027",place:"Bhubaneswar",icon:"🏃",desc:"Come together for a fun and friendly community run."},
 {title:"Code & Coffee",category:"Technology",date:"18 January 2027",place:"Online",icon:"💻",desc:"Meet developers, share projects, and learn something new."},
 {title:"Acoustic Evening",category:"Music",date:"25 January 2027",place:"Puri",icon:"🎸",desc:"Relax with acoustic performances in a cosy atmosphere."}
];
const grid=document.getElementById("eventGrid"), search=document.getElementById("searchInput");
let category="All";
function render(){
 const q=search.value.toLowerCase();
 const filtered=events.filter(e=>(category==="All"||e.category===category)&&(e.title+" "+e.place+" "+e.category).toLowerCase().includes(q));
 grid.innerHTML=filtered.map((e,i)=>`<article class="event-card"><div class="event-icon">${e.icon}</div><small>${e.category.toUpperCase()}</small><h3>${e.title}</h3><p>📅 ${e.date}<br>📍 ${e.place}</p><p>${e.desc}</p><button data-index="${events.indexOf(e)}">View details →</button></article>`).join("")||"<p>No events found. Try another search.</p>";
}
render();search.addEventListener("input",render);
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");category=btn.dataset.category;render()}));
const dialog=document.getElementById("eventDialog");let selected=null;
grid.addEventListener("click",e=>{const btn=e.target.closest("button[data-index]");if(!btn)return;selected=events[Number(btn.dataset.index)];document.getElementById("dialogCategory").textContent=selected.category;document.getElementById("dialogTitle").textContent=selected.title;document.getElementById("dialogInfo").textContent=selected.date+" • "+selected.place+" — "+selected.desc;document.getElementById("formMessage").textContent="";dialog.showModal()});
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
document.getElementById("registerForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.target);const registrations=JSON.parse(localStorage.getItem("eventoraRegistrations")||"[]");registrations.push({event:selected.title,name:data.get("name"),email:data.get("email")});localStorage.setItem("eventoraRegistrations",JSON.stringify(registrations));document.getElementById("formMessage").textContent="Registration saved on this device!";e.target.reset()});
document.getElementById("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"});
