import React from 'react';
import SimonButton from './SimonButton.js';
import {inject, observer} from 'mobx-react';

class Board extends React.Component {

    render() {
        
        let store = this.props.simonGameStore;

        let displayNewSequence = () => {
            store.updateSequence();
            store.currentSequence.forEach( (color, i) => {
                let timoutTime = (i+1) * 1000;
                setTimeout( () => {
                    console.log(color);
                }, timoutTime);
            });
        }

        return (
            <div>
                {store.colors.map( (color, i) =>
                    <SimonButton key={i} color={color} />
                )}
                <button onClick={displayNewSequence}>Update Sequence</button>
            </div>
        )
    }
}

export default inject('simonGameStore')(observer(Board));