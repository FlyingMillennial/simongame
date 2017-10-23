import React from 'react';
import SimonButton from './SimonButton.js';
import {inject, observer} from 'mobx-react';

class Board extends React.Component {

    render() {
        
        let store = this.props.simonGameStore;

        let finishInput = () => {
            store.updateSequence();
            store.displaySequence();
        }

        return (
            <div className="buttonContainer">
                {store.colors.map( (color, i) =>
                    <SimonButton key={i} color={color} />
                )}
                <button 
                    onClick={store.checkGameRunning ? finishInput : store.startGame}
                    disabled={store.outputMode}
                    className="mainButton">
                    {store.gameRunning ? "Finish Turn" : "Start Game"}
                </button>
            </div>
        )
    }
}

export default inject('simonGameStore')(observer(Board));