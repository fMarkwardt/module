function loadModuleContent(university, modulname) {

  if(university == "bht") {
    jsonPfad = 'modules_bht.json';
  }
  else if(university == "mlu"){
    jsonPfad = 'modules_mlu.json';
  }
  else if(university == "tub"){
    jsonPfad = 'modules_tub.json';
  }

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

function loadColoredHeading(type = 'success', targetId = null) {
  const texts = {
    success: "Für die Anerkennung des Moduls werden die folgenden inhaltlich äquivalenten Lehrveranstaltungen herangezogen:",
    danger: "Zur Anerkennung des Moduls können keine inhaltlich äquivalenten Lehrveranstaltungen herangezogen werden.",
    guest_module: "Dieses Modul soll im Komplex Spezifikation als Gast-Modul des Bereichs Informatik anerkannt werden."
  };

  const colors = {
    success: 'success',
    danger: 'danger',
    guest_module: 'success'
  };

  const headingText = texts[type] || "";
  const color = colors[type] || 'secondary'; // fallback color

  const heading = document.createElement('h2');
  heading.className = `h4 text-${color} my-5`;
  heading.textContent = headingText;

  if (targetId) {
    const container = document.getElementById(targetId);
    if (container) container.appendChild(heading);
  } else {
    document.body.appendChild(heading);
  }
}
