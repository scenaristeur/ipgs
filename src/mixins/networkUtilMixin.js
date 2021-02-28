

export default {

  methods: {

    nodeFromLabel(label) {
      return {id: "#"+label.trim().split(' ').join('_'),
      label: label,
      color: {  background: '#D2E5FF', border: '#2B7CE9'},
      shape: 'ellipse'}
    },
    edgeFromLabel(data){
      return { from: data.from, to: data.to, label: data.label}
    },
    downloadFile(){
      var contenu = this.content
      var format = this.format;
      console.log(contenu, format)
      var contentType = "";
      var fileNameToSaveAs = ""

      var filename = prompt("Choose a name for the exported file :", "Spoggy");
      //  app.$.inputMessage.value = '';
      if (filename == null || filename == "") {
        //let txt = "User cancelled the prompt.";
        return;
      }

      switch (format) {
        case 'json':
        contentType = 'application/json';
        fileNameToSaveAs = filename + ".json"; //Date.now() +
        break;
        case 'ttl':
        contentType = 'text/turtle';
        fileNameToSaveAs = filename + ".ttl"; //Date.now() +
        break;
        default:
        alert('Format de fichier non reconnu', format);
      }


      var textFileAsBlob = new Blob([contenu], {
        type: contentType
      }
    );
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if(navigator.userAgent.indexOf("Chrome") != -1)
    {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      //  console.log("CHROME");
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else
    {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      //  console.log("FF");
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.target="_blank";
      //downloadLink.onclick = destroyClickedElement;
      //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      //  console.log(app.$.popupTtl);
    }
    console.log(downloadLink);
    /*downloadLink.click();*/
    /* creation d'un event car download.click() ne fonctionne pas sous Firefox */
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click", true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
    );
    downloadLink.dispatchEvent(event);
    //  var app = this;
    setTimeout(function(){
      //  console.log(downloadLink.parentNode);
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadLink);
    }, 1000);
    /*if (window.URL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  } else {
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
}
downloadLink.click();*/
},
},

}
