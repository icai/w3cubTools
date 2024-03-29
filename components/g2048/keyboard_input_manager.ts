class KeyboardInputManager {
  events: {
    [x: string]: any;
  };
  eventTouchstart: string;
  eventTouchmove: string;
  eventTouchend: string;
  [x: string]: {};
  constructor() {
    this.events = {};
    // @ts-ignore
    if (window.navigator.msPointerEnabled) {
      //Internet Explorer 10 style
      this.eventTouchstart = "MSPointerDown";
      this.eventTouchmove = "MSPointerMove";
      this.eventTouchend = "MSPointerUp";
    } else {
      this.eventTouchstart = "touchstart";
      this.eventTouchmove = "touchmove";
      this.eventTouchend = "touchend";
    }
    this.listen();
  }
  on(event: string | number, callback: any) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event: string, data?: number | undefined) {
    var callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function(callback: (arg0: any) => void) {
        callback(data);
      });
    }
  }

  listen() {
    var self = this;

    var map = {
      38: 0, // Up
      39: 1, // Right
      40: 2, // Down
      37: 3, // Left
      75: 0, // Vim up
      76: 1, // Vim right
      74: 2, // Vim down
      72: 3, // Vim left
      87: 0, // W
      68: 1, // D
      83: 2, // S
      65: 3 // A
    } as any;

    // Respond to direction keys
    document.addEventListener("keydown", function(event) {
      var modifiers =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      var mapped = map[event.which];

      if (!modifiers) {
        if (mapped !== undefined) {
          event.preventDefault();
          self.emit("move", mapped);
        }
      }

      // R key restarts the game
      if (!modifiers && event.which === 82) {
        self.restart.call(self, event);
      }
    });

    // Respond to button presses
    this.bindButtonPress(".retry-button", this.restart);
    this.bindButtonPress(".restart-button", this.restart);
    this.bindButtonPress(".keep-playing-button", this.keepPlaying);

    // Respond to swipe events
    var touchStartClientX: number, touchStartClientY: number;
    var gameContainer = document.getElementsByClassName("game-container")[0];

    gameContainer.addEventListener(this.eventTouchstart, function(event: any) {
      // @ts-ignore
      if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
        event.targetTouches.length > 1
      ) {
        return; // Ignore if touching with more than 1 finger
      }

      // @ts-ignore
      if (window.navigator.msPointerEnabled) {
        touchStartClientX = event.pageX;
        touchStartClientY = event.pageY;
      } else {
        touchStartClientX = event.touches[0].clientY;
        touchStartClientY = event.touches[0].clientY;
      }

      event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchmove, function(event: {
      preventDefault: () => void;
    }) {
      event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchend, function(event: any) {
      // @ts-ignore
      if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
        event.targetTouches.length > 0
      ) {
        return; // Ignore if still touching with one or more fingers
      }

      var touchEndClientX, touchEndClientY;

      // @ts-ignore

      if (window.navigator.msPointerEnabled) {
        touchEndClientX = event.pageX;
        touchEndClientY = event.pageY;
      } else {
        touchEndClientX = event.changedTouches[0].clientY;
        touchEndClientY = event.changedTouches[0].clientY;
      }

      var dx = touchEndClientX - touchStartClientX;
      var absDx = Math.abs(dx);

      var dy = touchEndClientY - touchStartClientY;
      var absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) > 10) {
        // (right : left) : (down : up)
        self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
      }
    });
  }

  restart(event: { preventDefault: () => void }) {
    event.preventDefault();
    this.emit("restart");
  }

  keepPlaying(event: { preventDefault: () => void }) {
    event.preventDefault();
    this.emit("keepPlaying");
  }

  bindButtonPress(
    selector: string,
    fn: {
      (event: any): void;
      (event: any): void;
      (event: any): void;
      bind?: any;
    }
  ) {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener("click", fn.bind(this));
      button.addEventListener(this.eventTouchend, fn.bind(this));
    }
  }
}

export default KeyboardInputManager;
