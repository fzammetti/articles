/**
 * The main scene for the application.
 */
function MainAssistant() { }


/**
 * Set up this scene.
 */
MainAssistant.prototype.setup = function() {

  // We're greedy, we want the whole screen!
  this.controller.enableFullScreenMode(true);

  // Give the game object a reference to this assistant for dialogs and such.
  game.mainAssistant = this;

}; /* End setup(). */


/**
 * Activate this scene.
 */
MainAssistant.prototype.activate = function() {

  // Initialize the game class.  Do this first so everything downstream that
  // depends on it is good to go.
  game.init();

  // Get a reference to the 2D context of the canvas.
  if (game.screenHeight == 400) {
    $("mainCanvas400").style.display = "block";
    game.ctx = $("mainCanvas400").getContext("2d");
  } else if (game.screenHeight == 480) {
    $("mainCanvas480").style.display = "block";
    game.ctx = $("mainCanvas480").getContext("2d");
  }

  // Set up key and tap event handlers.
  Mojo.Event.listen(this.controller.document, Mojo.Event.keydown,
    game.keyDownBind, true);
  Mojo.Event.listen(this.controller.document, Mojo.Event.keyup,
    game.keyUpBind, true);
  Mojo.Event.listen(this.controller.document, Mojo.Event.tap,
    game.tapHandlerBind, true);

  // Set up orientation change event handler.
  this.controller.listen(this.controller.document, "orientationchange",
    game.orientationChangeBind, true
  );

  // Handle stage activate and deactivate for pausing.
  this.controller.listen(this.controller.document, Mojo.Event.stageActivate,
    game.stageActivateBind, true
  );
  this.controller.listen(this.controller.document, Mojo.Event.stageDeactivate,
    game.stageDeactivateBind, true
  );

  // Show instructions dialog to really kick things off.
  game.dialog = game.mainAssistant.controller.showDialog({
    template : "instructions-dialog",
    assistant : new InstructionsAssistant(),
    preventCancel : true
  });

}; /* End activate(). */


