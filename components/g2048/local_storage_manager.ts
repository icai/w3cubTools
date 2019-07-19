const fakeStorage = {
  _data: {},
  setItem: function(id: string | number, val: any) {
    return (this._data[id] = String(val));
  },

  getItem: function(id: string | number) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function(id: string | number) {
    return delete this._data[id];
  },

  clear: function() {
    return (this._data = {});
  }
};

export default class LocalStorageManager {
  bestScoreKey: string;
  gameStateKey: string;
  storage:
    | Storage
    | {
        _data: {};
        setItem: (id: any, val: any) => string;
        getItem: (id: any) => any;
        removeItem: (id: any) => boolean;
        clear: () => {};
      };
  constructor() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";

    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : fakeStorage;
  }

  localStorageSupported() {
    var testKey = "test";
    var storage = window.localStorage;

    try {
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Best score getters/setters
  getBestScore() {
    return this.storage.getItem(this.bestScoreKey) || 0;
  }

  setBestScore(score: string) {
    this.storage.setItem(this.bestScoreKey, score);
  }

  // Game state getters/setters and clearing
  getGameState() {
    var stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
  }

  setGameState(gameState: {
    grid: any;
    score: any;
    over: boolean;
    won: boolean;
    keepPlaying: () => void;
  }) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  }

  clearGameState() {
    this.storage.removeItem(this.gameStateKey);
  }
}
