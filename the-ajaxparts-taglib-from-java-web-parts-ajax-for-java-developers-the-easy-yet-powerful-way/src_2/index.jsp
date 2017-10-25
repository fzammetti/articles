<%@ taglib prefix="ajax" uri="javawebparts/ajaxparts/taglib" %>

<html>
<head>
  <title>APT Example</title>
  <script>
    function customErrorHandler(ajCall) {
      alert("An error occurred, as expected.  Error was:\n\nCode : " +
        ajCall.xhr.status + "\n\n" + ajCall.xhr.statusText);
    }
  </script>
</head>

<body>

  Change select to fire AJAX event:<br><br>
  <select id="theSelect">
    <option value=""></option>
    <option value="result1.htm">result1.htm</option>
    <option value="result2.htm">result2.htm</option>
    <option value="result3.htm">result3.htm (will generate an error)</option>
  </select><ajax:event ajaxRef="MyFunctions/Select1" />
  <br><br>
  <div id="resultDiv"></div>

<ajax:enable />
</body>
</html>