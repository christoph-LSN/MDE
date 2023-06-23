function exportAsPDF() {
  var element = document.getElementById('pdf-export');

  html2canvas(element).then(function(canvas) {
    var imgData = canvas.toDataURL('image/png');
    var pdf = new jsPDF();

    // Seitenverhältnis des PDFs
    var pdfAspectRatio = pdf.internal.pageSize.getWidth() / pdf.internal.pageSize.getHeight();

    // Seitenverhältnis des Canvas-Elements
    var canvasAspectRatio = canvas.width / canvas.height;

    var imgWidth, imgHeight;
    if (canvasAspectRatio < pdfAspectRatio) {
      imgWidth = pdf.internal.pageSize.getWidth();
      imgHeight = canvas.height * imgWidth / canvas.width;
    } else {
      imgHeight = pdf.internal.pageSize.getHeight();
      imgWidth = canvas.width * imgHeight / canvas.height;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('export.pdf');
  });
}
