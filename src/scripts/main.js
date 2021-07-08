{
  feather.replace()
}

{
  const buttonPrintScreen = document.querySelector('.ltco_printscreen');
  const wrapperTest = document.querySelector('#root');

  buttonPrintScreen.addEventListener('click', ltcoPrintScreen);

  function ltcoPrintScreen() {
    const optionsCanvas = {
      width: 700,
      windowWidth: 700
    };

    html2canvas(document.body, optionsCanvas).then(function(canvas) {
      var myImage = canvas.toDataURL('image/jpeg', 0.5);
      ltcoSendWhatsApp(myImage);
    });
  }

  function ltcoSendWhatsApp(uri) {
    window.open('whatsapp://send?text='+encodeURIComponent(uri), '_blank');
  }

  /* function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
  } */
}
