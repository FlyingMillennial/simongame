import React from 'react';
import {inject, observer} from 'mobx-react';

class SimonButton extends React.Component {
    
    handleClick = () => {
        this.props.simonGameStore.inputColor(this.props.color);
    }
    
    render() {

        let store = this.props.simonGameStore;
        let buttonLit = store.buttonLit === this.props.color;
        let classString = "simonButton " + this.props.color;
        classString += buttonLit ? " active" : "";

        return (
            <button 
                key={this.props.key} 
                onClick={this.handleClick} 
                disabled={!store.inputMode} 
                className={classString}> 
                
            </button>
        )
    }
}

export default inject('simonGameStore')(observer(SimonButton));