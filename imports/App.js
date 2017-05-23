import React from 'react';
import BoardContainer from './BoardContainer';

export default class App extends React.Component {
    constructor() {
        super();
        this.handleModeChange = this.handleModeChange.bind(this);
        this.state = {};
    }

    handleModeChange({target}) {
        const val = target.checked;
        this.setState({
            isDrawingMode: val
        })
    }

    render () {
        const { isDrawingMode } = this.state;
        const { session } = this.props.match.params;
        return <div>
            <BoardContainer isDrawingMode={isDrawingMode} session={session} />
            <label>
                <input type="checkbox" value={isDrawingMode} onChange={this.handleModeChange}/>
                freeDraw Mode
            </label>
        </div>
    }
}
