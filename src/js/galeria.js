let fotos = [];

// carga el json y genera la galeria
fetch('js/json/galeria.json')
  .then(res => res.json())
  .then(data => {
    fotos = data;
    generarFiltros();
    mostrarFotos('todos');
  });

function generarFiltros() {
  const select = document.getElementById('filtros');
  const años = [...new Set(fotos.map(f => f.año))].sort();

  años.forEach(año => {
    const option = document.createElement('option');
    option.value = año;
    option.textContent = año;
    select.appendChild(option);
  });

  select.addEventListener('change', e => mostrarFotos(e.target.value));
}

function mostrarFotos(filtro) {
  const galeria = document.getElementById('galeria');
  const resultado = filtro === 'todos' ? fotos : fotos.filter(f => f.año == filtro);

  galeria.innerHTML = resultado.map(f => `
    <img src="${f.src}" alt="${f.alt}" class="foto-galeria">
  `).join('');
}