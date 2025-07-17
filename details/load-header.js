// load-header.js
function loadPageHeader(pfad = '../header.html') {
  const header = document.createElement('div');
  header.id = 'page-header';
  document.body.insertBefore(header, document.body.firstChild);

  fetch(pfad)
    .then(response => response.text())
    .then(data => {
      header.innerHTML = data;
    })
    .catch(error => {
      console.error('Fehler beim Laden des Headers:', error);
    });
}
