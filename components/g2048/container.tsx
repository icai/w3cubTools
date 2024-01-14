// @ts-ignore
import React, { Component } from "react";
import Heading from "./heading";
import AboveGame from "./above-game";
import GameContainer from "./game-container";
import StorageManager from "./local_storage_manager";
import KeyboardInputManager from "./keyboard_input_manager";
import Grid from "./grid";
import { Tile } from "./tile";

let storageManager;
if (typeof window !== "undefined") {
  storageManager = new StorageManager();
}

export default class Container extends Component<any, any> {
  inputManager: any;
  won: boolean;
  over: boolean;
  grid: any;
  score: any;
  keepPlaying: any;
  [x: string]: any;
  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.restart = this.restart.bind(this);
    this.keepPlayingfn = this.keepPlayingfn.bind(this);
  }
  componentWillMount() {
    typeof window !== "undefined" && this.setup();
  }
  componentDidMount() {
    this.inputManager = new KeyboardInputManager();
    this.inputManager.on("move", this.move);
    this.inputManager.on("restart", this.restart);
    this.inputManager.on("keepPlaying", this.keepPlayingfn);
  }

  render() {
    return (
      <div className="g-container">
        {typeof window !== "undefined" && (
          <>
            <Heading score={this.state.score} best={this.state.best} />
            <AboveGame />
            <GameContainer
              size={this.props.size}
              tiles={this.state.tiles}
              won={this.state.won}
              over={this.state.over}
            />
          </>
        )}
      </div>
    );
  }

  getRandomTiles() {
    var ret = [];
    for (var i = 0; i < this.props.startTiles; i++) {
      ret.push(this.getRandomTile());
    }
    return ret;
  }

  getRandomTile() {
    var value = Math.random() < 0.9 ? 2 : 4;
    var pos = this.grid.randomAvailableCell();
    var tile = new Tile(pos, value);
    this.grid.insertTile(tile);
    return {
      value: value,
      x: pos.x,
      y: pos.y,
      prog: tile.prog
    };
  }

  continueGame() {
    this.won = false;
    this.over = false;
    // this.setState({won: this.won, over: this.over});
  }

  restart() {
    storageManager.clearGameState();
    this.continueGame(); // Clear the game won/lost message
    this.setup();
  }

  // Keep playing after winning (allows going over 2048)
  keepPlayingfn() {
    this.keepPlaying = true;
    this.continueGame(); // Clear the game won/lost message
  }

  // Return true if the game is lost, or has won and the user hasn't kept playing
  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  // Set up the game
  setup() {
    var previousState = storageManager.getGameState();

    // Reload the game from a previous game if present
    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells); // Reload grid
      this.score = previousState.score;
      this.over = previousState.over;
      this.won = previousState.won;
      this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid = new Grid(this.props.size);
      this.score = 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;
    }
    this.setState({
      score: this.score,
      best: storageManager.getBestScore(),
      tiles: this.getRandomTiles(),
      over: this.over,
      won: this.won
    });
  }

  // Set up the initial tiles to start the game with
  addStartTiles() {
    for (var i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  // Adds a tile in a random position
  addRandomTile() {
    if (this.grid.cellsAvailable()) {
      var value = Math.random() < 0.9 ? 2 : 4;
      var tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  // Sends the updated grid to the actuator
  actuate() {
    // Clear the state when the game is over (game over only, not win)
    if (this.over) {
      storageManager.clearGameState();
    } else {
      storageManager.setGameState(this.serialize());
    }

    // this.actuator.actuate(this.grid, {
    //   score:      this.score,
    //   over:       this.over,
    //   won:        this.won,
    //   bestScore:  storageManager.getBestScore(),
    //   terminated: this.isGameTerminated()
    // });

    var tiles: { x: any; y: any; value: any; prog: any }[] = [];
    this.grid.cells.forEach(function(column: {
      forEach: (arg0: (cell: any) => void) => void;
    }) {
      column.forEach(function(cell: { x: any; y: any; value: any; prog: any }) {
        if (cell) {
          // @ts-ignore
          tiles.push({
            x: cell.x,
            y: cell.y,
            value: cell.value,
            prog: cell.prog
          });
        }
      });
    });

    if (storageManager.getBestScore() < this.score) {
      storageManager.setBestScore(this.score);
      this.setState({
        score: this.score,
        best: this.score,
        tiles: tiles,
        won: this.won,
        over: this.over
      });
    } else {
      this.setState({
        score: this.score,
        tiles: tiles,
        won: this.won,
        over: this.over
      });
    }
  }

  // Represent the current game as an object
  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying
    };
  }

  // Save all tile positions and remove merger info
  prepareTiles() {
    this.grid.eachCell(function(
      // @ts-ignore
      x: any,
      // @ts-ignore
      y: any,
      tile: { mergedFrom: null; savePosition: () => void }
    ) {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  // Move a tile and its representation
  moveTile(
    tile: {
      x: string | number;
      y: string | number;
      updatePosition: (arg0: any) => void;
    },
    cell: { x: string | number; y: string | number }
  ) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  // Move tiles on the grid in the specified direction
  move(direction: any) {
    // 0: up, 1: right, 2: down, 3: left
    var self = this;

    if (this.isGameTerminated()) return; // Don't do anything if the game's over

    var cell, tile;

    var vector = this.getVector(direction);
    var traversals = this.buildTraversals(vector);
    var moved = false;

    // Save the current tile positions and remove merger information
    this.prepareTiles();
    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function(x) {
      traversals.y.forEach(function(y) {
        cell = { x: x, y: y };
        tile = self.grid.cellContent(cell);

        if (tile) {
          var positions = self.findFarthestPosition(cell, vector);
          var next = self.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            var merged = new Tile(positions.next, tile.value * 2);
            // @ts-ignore
            merged.mergedFrom = [tile, next];

            self.grid.insertTile(merged);
            self.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            self.score += merged.value;

            // The mighty 2048 tile
            if (merged.value === 2048) self.won = true;
          } else {
            self.moveTile(tile, positions.farthest);
          }

          if (!self.positionsEqual(cell, tile)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();

      if (!this.movesAvailable()) {
        this.over = true; // Game over!
      }

      this.actuate();
    }
  }

  // Get the vector representing the chosen direction
  getVector(direction: number) {
    // Vectors representing tile movement
    var map = {
      0: { x: 0, y: -1 }, // Up
      1: { x: 1, y: 0 }, // Right
      2: { x: 0, y: 1 }, // Down
      3: { x: -1, y: 0 } // Left
    };

    return map[direction];
  }

  // Build a list of positions to traverse in the right order
  buildTraversals(vector: { x: number; y: number }) {
    var traversals = { x: [], y: [] };

    for (var pos = 0; pos < this.props.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(
    cell: { x: any; y: any },
    vector: { x: string | number; y: string | number }
  ) {
    var previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell // Used to check if a merge is required
    };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  // Check for available matches between tiles (more expensive check)
  tileMatchesAvailable() {
    var self = this;

    var tile;

    for (var x = 0; x < this.props.size; x++) {
      for (var y = 0; y < this.props.size; y++) {
        tile = this.grid.cellContent({ x: x, y: y });

        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = self.getVector(direction);
            var cell = { x: x + vector.x, y: y + vector.y };

            var other = self.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  positionsEqual(first: { x: any; y: any }, second: { x: any; y: any }) {
    return first.x === second.x && first.y === second.y;
  }
}
