function NoteViewAssistant() { };


/* The models for widgets in this scene. */
NoteViewAssistant.prototype.models = { 
  txtTitle : { value : null, disabled : true },
  txtNote : { value : null },
  cmdMenu : { 
    items : [
      { label : "Save", command : "save" },
      { label : "eMail", command : "eMail" }
    ]
  }   
};


/**
 * Set up the scene.
 */
NoteViewAssistant.prototype.setup = function() {

  // Setup varies dependingon whether we're editing an existing note or
  // adding a new one.
  if (NoteTaker.currentNote) {
    this.models.txtTitle.value = NoteTaker.currentNote.title;
    this.models.txtNote.value = NoteTaker.currentNote.note;
    this.models.txtTitle.disabled = true;
  } else {
    this.models.txtTitle.value = "";
    this.models.txtNote.value = "";
    this.models.txtTitle.disabled = false;
  }

  // Set up the command menu.
  this.controller.setupWidget(Mojo.Menu.commandMenu, null, this.models.cmdMenu); 

  // Set up the two TextField widgets, one for title and one for the note text.
  this.controller.setupWidget("NoteView_txtTitle", 
    { focusMode : Mojo.Widget.focusSelectMode, autoFocus : true }, 
    this.models.txtTitle
  );
  this.controller.setupWidget("NoteView_txtNote", 
    { focusMode : Mojo.Widget.focusSelectMode, multiline : true }, 
    this.models.txtNote
  );

};


/**
 * Called when any item in the command menu is clicked.
 */
NoteViewAssistant.prototype.handleCommand = function(inEvent) {

  if (inEvent.type == Mojo.Event.command) {
    switch (inEvent.command) {

      case "save":

        // Make sure a title and note text were entered.
        if (this.models.txtTitle.value == null || 
          this.models.txtTitle.value.strip() == "") {
          Mojo.Controller.errorDialog("Please enter a title");
          return;          
        }
        if (this.models.txtNote.value == null || 
          this.models.txtNote.value.strip() == "") {
          Mojo.Controller.errorDialog("Please enter some note text");
          return;          
        }

        // Determine the correct SQL to use, based on whether this is an 
        // update or an addition.  Also determine the correct array of
        // parameters to be inserted into the SQL.      
        var sqlStatement = "INSERT INTO NOTES (title, note) values (?, ?); GO;";
        var paramsArray = 
          [ this.models.txtTitle.value, this.models.txtNote.value ];
        if (NoteTaker.currentNote) {
          sqlStatement = "UPDATE NOTES SET note=? WHERE title=?; GO;";
          paramsArray = 
            [ this.models.txtNote.value, this.models.txtTitle.value ];
        }
        
        // Execute the SQL.
        NoteTaker.execSQL({
          sql : sqlStatement,
          params : paramsArray,
          callback : function(inResults, inCallParams) {
            this.controller.stageController.popScene();
          }.bind(this)
        });

      break;
      
      case "eMail":
      
        // Use the ApplicationManager service to launch the eMail client.
        this.controller.serviceRequest("palm://com.palm.applicationManager", {
          method  : "launch",
          parameters : { id : "com.palm.app.email", params: {
            summary : "A note for you",
            text : 
              "Hello from NoteTaker!  Here is the note entitled '" +
              NoteTaker.currentNote.title + "':<br><br>" +
              NoteTaker.currentNote.note
          } }
        });      
      
      break;
           
    }
  }
  
};
