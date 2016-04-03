# tile-puzzle-react-js
Tile Puzzle implemented in ReactJS.


## Solvability issues
Not all configurations of the game are solvable, so don't worry.
Here, have some [computer science](https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html) behind tile puzzle.

## Screenshots
### Fresh puzzle
![Fresh puzzle](https://github.com/klimesf/tile-puzzle-react-js/blob/master/doc/img/fresh.png)
### Solved puzzle
![Solved puzzle](https://github.com/klimesf/tile-puzzle-react-js/blob/master/doc/img/solved.png)

## Installation

Clone the GitHub repo and install with `npm`. Then run webpack & feel free to tinker!

```
npm install
webpack --watch
```

## Run

You can use `webpack-dev-server` to run the puzzle.

```
npm install webpack-dev-server -g
webpack-dev-server --content-base dist/
```

Then just navigate to `localhost:8080`.
