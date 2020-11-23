$(document).ready(function () {


        //computer numbers need to be accessible to all our functions
        var num1;
        var num2;
        var num3;
        var num4;

        // object containing the validation rules
        var gameRules =
            {
                guess: {
                    required: true,
                    digits: true,
                    minlength: 4,
                    maxlength: 4
                }
            }

        // object containing the error messages
        var gameMessages =
            {
                guess: {
                    required: "Enter 4 digits from 1-9",
                    digits: "Please enter 4 digits",
                    minlength: "Enter 4 digits",
                    maxlength: "Enter 4 digits"
                }
            }

        // event handlers
        gameSetup();

        //when the new game button is pushed, run game setup
        $("#newGameButton").click(gameSetup);

        // pass the configuration to the form's validate() method
        // needs submitHandler, rules and message properties
        $("form").validate(
            {
                submitHandler: runMyGame,
                rules: gameRules,
                messages: gameMessages,
            });

        $("#showRules").click(function() {
            $("#rules").toggle();
        });
        $("#reveal").click(function() {
            $("#cheat").toggle();
        });



        //other functions
        function gameSetup() {
            //computer generates a set of 4 random numbers between 1 and 9
            //checks to make sure no numbers are duplicated
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
            num3 = Math.floor(Math.random() * 9) + 1;
            num4 = Math.floor(Math.random() * 9) + 1;

            while (num2 === num1) {
                num2 = Math.floor(Math.random() * 9) + 1;
            }

            while (num3 === num1 || num3 === num2) {
                num3 = Math.floor(Math.random() * 9) + 1;
            }

            while (num4 === num1 || num4 === num2 || num4 === num3) {
                num4 = Math.floor(Math.random() * 9) + 1;
            }
            //sets up our computer number in the cheating div
            var revealNumber = "" + num1 + "" + num2 + "" + num3 + "" + num4;
            $("#cheat").text(`You cheated! The answer was ${revealNumber}`);

            $("#guess").show();
            $("#guessButton").show();
            $("#newGameButton").hide();
            $("#cheat").hide();

            //reset text box
            $("input:text").val("");

            //reset the num guessed div to contain an empty string
            $("#numGuessed").text("");

            //reset the past guesses to contain empty list
            $("#pastGuesses li").remove();
        }


        function runMyGame() {

            //get player's guess  from the form
            var guess = $("#guess").val();

            //make them ints so we can compare easily with the computer's numbers
            var guess1 = parseInt(guess.charAt(0));
            var guess2 = parseInt(guess.charAt(1));
            var guess3 = parseInt(guess.charAt(2));
            var guess4 = parseInt(guess.charAt(3));

            var guessResult = "";
            var pastGuess = guess;
            var cow = "🐄";
            var bull = "🐂";

            //make sure the player did not enter the same number more than 1 time or enter a 0
            if(guess1 === 0 || guess2 === 0 || guess3 === 0 || guess4 === 0) {
                $("#zeroError").show();
            } else if (guess1 === guess2 || guess1 === guess3 || guess1 === guess4) {
                $("#error").show();
            } else if (guess2 === guess3 || guess2 === guess4) {
                $("#error").show();
            } else if (guess3 === guess4) {
                $("#error").show();
            } else {
                $("#error").hide();
                $("#zeroError").hide();

                //compare guesses with computer's numbers and display results
                if (guess1 === num1) {
                    //display bull
                    guessResult += bull;
                } else if (guess1 === num2 || guess1 === num3 || guess1 === num4) {
                    //display cow, cows go first
                    guessResult = cow + guessResult;
                }

                if (guess2 === num2) {
                    //display bull
                    guessResult += bull;
                } else if (guess2 === num1 || guess2 === num3 || guess2 === num4) {
                    //display cow, cows go first
                    guessResult = cow + guessResult;
                }

                if (guess3 === num3) {
                    //display bull
                    guessResult += bull;
                } else if (guess3 === num1 || guess3 === num2 || guess3 === num4) {
                    //display cow, cows go first
                    guessResult = cow + guessResult;
                }

                if (guess4 === num4) {
                    //display bull
                    guessResult += bull;
                } else if (guess4 === num1 || guess4 === num2 || guess4 === num3) {
                    //display cow, cows go first
                    guessResult = cow + guessResult;
                }

                //put guess results in div with id of results
                if (guessResult === "") {
                    guessResult = "No numbers match";
                    $("#numGuessed").text(`${guessResult}`)
                } else {
                    $("#numGuessed").text(`${guessResult}`);
                }
                var displayText = (`${pastGuess} - ${guessResult}`);

                //put guess and results in unordered list in div with id pastGuesses
                $("#pastGuesses ul").append($("<li>").text(displayText));

                if (guessResult === "🐂🐂🐂🐂") {
                    //game over, keep showing their guess and display victory message
                    $("#numGuessed").text(`You guessed it! The number was ${pastGuess}`)
                    //reset the text box
                    $("input:text").val("");
                    //turn off the ability to keep guessing
                    $("#guess").toggle();
                    $("#guessButton").toggle();
                    //turn on the ability to start a new game
                    $("#newGameButton").toggle();
                } else {
                    //reset the text box
                    $("input:text").val("");
                }
            }

        }

    }
);