import React from 'react';
import Row from './Row.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.onTileSwitch.bind(this);
        this.state = {};
    }

    render() {
        let rows = [];
        this.props.tileStorage.toRows().forEach((row) => {
            rows.push(<Row tiles={row} game={this}/>);
        });
        let gameWonWrapper = this.props.tileStorage.win ?
            <div className="game-won-wrapper"><span>Congratulations, you have won!</span></div> : "";
        return <div className="game">{rows}{gameWonWrapper}</div>;
    }

    onTileSwitch() {
        this.forceUpdate();
    }
}
