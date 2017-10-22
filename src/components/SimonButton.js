import React from 'react';
import {inject, observer} from 'mobx-react';

class SimonButton extends React.Component {
    
    handleClick = () => {
        this.props.simonGameStore.inputColor(this.props.color);
    }
    
    render() {
        return (
            <button key={this.props.key} onClick={this.handleClick}>
                {this.props.color}
            </button>
        )
    }
}

export default inject('simonGameStore')(observer(SimonButton));