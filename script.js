// Funktion zum Exportieren der Seite als PDF
function exportAsPDF() {
  var element = document.getElementById('pdf-export');

  html2canvas(element).then(function(canvas) {
    var imgData = canvas.toDataURL('image/png');
    var pdf = new jsPDF(); // Verwende die richtige Groß- und Kleinschreibung für jsPDF

    pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);

    // Tabelle exportieren
    var tableElement = document.getElementById('data-table1');
    var tableImgData = tableToImage(tableElement);
    pdf.addPage();
    pdf.addImage(tableImgData, 'PNG', 10, 10);

    pdf.save('export.pdf');
  });
}

// Hilfsfunktion zum Umwandeln einer Tabelle in ein Bild (Canvas-Daten-URL)
function tableToImage(tableElement) {
  var tableCanvas = document.createElement('canvas');
  tableCanvas.width = tableElement.offsetWidth;
  tableCanvas.height = tableElement.offsetHeight;

  var tableContext = tableCanvas.getContext('2d');
  tableContext.fillStyle = '#fff';
  tableContext.fillRect(0, 0, tableCanvas.width, tableCanvas.height);

  var tableImgData;
  html2canvas(tableElement).then(function(canvas) {
    tableContext.drawImage(canvas, 0, 0);
    tableImgData = tableCanvas.toDataURL('image/png');
  });

  return tableImgData;
}
