{
  feather.replace()
}

{
  const buttonPrintScreen = document.querySelector('.ltco_printscreen');

  buttonPrintScreen.addEventListener('click', ltcoPrintScreen);

  function ltcoClearDynamicLink(el) {
    if (!el) return;

    document.body.removeChild(el)
  }

  function ltcoDownloadImage(uri, name) {
    const link = document.createElement('a');

    link.download = name;
    link.href = uri;

    document.body.appendChild(link);

    link.click();

    ltcoClearDynamicLink(link);
  }

  function ltcoPrintScreen() {
    const optionsCanvas = {
      width: 700,
      windowWidth: 700
    };

    html2canvas(document.body, optionsCanvas).then(function(canvas) {
      const myImage = canvas.toDataURL('image/jpeg', 1);

      ltcoDownloadImage(myImage, `${Date.now()}_schedules_ctft.jpg`);
    });
  }
}
