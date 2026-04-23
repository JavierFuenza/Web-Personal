fetch('js/json/galeria.json')
  .then(res => res.json())
  .then(data => {
    // mezcla el array y toma los primeros 4
    const random = data.sort(() => Math.random() - 0.5).slice(0, 4);

    const galeria = document.getElementById('galeria-index');
    galeria.innerHTML = random.map(f => `
      <img src="${f.src}" alt="${f.alt}" class="foto-galeria">
    `).join('');
  });