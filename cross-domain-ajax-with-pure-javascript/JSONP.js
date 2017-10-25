/**
 * JSONP makes JSON-P requests and does so with a timeout mechanism so you'll
 * always know whether the request was successful or not.
 */
var JSONP = {

  /* Amount of time in seconds before a request is considered timed out. */
  timeoutSeconds : 5,

  /* Reference to the document's head tag. */
  headTag : document.getElementsByTagName("head").item(0),

  /* Collection of objects, one for each in-flight request. */
  requestObjects : { },

  /**
   * Call this method to fire off a JSON-P request.
   *
   * @param inConfig An object containing whatever parameters are needed to
   * make the remote call.  The attributes of this object are used to construct
   * a query string.
   */
  request : function(inConfig) {

    // Create unique ID for request.
    var requestID = "req_" + new Date().getTime();

    // Create request object and populate with internal data.
    var requestObject = { };
    requestObject.requestID = requestID;
    requestObject.callback = function(inResponse) {
      JSONP.callback(requestID, inResponse);
    };
    requestObject.realCallback = inConfig.callback;
    requestObject.onTimeout = inConfig.onTimeout;
    inConfig.callback = "JSONP.requestObjects." + requestID + ".callback";

    // Add query string to URL.
    if (inConfig.url.charAt(inConfig.url.length - 1) != "?") {
      inConfig.url += "?";
    }
    var queryString = "";
    for (var attribute in inConfig) {
      var alc = attribute.toLowerCase();
      if (alc != "url" && alc != "ontimeout") {
        if (queryString != "") {
          queryString += "&";
        }
        queryString += attribute + "=" + inConfig[attribute];
      }
    }
    inConfig.url += queryString;
    requestObject.inConfig = inConfig;

    // Now create the script tag for this request.
    var scriptTag = document.createElement("script");
    requestObject.scriptTag = scriptTag;
    scriptTag.setAttribute("src", inConfig.url);
    scriptTag.setAttribute("type", "text/javascript");

    // Now create the timeout.
    requestObject.timeout = setTimeout(function() {
      JSONP.timeoutElapsed(requestID);
    }, this.timeoutSeconds * 1000);

    // Kick off the request.
    this.headTag.appendChild(scriptTag);

    // Finally, put the requestObject in the collection.
    this.requestObjects[requestID] = requestObject;

  },

  /**
   * Internal intermediary callback that the JSON-P request calls.
   *
   * @param inRequestID The ID associated with the requestObject.
   * @param inResponse  The response from the remote server.
   */
  callback : function(inRequestID, inResponse) {

    // Get the request object associated with this request.
    var requestObject = JSONP.requestObjects[inRequestID];

    // Might not have a request object, if the request comes back after the
    // timeout period.
    if (requestObject) {
      // Clear the timeout so the request doesn't time out.
      clearTimeout(requestObject.timeout);
      // Call the specified callback.
      requestObject.realCallback(inResponse);
      // Delete the request object.
      delete JSONP.requestObjects[inRequestID];
    }

  },

  /**
   * This is called when a request timeout occurs.
   *
   * @param inRequestID The ID associated with the requestObject.
   */
  timeoutElapsed : function(inRequestID) {

    // Get the request object associated with this request.
    var requestObject = JSONP.requestObjects[inRequestID];

    // There should never be a case where there is no requestObject here,
    // but we'll check for it anyway, just in case I missed something.
    if (requestObject) {
      // Copy pertinent attributes of requestObject to a new object.
      var newRequestObject = { };
      newRequestObject.requestID = requestObject.requestID;
      newRequestObject.inConfig = { };
      for (var i in requestObject.inConfig) {
        newRequestObject.inConfig[i] = requestObject.inConfig[i];
      }
      // Delete the request object, but get onTimeout first.
      var onTimeout = requestObject.onTimeout;
      delete JSONP.requestObjects[inRequestID];
      // Now call the real timeout handler, if any.
      if (onTimeout) {
        onTimeout(newRequestObject);
      }
    }

  },

}; // End JSONP.