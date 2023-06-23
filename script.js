// Funktion zum Exportieren der Seite als PDF
function exportAsPDF() {
  var pdf = new jsPDF('p', 'mm', 'a4');
  var element = document.body;

  html2canvas(element, { allowTaint: true }).then(function(canvas) {
    var imageData = canvas.toDataURL("image/png");

    pdf.addImage(imageData, "PNG", 10, 10, 190, 277); // Größe des Bildes auf der ersten Seite

    pdf.save("dashboard.pdf");
  });
}

// ...
