import React from 'react';
import Tile from './Tile.js';

export default class Row extends React.Component {
    render() {
        let tiles = [];
        this.props.tiles.forEach((tile) => {
            tiles.push(<Tile tile={tile} game={this.props.game} />);
        });
        return <div className="row">{tiles}</div>;
    }
}
