function customResponseHandler(ajCall, resParam) {

  var selectValue = document.getElementById("theSelect").value;
  var targetDiv = document.getElementById(resParam);
  if (selectValue == "result1.htm") {
    targetDiv.style.color = "#0000ff";
  } else if (selectValue == "result2.htm") {
    targetDiv.style.color = "#00ff00";
  } else {
    targetDiv.style.color = "#ff0000";
  }
  document.getElementById(resParam).innerHTML = ajCall.xhr.responseText;

}
ajaxPartsTaglib.regResHandler("MyFirstCustomResponseHandler", customResponseHandler);
