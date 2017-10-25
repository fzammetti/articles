function StageAssistant() { };


/**
 * Set up the stage, and initialize the application's database in this case.
 */
StageAssistant.prototype.setup = function() {

  try {
    // Open and initialize the database.
    NoteTaker.initDB(
      function() { this.controller.pushScene("NoteList"); }.bind(this)
    );
  } catch (e) {
    // Display exception as an error message.  Note that the first scene
    // IS NOT pushed in this case, exposing the content of index.html.
    Mojo.Controller.errorDialog("initDB exception: " + e);
  }

};
