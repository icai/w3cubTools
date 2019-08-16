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

declare const _w3cub_vueToReact: (a, b) => string;

declare const _ckeditor_ckeditor5BuildClassic: any;
declare const _ckeditor_ckeditor5React: any;
declare const html2canvas: any;

declare const transPinyin: (a) => string;

declare const window = {
  FileReader: any
};
