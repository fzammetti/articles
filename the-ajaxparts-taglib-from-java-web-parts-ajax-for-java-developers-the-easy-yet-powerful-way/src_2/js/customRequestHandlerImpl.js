function customRequestHandler(evtDef) {

  var selectValue = document.getElementById("theSelect").value;
  if (selectValue != "") {
    evtDef.targURI = selectValue;
    ajaxPartsTaglib.ajaxRequestSender(evtDef, null, null, null, null, null);
  }

}
ajaxPartsTaglib.regReqHandler("MyFirstCustomRequestHandler", customRequestHandler);
