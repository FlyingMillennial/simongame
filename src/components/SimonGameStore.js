import {action, extendObservable} from 'mobx';
import _ from 'underscore';

export default function SimonGameStore() {
    
    //observables
    extendObservable(this, {
        currentSequence: [], //current sequence game is looking for
        enteredSequence: [], //current sequence player has entered
        currentPosition: 0, //integer value of the step the user is currenty at
        outputMode: false, //game is giving user info on what to enter
        inputMode: false, //user is pushing buttons
        gameRunning: false, //game is running
        buttonLit: '', //which color button is currently lit up
        lastInputCorrect: true, //Was the last user input correct?
        colors: ['red', 'yellow', 'blue', 'green'] //the colors, duke, the colors!
    });

    /* 
    @function updateSequence
    @description adds a random color to the currentSequence.
    */
    this.updateSequence = action('updateSequence', () => {
        let newColor = _.sample(this.colors);
        this.currentSequence.push(newColor);
        this.enteredSequence.length = 0;
        this.currentPosition = 0;
    });

    /* 
    @function inputColor
    @description adds a color to the enteredSequence, and checks to see if it 
    matches currentSequence, ending the game if not.
    @param:color what color to add.
    */
    this.inputColor = action('inputColor', (color) => {
        this.enteredSequence.push(color);
        if ( !this.compareColors(this.currentPosition) ) {
            this.stopGame();
        }
        this.currentPosition++;
    });

    /*
    @function compareColors
    @description check to see that the entered sequence 
    matches the current sequence.
    @param:position current position within the arrays to compare
    */
    this.compareColors = action('compareSequences', (position) => {
        return this.currentSequence[position] === this.enteredSequence[position]; 
    });

    /* 
    @function startGame
    @description moves the game from a stopped to running state
    */
    this.startGame = action('startGame', () => {
        this.gameRunning = true;
        this.inputMode = false;
        this.outputMode = true;
        this.lastInputCorrect = true;
        this.updateSequence();
        this.displaySequence()
    });

    /* 
    @function displaySequence
    @description updates buttonLit with each color in the current sequence
    */
    this.displaySequence = action( () => {
        this.currentSequence.forEach( (color, i) => {
            let timeoutTime = (i+1) * 1500;

            //Light up the button
            setTimeout( () => {
                this.buttonLit = color;
            }, timeoutTime);

            //No light for a moment
            setTimeout( () => {
                this.buttonLit = null;
            }, timeoutTime - 500);

            //Toggle back to input mode after the final color is displayed
            if (i === this.currentSequence.length - 1) {
                setTimeout ( () => {
                    this.buttonLit = null;
                }, timeoutTime + 1500);
                setTimeout( () => {
                    this.toggleTurn();
                }, timeoutTime + 2000);
            }
        });
    });

    /*
    @function gameRunningCheck
    @description checks to see if the game is running
    */
    this.gameRunningCheck = action('checkGame', () => {
        if ( (!this.inputMode && !this.ouputMode) || !this.gameRunning ) {
            return false;
        } else {
            return true;
        }
    });

    /*
    @function stopGame
    @description turns off game booleans and clears sequences
    */
    this.stopGame = action('stopGame', () => {
        this.lastInputCorrect = false;
        this.currentSequence.length = 0;
        this.inputMode = false;
        this.outputMode = false;
        this.gameRunning = false;
    });

    /* 
    @function toggleTurn
    @description toggles game state between off, input, and output mode,
    clearing user input when switching from output to input.
    */
    this.toggleTurn = action('toggleTurn', () => {
        if (this.outputMode) {
            this.enteredSequence.length = 0;
        }
        this.inputMode = !this.inputMode;
        this.outputMode = !this.outputMode;
    });

    /* 
    @function updateButton 
    @description change which button is lit up
    @param:color string color name
    */
    this.updateButton = action('updateButton', (color) => {
        this.buttonLit = color;
    });

    /* 
    @function startTimer
    @description starts the button timer
    */
    this.startTimer = action('startTimer', () => {
        this.timeRemaining = 5;
        this.timeIntervalID = setInterval( () => {
            this.timeRemaining = this.timeRemaining - 1;
        }, 1000);
    });

}