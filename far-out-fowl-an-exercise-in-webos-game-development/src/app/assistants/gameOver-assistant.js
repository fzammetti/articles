function GameOverAssistant() { };


/**
 * Set up the scene.
 */
GameOverAssistant.prototype.setup = function() {

  game.mainAssistant.controller.setupWidget("gameOver_btnNewGame", { },
    { label : "New Game", buttonClass : "palm-button affirmative" }
  );
  Mojo.Event.listen(game.mainAssistant.controller.get(
    "gameOver_btnNewGame"),
    Mojo.Event.tap, function() {
      game.dialog.mojo.close();
      game.startNewGame();
    }
  );

  game.mainAssistant.controller.setupWidget("gameOver_btnExit", { },
    { label : "Exit App", buttonClass : "palm-button negative" }
  );
  Mojo.Event.listen(game.mainAssistant.controller.get(
    "gameOver_btnExit"),
    Mojo.Event.tap, function() {
      window.close();
    }
  );

}; // End setup().


/**
 * Activate the scene.
 */
GameOverAssistant.prototype.activate = function() {

  $("gameOver_spanFinalScore").innerHTML = game.score;
  var highScoreCookie = new Mojo.Model.Cookie("Etherient_FarOutFowl_HighScore");
  var highScore = highScoreCookie.get();
  if (!highScore || game.score > highScore) {
    highScoreCookie.put(game.score);
    $("gameOver_divNewHighScore").show();
  }

}; // End setup().
