// Funktion zum Exportieren der Seite als PDF
function exportAsPDF() {
  var pdf = new jsPDF();
  var element = document.body;

  html2canvas(element, { allowTaint: true, scale: 2 }).then(function(canvas) {
    var imageData = canvas.toDataURL("image/png");

    pdf.addImage(imageData, "PNG", 10, 10, 50, 20); // Größe für das Niedersachsen-Logo im Header

    pdf.setPageHeight(canvas.height + 40); // Add space for header and footer
    pdf.addPage();
    pdf.addImage(imageData, "PNG", 10, pdf.internal.pageSize.getHeight() - 30, 20, 20); // Add first QR code as footer
    pdf.addImage(imageData, "PNG", 40, pdf.internal.pageSize.getHeight() - 30, 20, 20); // Add second QR code as footer

    pdf.addPage();
    pdf.addImage(imageData, "PNG", 10, 10, canvas.width / 2, canvas.height / 2); // Größe des Bildes auf der zweiten Seite

    pdf.save("dashboard.pdf");
  });
}

// ...
