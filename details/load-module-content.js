// load-module-content.js
function loadModuleContent(modulname, jsonPfad = 'module-details.json') {
  fetch(jsonPfad)
    .then(response => response.json())
    .then(data => {
      const inhalte = data[modulname];
      const container = document.getElementById(modulname);

      if (!inhalte || !Array.isArray(inhalte)) {
        container.innerHTML = '<p><em>Keine Inhalte gefunden.</em></p>';
        return;
      }

      // Header erzeugen
      const header = document.createElement('div');
      header.className = 'module-header';
      header.textContent = modulname;
      container.appendChild(header);

      // Inhalt erzeugen
      const ul = document.createElement('ul');
      inhalte.forEach(punkt => {
        const li = document.createElement('li');
        li.textContent = punkt;
        ul.appendChild(li);
      });

      container.appendChild(ul);
    })
    .catch(error => {
      console.error('Fehler beim Laden der Modul-Inhalte:', error);
    });
}
