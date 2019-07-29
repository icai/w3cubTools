declare module "@workers/prettier.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@workers/svgo.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@workers/babel.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@workers/postcss.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@workers/graphql.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "@workers/svgr.worker" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "*.md";

declare module "*.wiki";

declare const IN_BROWSER: boolean;
declare const IS_DEV: boolean;
declare const __HASHVERSION__: string;

declare const __CLIENT__: boolean;
declare const __DEV__: boolean;
declare const importScripts: void;
declare const Babel;
declare const CryptoJS;
declare const $;

declare const saveAs: (a, b) => void;
