import React from 'react';

export default class Tile extends React.Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);
    }

    render() {
        let className = this.props.tile.isEmpty() ? "tile empty" : "tile";
        return <div className={className} onClick={this._handleClick}>{this.props.tile.number}</div>;
    }

    _handleClick() {
        this.props.tile.switchTile();
        this.props.game.onTileSwitch();
    }
}
