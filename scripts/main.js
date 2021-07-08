feather.replace();{var ltcoPrintScreen=function(){html2canvas(document.body,{width:700,windowWidth:700}).then(function(a){var b=a.toDataURL('image/jpeg',.5);ltcoSendWhatsApp(b)})},ltcoSendWhatsApp=function(a){window.open('whatsapp://send?text='+encodeURIComponent(a),'_blank')},buttonPrintScreen=document.querySelector('.ltco_printscreen'),wrapperTest=document.querySelector('#root');/* function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
  } */buttonPrintScreen.addEventListener('click',ltcoPrintScreen)}