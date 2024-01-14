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

declare module "*.json";

declare const importScripts: void;
declare const Babel;
declare const CryptoJS;
declare const $;

declare const saveAs: (a, b) => void;

declare const _w3cub_vueToReact: (a, b) => string;

declare const _w3cub_reactToVue: (a, b) => [string, object];

declare const _ckeditor_ckeditor5BuildClassic: any;
declare const _ckeditor_ckeditor5React: any;
declare const html2canvas: any;
declare const minify: any;

declare const transPinyin: (a) => string;

declare const window = {
  FileReader: any,
  minify: any
};

declare module "@khanacademy/flow-to-ts";

declare namespace Favicon {
  export namespace Package {
    export interface GenerateResult {
      ico: string;
      png16: string;
      png32: string;
      png150: string;
      png180: string;
      png192: string;
      png512: string;
    }
    function generate(s: HTMLCanvasElement): GenerateResult;
  }
}
