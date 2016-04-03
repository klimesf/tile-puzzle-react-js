import React from 'react';
import ReactDOM from 'react-dom';
import Game from './ui/Game.js';
import TileStorage from './model/TilePuzzle.js';

let tileStorage = new TileStorage;
tileStorage.init();

ReactDOM.render(
    <Game tileStorage={tileStorage}/>,
    document.getElementById('game')
);
