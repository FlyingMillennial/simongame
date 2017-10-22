import {action, extendObservable} from 'mobx';
import _ from 'underscore';

export default function SimonGameStore() {
    
    //observables
    extendObservable(this, {
        currentSequence: ['red', 'red', 'yellow', 'blue'], //current sequence game is looking for
        enteredSequence: [], //current sequence player has entered
        currentPosition: 0, //integer value of the step the user is currenty at
        outputMode: false, //game is giving user info on what to enter
        inputMode: false, //user is pushing buttons
        gameRunning: false, //game is running
        buttonLit: '', //which color button is currently lit up
        timeRemaining: null, //how much time user has to push a button
        timeIntervalID: null, //save interval ID for running clock
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
    });

    /* 
    @function inputColor
    @description adds a color to the enteredSequence.
    @param:color what color to add.
    */
    this.inputColor = action('inputColor', (color) => {
        this.enteredSequence.push(color);
        if ( !this.compareSequences(this.currentPosition) ) {
            this.lastInputCorrect = false;
            this.gameRunning = false;
        }
        this.currentPosition++;
    });

    /*
    @function compareSequences
    @description check to see that the entered sequence 
    matches the current sequence.
    @param:position current position within the arrays to compare
    */
    this.compareSequences = action('compareSequences', (position) => {
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
    });

    /* 
    @function toggleTurn
    @description toggles game state between input and output mode
    */
    this.toggleTurn = action('toggleTurn', () => {
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