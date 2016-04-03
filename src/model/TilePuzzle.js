import Tile from './Tile.js';
import TilePosition from './TilePosition.js';

export default class TilePuzzle {

    /**
     * Constructor.
     */
    constructor() {
        this.tiles = [];
        this.rows = [];
        this.win = false;

        this.TILES_PER_ROW = 4;
        this.TILES_NUMBER = 15;

        this.switchTiles.bind(this);
        this.init.bind(this);
        this.get.bind(this);
        this.toRows.bind(this);
    }

    /**
     * Initializes TilePuzzle game.
     */
    init() {
        for (let i = 1; i <= this.TILES_NUMBER; ++i) {
            let tile = new Tile(i);
            tile.addOnSwitchListener(this);
            this.tiles.push(tile);
        }
        this.tiles.push(new Tile(null)); // Empty tile

        this._shuffle();

        let rowNumber = 1;
        let rowPosition = 1;
        this.tiles.forEach((tile) => {
            tile.setPosition(new TilePosition(rowNumber, rowPosition++));
            if (rowPosition > this.TILES_PER_ROW) {
                rowPosition = 1;
                rowNumber++;
            }
        });
    }

    /**
     * Shuffles the tiles.
     * @private
     */
    _shuffle() {
        var j, x, i;
        for (i = this.tiles.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = this.tiles[i - 1];
            this.tiles[i - 1] = this.tiles[j];
            this.tiles[j] = x;
        }
    }

    /**
     * Returns array of all rows containing Tiles.
     * @returns {Array}
     */
    toRows() {
        let rows = [];
        let currentRow = [];
        let currentRowNumber = 1;
        this.tiles.forEach((tile) => {
            if (tile.tilePosition.rowNumber != currentRowNumber) {
                rows.push(currentRow);
                currentRow = [];
                currentRowNumber = tile.tilePosition.rowNumber;
            }
            currentRow.push(tile);
        });
        rows.push(currentRow);

        return rows;
    }

    /**
     * Returns tile with given rowNumber and rowPosition.
     * @param rowNumber
     * @param rowPosition
     * @returns {number|null}
     */
    get(rowNumber, rowPosition) {
        let index = this._getIndexForPosition(new TilePosition(rowNumber, rowPosition));
        return index < this.tiles.length && index >= 0 ? this.tiles[index] : null;
    }

    /**
     * Switches given tile with empty tile in its neighborhood.
     * If there isn't the empty tile nearby, nothing happens.
     * Checks for win conditions after switching.
     * @param {Tile} tile
     */
    switchTiles(tile) {
        let otherTile = null;
        let otherTilePositions = [
            new TilePosition(tile.tilePosition.rowNumber + 1, tile.tilePosition.rowPosition),
            new TilePosition(tile.tilePosition.rowNumber, tile.tilePosition.rowPosition + 1),
            new TilePosition(tile.tilePosition.rowNumber - 1, tile.tilePosition.rowPosition),
            new TilePosition(tile.tilePosition.rowNumber, tile.tilePosition.rowPosition - 1)
        ];
        while (otherTilePositions.length > 0 && !otherTile) {
            let otherTilePosition = otherTilePositions.shift();
            otherTile = this.get(otherTilePosition.rowNumber, otherTilePosition.rowPosition);
            if (otherTile && !otherTile.isEmpty()) {
                otherTile = null;
            }
        }
        if (otherTile) {
            let otherTilePosition = this._getIndexForPosition(otherTile.tilePosition);
            let tilePosition = this._getIndexForPosition(tile.tilePosition);
            this.tiles[otherTilePosition] = tile;
            this.tiles[tilePosition] = otherTile;
            tile.switchPositions(otherTile);
            this._checkWin();
        }
    }

    /**
     * Return index in tiles for TilePosition.
     * @param {TilePosition} tilePosition
     * @returns {number}
     * @private
     */
    _getIndexForPosition(tilePosition) {
        return (tilePosition.rowNumber - 1) * this.TILES_PER_ROW + (tilePosition.rowPosition - 1);
    }

    /**
     * Checks win conditions.
     * If all the tiles are in numerically ascending order, the player wins.
     * @private
     */
    _checkWin() {
        let lastNumber = 0;

        for (let i = 0; i < this.tiles.length; ++i) {
            let tile = this.tiles[i];
            if (tile.number != null) {
                if (tile.number > lastNumber) {
                    lastNumber = tile.number;
                } else {
                    return false;
                }
            }
        }
        this.win = true;
    }

}
