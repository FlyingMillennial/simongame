import React from 'react';
import {inject, observer} from 'mobx-react';
import Board from './Board.js';

class SimonGame extends React.Component {
    render() {

        let store = this.props.simonGameStore;

        return (
            <div>
                <Board />
                <hr />
                <StateMonitor 
                    gameRunning={store.gameRunning.toString()} 
                    inputMode={store.inputMode.toString()} 
                    outputMode={store.outputMode.toString()}
                    enteredSequence={store.enteredSequence.toString()}
                    currentSequence={store.currentSequence.toString()} 
                    currentPosition={store.currentPosition.toString()}
                    lastInputCorrect={store.lastInputCorrect.toString()} />
            </div>
        );
    }
}

const StateMonitor = (props) => {
    return (
        <ul>
            <li>Running: {props.gameRunning}</li>
            <li>Input: {props.inputMode}</li>
            <li>Output: {props.outputMode}</li>
            <li>enteredSequence: {props.enteredSequence}</li>
            <li>currentSequence: {props.currentSequence}</li>
            <li>currentPosition: {props.currentPosition}</li>
            <li>lastInputCorrect: {props.lastInputCorrect}</li>
        </ul>
    );
}

export default inject('simonGameStore')(observer(SimonGame));