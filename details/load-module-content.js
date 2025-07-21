function loadModuleContent(university, modulname) {
  let jsonPfad;
  let summaryPfad;

  if (university === "bht") {
    jsonPfad = 'modules_bht.json';
    summaryPfad = '../modules_summary_bht.json';
  } else if (university === "mlu") {
    jsonPfad = 'modules_mlu.json';
    summaryPfad = '../modules_summary_mlu.json';
  } else if (university === "tub") {
    jsonPfad = 'modules_tub.json';
    summaryPfad = '../modules_summary_tub.json';
  }

  fetch(jsonPfad)
    .then(response => response.json())
    .then(inhalteData => {
      const inhalte = inhalteData[modulname];
      const container = document.getElementById(modulname);

      if (!inhalte || !Array.isArray(inhalte)) {
        container.innerHTML = '<p><em>Keine Inhalte gefunden.</em></p>';
        return;
      }

      // LP aus Summary-Datei holen
      fetch(summaryPfad)
        .then(response => response.json())
        .then(summaryData => {
          let lp = '?';

          if (university === 'mlu') {
            // bei MLU: Teilstring-Suche in verschachtelten Blöcken
            summaryData.forEach(block => {
              const found = block.modules.find(mod => mod.title.includes(modulname));
              if (found) lp = found.lp;
            });
          } else {
            // BHT, TUB: exakter Vergleich
            const found = summaryData.find(mod => mod.title === modulname);
            if (found) lp = found.lp;
          }

          // Header mit Titel und LP
          const header = document.createElement('div');
          header.className = 'module-header d-flex justify-content-between align-items-center';
          header.innerHTML = `<span>${modulname}</span><span class="text-secondary">${lp} LP</span>`;
          container.appendChild(header);

          // Inhalt als Liste
          const ul = document.createElement('ul');
          inhalte.forEach(punkt => {
            const li = document.createElement('li');
            li.textContent = punkt;
            ul.appendChild(li);
          });
          container.appendChild(ul);

          const moreSpace = document.createElement('div');
          moreSpace.className = 'my-5';
          container.appendChild(moreSpace);
        });
    })
    .catch(error => {
      console.error('Fehler beim Laden der Modul-Inhalte:', error);
    });
}

function loadColoredHeading(type = 'success', targetId = null) {
  const texts = {
    success: "Für die Anerkennung des Moduls werden die folgenden inhaltlich äquivalenten Lehrveranstaltungen herangezogen:",
    orange: "Zur Anerkennung des Moduls können <b>keine</b> inhaltlich äquivalenten Lehrveranstaltungen herangezogen werden.",
    guest_module: "Dieses Modul soll im <b>Komplex Spezifikation</b> als Gast-Modul des Bereichs Informatik anerkannt werden.",
    project_seminar: "Offen, ob zur Anerkennung des Moduls die Werkstudententätigkeit herangezogen werden kann."
  };

  const colors = {
    success: "#198754",       // Bootstrap grün
    orange: "#fd7e14",        // Sattes Orange
    guest_module: "#198754",
    project_seminar: "#fd7e14"
  };

  const headingText = texts[type] || "";
  const color = colors[type] || "#6c757d"; // fallback grau

  const box = document.createElement('div');
  box.style.border = `1px solid ${color}`;
  box.style.backgroundColor = `${hexToRGBA(color, 0.05)}`;
  box.style.padding = "0.75rem";
  box.style.borderRadius = "0.5rem";
  box.style.marginTop = "2rem";
  box.style.marginBottom = "2rem";

  const heading = document.createElement('h4');
  heading.style.color = color;
  heading.innerHTML = headingText;
  box.appendChild(heading);

  const moreSpace = document.createElement('div');
  moreSpace.className = 'my-5';

  const target = document.getElementById(targetId);
  if (target) {
    target.appendChild(box);
    target.appendChild(moreSpace);
  }

  // Hilfsfunktion: Hex zu RGBA konvertieren
  function hexToRGBA(hex, alpha = 1) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

