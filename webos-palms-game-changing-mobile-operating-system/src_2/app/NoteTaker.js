var NoteTaker = {

  /* Handle to the database used by the application. */
  db : null,
  
  /* The note object being updated (or null if adding a new one). */
  currentNote : null,
  
  /* Function called to open, initialize and create (if needed) the database. */
  initDB : function(inCallback) {

    // Try to open the database, caching the handle to it.
    NoteTaker.db = openDatabase("jsmag_NoteTaker", "", 
      "jsmag_NoteTaker", 65536);
    // Create the table, if needed.
    NoteTaker.execSQL({
      sql : "CREATE TABLE IF NOT EXISTS notes " +
        "(title TEXT PRIMARY KEY NOT NULL, note TEXT); GO;",
      params : [ ],
      callback : inCallback
    });
    
  },
  
  /* Execute an arbitrary SQL statement and handle errors that may occur. */
  execSQL : function(inCallParams) {
    
    // Some logging for debugging.
    Mojo.Log.info("sql = " + inCallParams.sql + "  ----  params = " + 
      inCallParams.params);
    
    try {

      NoteTaker.db.transaction((function (inTransaction) { 
        inTransaction.executeSql(inCallParams.sql, inCallParams.params,
          // If SQL returns results, process them.
          function(inTransaction, inResultSet) {
            var results = [ ];
            if (inResultSet.rows) {
              for (var i = 0; i < inResultSet.rows.length; i++) {
                results.push(inResultSet.rows.item(i));
              }            
            }
            // Call the callback specified in inCallParams.
            inCallParams.callback(results, inCallParams);
          },  
          function(inTransaction, inError) {
            // Display an error message on errors.
            Mojo.Controller.errorDialog(
              "execSQL error: " + inError.code + " - " + inError.message
            );          
          }
        ); 
      }));
    
    } catch (e) {
      // Display an error message on exceptions.
      Mojo.Controller.errorDialog("execSQL exception: " + e);
    }
          
  }
  
};
