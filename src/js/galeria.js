let fotos = [];

// carga el json y genera la galeria
fetch('js/json/galeria.json')
  .then(res => res.json())
  .then(data => {
    fotos = data;        // guarda las fotos en la variable global
    generarFiltros();    // genera las opciones del select
    mostrarFotos('todos'); // muestra todas las fotos al cargar
  });

// genera las opciones del select a partir de los años únicos del json
function generarFiltros() {
  const select = document.getElementById('filtros');

  // extrae los años únicos y los ordena
  const anios = [...new Set(fotos.map(f => f.anio))].sort();

  anios.forEach(anio => {
    const option = document.createElement('option');
    option.value = anio;
    option.textContent = anio;
    option.style.backgroundColor = 'black';
    option.style.color = 'azure';
    select.appendChild(option);
  });

  // escucha cambios en el select y filtra las fotos
  select.addEventListener('change', e => mostrarFotos(e.target.value));
}

// filtra y muestra las fotos según el año seleccionado
function mostrarFotos(filtro) {
  const galeria = document.getElementById('galeria');

  // si el filtro es 'todos' muestra todas, si no filtra por año
  const resultado = filtro === 'todos' ? fotos : fotos.filter(f => f.anio == filtro);

  // genera el html de las fotos y lo inserta en el div galeria
  galeria.innerHTML = resultado.map(f => `
    <img src="${f.src}" alt="${f.alt}" class="foto-galeria">
  `).join('');
}