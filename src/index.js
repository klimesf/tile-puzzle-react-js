import React from 'react';
import ReactDOM from 'react-dom';
import Game from './ui/Game.react.js';
import TilePuzzle from './model/TilePuzzle.js';

let puzzle = new TilePuzzle;
puzzle.init();

ReactDOM.render(
    <Game puzzle={puzzle}/>,
    document.getElementById('game')
);
