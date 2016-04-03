export default class Tile {

    /**
     * Constructor.
     * @param {number|null} number
     */
    constructor(number) {
        this.number = number;
        this.tilePosition = null;
        this.onSwitch = [];
    }

    /**
     * Sets TilePosition.
     * @param {TilePosition} tilePosition
     */
    setPosition(tilePosition) {
        this.tilePosition = tilePosition;
    }

    /**
     * Is the Tile empty?
     * @returns {boolean}
     */
    isEmpty() {
        return this.number == null;
    }

    /**
     * Switches positions between tiles.
     * @param {Tile} tile
     */
    switchPositions(tile) {
        if (this.isEmpty() || tile.isEmpty()) {
            let temp = this.tilePosition;
            this.setPosition(tile.tilePosition);
            tile.setPosition(temp);
        } else {
            throw "Cannot switch non-empty tiles."
        }
    }

    /**
     * Adds onSwitch listener.
     * @param {TilePuzzle} listener
     */
    addOnSwitchListener(listener) {
        this.onSwitch.push(listener);
    }

    /**
     *
     */
    switchTile() {
        this.onSwitch.forEach((listener) => {
           listener.switchTiles(this);
        });
    }

}
