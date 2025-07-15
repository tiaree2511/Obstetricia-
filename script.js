const ramos = [ { id: "BIO130", nombre: "Biología celular", requisitos: [], semestre: 1 }, { id: "OBST001", nombre: "Introducción a la matronería", requisitos: [], semestre: 1 }, { id: "QUIM075", nombre: "Química general y orgánica", requisitos: [], semestre: 1 }, { id: "CEGHC11", nombre: "Habilidades comunicativas", requisitos: [], semestre: 1 }, { id: "ING119", nombre: "Inglés I", requisitos: [], semestre: 1 }, { id: "MORF017", nombre: "Morfología general", requisitos: [], semestre: 2 }, { id: "SPAB113", nombre: "Salud pública", requisitos: [], semestre: 2 }, { id: "OBST002", nombre: "Cuidados Médico-Quirúrgicos I", requisitos: ["OBST001"], semestre: 2 }, { id: "OBST003", nombre: "Microbiología y parasitología", requisitos: ["BIO130"], semestre: 2 }, { id: "ING129", nombre: "Inglés II", requisitos: ["ING119"], semestre: 2 }, { id: "OBST004", nombre: "Bases perinatales y ginecológicas", requisitos: ["MORF017", "OBST003"], semestre: 3 }, { id: "OBST005", nombre: "Cuidados Médico-Quirúrgicos II", requisitos: ["OBST002", "OBST003", "MORF017"], semestre: 3 }, { id: "OBST006", nombre: "Políticas salud sexual y reproductiva", requisitos: ["SPAB113"], semestre: 3 }, { id: "CEGPC13", nombre: "Pensamiento crítico", requisitos: [], semestre: 3 }, { id: "ING239", nombre: "Inglés III", requisitos: ["ING129"], semestre: 3 }, { id: "OBST007", nombre: "Matronería y Bases fisiopatológicas", requisitos: ["OBST004"], semestre: 4 }, { id: "SPAB112", nombre: "Gestión en salud", requisitos: ["SPAB113"], semestre: 4 }, { id: "OBST008", nombre: "Salud sexual y Gestión I", requisitos: ["OBST005", "OBST006"], semestre: 4 }, { id: "OBST009", nombre: "Integrador I", requisitos: ["OBST004", "OBST005", "OBST006", "ING239"], semestre: 4 }, { id: "ING249", nombre: "Inglés IV", requisitos: ["ING239"], semestre: 4 }, { id: "FARM151", nombre: "Farmacología General", requisitos: ["BIO130", "QUIM075"], semestre: 5 }, { id: "OBST010", nombre: "Neonatología y Gestión", requisitos: ["SPAB112", "OBST004", "OBST006"], semestre: 5 }, { id: "OBST011", nombre: "Salud sexual y Gestión II", requisitos: ["OBST008", "OBST007"], semestre: 5 }, { id: "OBST012", nombre: "Psicología y entrevista clínica", requisitos: ["OBST006"], semestre: 5 }, { id: "OBST013", nombre: "Educación con enfoque vida", requisitos: ["OBST006", "OBST008", "OBST010"], semestre: 6 }, { id: "OBST014", nombre: "Matronería patológica integrada", requisitos: ["OBST010", "OBST011", "FARM151"], semestre: 6 }, { id: "SPAB300", nombre: "Bioestadística", requisitos: ["SPAB112"], semestre: 6 }, { id: "OBST015", nombre: "Salud familiar y comunitaria", requisitos: ["OBST006", "OBST008", "OBST010"], semestre: 6 }, { id: "SPAB303", nombre: "Metodología de la investigación", requisitos: ["SPAB300", "OBST006"], semestre: 7 }, { id: "OBST016", nombre: "Sexología, género y derecho", requisitos: ["OBST011"], semestre: 7 }, { id: "OBST017", nombre: "Intervención en contextos sociales", requisitos: ["OBST012", "OBST015"], semestre: 7 }, { id: "OBST018", nombre: "Matronería legal y bioética", requisitos: ["OBST006", "OBST007"], semestre: 7 }, { id: "OBST019", nombre: "Integrador II: Práctica comunidad", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"], semestre: 8 }, { id: "OBST020", nombre: "Imagenología en matronería", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"], semestre: 8 }, { id: "OBST021", nombre: "Oncológica y reproducción asistida", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"], semestre: 8 }, { id: "OBST022", nombre: "Proyecto de Matronería", requisitos: ["SPAB303"], semestre: 8 }, { id: "OBST023", nombre: "Habilitación profesional I", requisitos: ["OBST019", "OBST020", "OBST021", "OBST022"], semestre: 9 }, { id: "OBST024", nombre: "Habilitación profesional II", requisitos: ["OBST019", "OBST020", "OBST021", "OBST022"], semestre: 10 }, ];

let estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function estaDesbloqueado(ramo) { return ramo.requisitos.every(req => estadoRamos[req]); }

function renderMalla() { const malla = document.getElementById("malla"); malla.innerHTML = "";

const maxSemestre = Math.max(...ramos.map(r => r.semestre)); for (let s = 1; s <= maxSemestre; s++) { const columna = document.createElement("div"); columna.className = "semestre"; columna.style.minWidth = "90px";

const titulo = document.createElement("h2");
titulo.textContent = `S${s}`;
titulo.style.fontSize = "10px";
columna.appendChild(titulo);

ramos.filter(r => r.semestre === s).forEach(ramo => {
  const aprobado = estadoRamos[ramo.id];
  const desbloqueado = estaDesbloqueado(ramo) || ramo.requisitos.length === 0;

  const div = document.createElement("div");
  div.className = "ramo";
  div.style.fontSize = "9px";
  div.style.padding = "4px";

  if (aprobado) div.classList.add("aprobado");
  else if (desbloqueado) div.classList.add("desbloqueado");

  const nombre = document.createElement("h4");
  nombre.textContent = ramo.nombre;
  nombre.style.fontSize = "9px";
  const codigo = document.createElement("small");
  codigo.textContent = ramo.id;

  div.appendChild(nombre);
  div.appendChild(codigo);

  div.onclick = () => {
    if (desbloqueado || aprobado) {
      estadoRamos[ramo.id] = !estadoRamos[ramo.id];
      localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
      renderMalla();
    }
  };

  columna.appendChild(div);
});

malla.appendChild(columna);

} }

document.addEventListener("DOMContentLoaded", () => { renderMalla();

const resetBtn = document.getElementById("resetBtn"); if (resetBtn) { resetBtn.onclick = () => { if (confirm("¿Seguro que quieres reiniciar la malla?")) { estadoRamos = {}; localStorage.removeItem("estadoRamos"); renderMalla(); } }; } });

