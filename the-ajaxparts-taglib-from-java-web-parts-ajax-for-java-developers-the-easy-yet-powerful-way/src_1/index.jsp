<%@ taglib prefix="ajax" uri="javawebparts/ajaxparts/taglib" %>

<html>
<head>
  <title>APT Example</title>
</head>

<body>

  <input type="button" value="Click me for AJAX"><ajax:event ajaxRef="MyFunctions/Button1" />
  <br><br>
  <div id="resultDiv"></div>

<ajax:enable />
</body>
</html>