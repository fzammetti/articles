function NoteListAssistant() { };   


/* The models for widgets in this scene. */
NoteListAssistant.prototype.models = {
  lstNoteListModel : { items : [ ] } 
};


/**
 * Set up the scene.
 */
NoteListAssistant.prototype.setup = function() {

  // Set up the List widget.
  this.controller.setupWidget("NoteList_lstNoteList", {
    addItemLabel : "Add...",
    swipeToDelete : true,
    itemTemplate : "NoteList/list-item"
  }, this.models.lstNoteListModel);
  
  // Attach event handlers to List events.
  this.controller.listen("NoteList_lstNoteList", Mojo.Event.listTap, 
    this.selectNote);
  this.controller.listen("NoteList_lstNoteList", Mojo.Event.listAdd, 
    this.addNote);
  this.controller.listen("NoteList_lstNoteList", Mojo.Event.listDelete, 
    this.deleteNote);

};


/**
 * Activate the scene.  This is where the List is populated.
 */
NoteListAssistant.prototype.activate = function() {
        
  // Execute SQL query to get a list of notes.
  NoteTaker.execSQL({
    sql : "SELECT * FROM notes ORDER BY title; GO;",
    params : [ ],
    callback : function(inResults, inTransaction) {
      // Update the model of the List. 
      this.models.lstNoteListModel.items = [ ];
      for (var i = 0; i < inResults.length; i++) {
        this.models.lstNoteListModel.items.push(inResults[i]);
      }
      // Notify the controller of changes so the screen is updated.
      this.controller.modelChanged(this.models.lstNoteListModel);
    }.bind(this)
  });
  
};


/**
 * Called when an existing note is selected for updating.
 */
NoteListAssistant.prototype.selectNote = function(inEvent) {

  // Store reference to note object and push the NoteView scene.
  NoteTaker.currentNote = inEvent.item;
  Mojo.Controller.stageController.pushScene("NoteView");
  
};


/**
 * Called when the Add option is tapped in the List.
 */
NoteListAssistant.prototype.addNote = function() {

  NoteTaker.currentNote = null;
  Mojo.Controller.stageController.pushScene("NoteView");
  
};


/**
 * Called when a note in the List is swipped and delete is confirmed.
 */
NoteListAssistant.prototype.deleteNote = function(inEvent) {

  // Execute the deletion SQL.
  NoteTaker.execSQL({
    sql : "DELETE FROM notes WHERE title=?; GO;",
    params : [ inEvent.item.title ],
    callback : function(inResults, inTransaction) { } 
  });
  
};
