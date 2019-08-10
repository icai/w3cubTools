import React from "react";
import flatten from "lodash/flatten";
import find from "lodash/find";
import { ucfirst } from "@utils/escape";
const alias = {
  js: "javaScript",
  csharp: "C#"
};
export const categorizedRoutes = [
  {
    category: "Math",
    content: [
      {
        label: "Math Worksheets",
        path: "/math-calc",
        title: "Online Math Worksheets, Printable",
        desc: "Online Math Worksheets, Printable"
      },
      {
        label: "Calculator",
        path: "/calculator",
        title: "Online Calculator",
        desc: "Online Calculator"
      }
    ]
  },
  {
    category: "Game",
    content: [
      {
        label: "2048 Game",
        path: "/g2048",
        title: "2048 Game",
        desc: "2048 Game"
      },
      {
        label: "Gomoku Game",
        path: "/gomoku",
        title: "Gomoku Game with computer",
        desc: "Gomoku Game with computer"
      }
    ]
  },
  {
    category: "Chart",
    content: [
      {
        label: "Web Colors",
        path: "/web-color",
        title: "Web Colors Chart",
        desc: "Web Colors Chart"
      },
      {
        label: "Open Color",
        path: "/open-color",
        title: "Open color schemes",
        desc: "Open color schemes"
      },
      {
        label: "Gradient Colors",
        path: "/gradient-color",
        title: "Gradient Colors Collection Palette",
        desc: "Gradient Colors Collection Palette"
      },
      {
        label: "HTML Entities",
        path: "/html-entities",
        title: "Character Entity Reference Chart",
        desc: "Character Entity Reference Chart"
      },
      {
        label: "MIME Types",
        path: "/mime-list",
        title: "Complete List of MIME Types, Searchable",
        desc: "Complete List of MIME Types, Searchable"
      }
    ]
  },
  {
    category: "Word",
    content: [
      {
        label: "Chinese Stroke",
        path: "/write-chinese",
        title: "How to write Chinese(笔顺)",
        desc: "How to write Chinese, Chinese Stroke(中文笔顺)",
        scripts: ["/static/dict/pinyin.js"]
      },
      {
        label: "中文转拼音",
        path: "/chinese-to-pinyin",
        title: "中文转拼音，在线速查，朗读",
        desc: "中文转拼音，在线速查，朗读发音",
        scripts: ["/static/dict/pinyin.js"]
      },
      {
        label: "Japanese 五十音図",
        path: "/japanese-syllabary",
        title: "五十音図, ごじゅうおんず, 五十音图, Hiragana",
        desc: "五十音図, ごじゅうおんず, 五十音图, Hiragana Stroke"
      }
    ]
  },
  {
    category: "Random",
    content: [
      {
        label: "Random Hex",
        path: "/random-hex",
        title: "Random Hex Generator",
        desc: "Random Hex string Generator"
      },
      {
        label: "Random Mac",
        path: "/random-mac",
        title: "Random Mac Generator",
        desc: "Random Mac address Generator"
      }
    ]
  },
  {
    category: "Hash",
    content: [
      {
        label: "Base64 code",
        path: "/base64",
        title: "Base64 encode, base64 decode",
        desc: "Base64 encode, base64 decode"
      },
      {
        label: "MD5 encode",
        path: "/md5-encode",
        title: "MD5 encode",
        desc: "MD5 encode",
        scripts: ["/static/crypto/sha1.js", "/static/crypto/md5.js"]
      },
      {
        label: "SHA encode",
        path: "/sha-encode",
        title: "SHA encode",
        desc: "SHA encode",
        scripts: [
          "/static/crypto/sha1.js",
          "/static/crypto/sha256.js",
          "/static/crypto/sha512.js"
        ]
      }
    ]
  },
  {
    category: "Encode",
    content: [
      {
        label: "Deobfuscate",
        path: "/js-deobfuscate",
        title: "Deobfuscate Code"
        // packageName: "babel-plugin-deobfuscate",
        // packageUrl: "https://www.npmjs.com/package/babel-plugin-deobfuscate"
      },
      {
        label: "Url Encode",
        path: "/urlencode",
        title: "Url encode",
        desc: "Url Escape, Unescape, encodeURI, decodeURI ..."
      },
      ...["html", "xml", "json", "js", "java", "csharp", "csv", "sql"].map(
        item => {
          const name = ucfirst(alias[item] || item);
          return {
            label: `${name} Escape Unescape`,
            path: `/${item}-escape-unescape`,
            title: `${name} Escape/Unescape`,
            desc: `${name} Escape/Unescape`
          };
        }
      ),
      {
        label: "Unicode to Ascii",
        path: "/unicode-to-ascii",
        title: "Unicode to Ascii",
        desc: "Unicode to Ascii"
      }
    ]
  },
  {
    category: "Images",
    content: [
      {
        label: "Image to Base64",
        path: "/image-to-base64",
        title: "Image convert to base64 html code online",
        desc: "Image convert to base64 html code online"
      },
      {
        label: "Base64 to Image",
        path: "/base64-to-image",
        title: "Image base64 to image online",
        desc: "Image base64 to image online"
      },
      {
        label: "Image converter",
        path: "/image-converter",
        title: "Image convert to png,jpg,...",
        desc: "Image convert to png,jpg,...",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      }
    ]
  },
  {
    category: "Tools",
    content: [
      {
        label: "Curl builder",
        path: "/curl-builder",
        title: "Online curl command line builder",
        desc: "Online curl command line builder"
      },
      {
        label: "Cron Generator",
        path: "/cron-gen",
        title: "Online Cron Generator",
        desc: "Online Cron Generator"
      },
      {
        label: "Zip Compressor",
        path: "/zip-online",
        title: "Online Zip Compressor, faster",
        desc: "Online Zip Compressor, faster",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "UnZip Files",
        path: "/unzip-online",
        title: "Online unZip, uncompress files faster",
        desc: "Online unZip, uncompress files faster",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "Vue to React",
        path: "/vue-to-react",
        title: "Vue to React Online Converter",
        desc: "Vue to React Online Converter",
        scripts: ["https://bundle.run/@w3cub/vue-to-react@1.2.1"]
      }
    ]
  },
  {
    category: "Fortune",
    content: [
      {
        label: "程序员老黄历",
        path: "/huangli",
        title: "程序员老黄历, 据说很灵",
        desc: "程序员老黄历, 程序员日常迷信系列"
      },
      {
        label: "程序员求签",
        path: "/qiuqian",
        title: "程序员求签, 求出好运程",
        desc: "程序员求签, 程序员日常迷信系列"
      }
    ]
  },
  {
    category: "SVG",
    content: [
      {
        label: "to JSX",
        path: "/svg-to-jsx",
        packageName: "@svgr/core",
        packageUrl: "https://github.com/smooth-code/svgr"
      },
      {
        label: "to React Native",
        path: "/svg-to-react-native",
        packageName: "@svgr/core",
        packageUrl: "https://github.com/smooth-code/svgr"
      }
    ]
  },
  {
    category: "HTML",
    content: [
      {
        label: "to JSX",
        path: "/html-to-jsx"
      },
      {
        label: "to Pug",
        path: "/html-to-pug",
        packageName: "html2pug",
        packageUrl: "https://github.com/izolate/html2pug"
      }
    ]
  },
  {
    category: "JSON",
    content: [
      {
        label: "to React PropTypes",
        path: "/json-to-proptypes",
        title: "W3cubTools | All important transforms at one place."
      },
      {
        label: "to Flow",
        path: "/json-to-flow"
      },
      {
        label: "to GraphQL",
        path: "/json-to-graphql",
        packageName: "@walmartlabs/json-to-simple-graphql-schema",
        packageUrl:
          "https://github.com/walmartlabs/json-to-simple-graphql-schema"
      },
      {
        label: "to TypeScript",
        path: "/json-to-typescript",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to MobX-State-Tree Model",
        path: "/json-to-mobx-state-tree"
      },
      {
        label: "to Sarcastic",
        path: "/json-to-sarcastic",
        packageName: "transform-json-types",
        packageUrl: "https://github.com/transform-it/transform-json-types"
      },
      {
        label: "to io-ts",
        path: "/json-to-io-ts",
        packageName: "transform-json-types",
        packageUrl: "https://github.com/transform-it/transform-json-types"
      },
      {
        label: "to Rust Serde",
        path: "/json-to-rust-serde",
        desc: "An online REPL for converting JSON to Rust Serde Structs."
      },
      {
        label: "to Mongoose Schema",
        path: "/json-to-mongoose",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to Big Query Schema",
        path: "/json-to-big-query",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to MySQL",
        path: "/json-to-mysql",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to Scala Case Class",
        path: "/json-to-scala-case-class"
      },
      {
        label: "to Go Struct",
        path: "/json-to-go",
        packageName: "json-to-go",
        packageUrl: "https://github.com/mholt/json-to-go"
      },
      {
        label: "to YAML",
        path: "/json-to-yaml",
        packageName: "json2yaml",
        packageUrl: "https://github.com/jeffsu/json2yaml"
      },
      {
        label: "to JSDoc",
        path: "/json-to-jsdoc"
      },
      {
        label: "to Kotlin",
        path: "/json-to-kotlin",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to JSON Schema",
        path: "/json-to-json-schema",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      }
    ]
  },
  {
    category: "JSON Schema",
    content: [
      {
        label: "to TypeScript",
        path: "/json-schema-to-typescript",
        packageName: "json-schema-to-typescript",
        packageUrl: "https://github.com/bcherny/json-schema-to-typescript"
      },
      {
        label: "to OpenAPI Schema",
        path: "/json-schema-to-openapi-schema",
        packageName: "json-schema-to-openapi-schema",
        packageUrl: "https://github.com/wework/json-schema-to-openapi-schema"
      }
    ]
  },
  {
    category: "CSS Converter",
    content: [
      {
        label: "to JS Objects",
        path: "/css-to-js",
        packageName: "transform-css-to-js",
        packageUrl: "https://github.com/transform-it/transform-css-to-js"
      },
      {
        label: "to template literal",
        path: "/object-styles-to-template-literal",
        packageUrl:
          "https://github.com/satya164/babel-plugin-object-styles-to-template",
        packageName: "babel-plugin-object-styles-to-template"
      }
    ]
  },
  {
    category: "JavaScript",
    content: [
      {
        label: "to JSON",
        path: "/js-object-to-json",
        desc: "An online REPL for converting JS Object to JSON."
      }
    ]
  },
  {
    category: "GraphQL",
    content: [
      {
        label: "to TypeScript",
        path: "/graphql-to-typescript"
      },
      {
        label: "to Flow",
        path: "/graphql-to-flow"
      },
      {
        label: "to JAVA",
        path: "/graphql-to-java"
      },
      {
        label: "to Resolvers Signature",
        path: "/graphql-to-resolvers-signature"
      },

      {
        label: "to Introspection JSON",
        path: "/graphql-to-introspection-json"
      },

      {
        label: "to Schema AST",
        path: "/graphql-to-schema-ast"
      },
      {
        label: "to Fragment Matcher",
        path: "/graphql-to-fragment-matcher"
      },
      {
        label: "to Components",
        path: "/graphql-to-components"
      },
      {
        label: "to TypeScript MongoDB",
        path: "/graphql-to-typescript-mongodb"
      }
    ].map(x => ({
      ...x,
      packageUrl: "https://github.com/dotansimha/graphql-code-generator",
      packageName: "graphql-code-generator"
    }))
  },
  {
    category: "JSON-LD",
    content: [
      {
        label: "to N-Quads",
        path: "/jsonld-to-nquads"
      },
      {
        label: "to Expanded",
        path: "/jsonld-to-expanded"
      },
      {
        label: "to Compacted",
        path: "/jsonld-to-compacted"
      },
      {
        label: "to Flattened",
        path: "/jsonld-to-flattened"
      },
      {
        label: "to Framed",
        path: "/jsonld-to-framed"
      },
      {
        label: "to Normalized",
        path: "jsonld-to-normalized"
      }
    ].map(x => ({
      ...x,
      packageName: "jsonld",
      packageUrl: "https://github.com/digitalbazaar/jsonld.js"
    }))
  },
  {
    category: "Others",
    iconName: "",
    content: [
      {
        label: "Flow to Typescript",
        path: "/flow-to-typescript"
      },
      {
        label: "XML to JSON",
        path: "/xml-to-json",
        packageName: "xml-js",
        packageUrl: "https://github.com/nashwaan/xml-js"
      },

      {
        label: "YAML to JSON",
        path: "/yaml-to-json",
        packageName: "yaml",
        packageUrl: "https://github.com/tj/js-yaml"
      },
      {
        label: "Markdown to HTML",
        path: "/markdown-to-html",
        packageName: "markdown",
        packageUrl: "https://github.com/evilstreak/markdown-js"
      }
    ]
  }
];

export interface Route {
  path: string;
  label: string;
  desc: string;
  beta?: boolean;
}

export const routes = flatten(
  categorizedRoutes
    .map(a =>
      // @ts-ignore
      a.content.map(x => {
        const _label =
          a.category.toLowerCase() !== "others"
            ? `${a.category} ${x.label}`
            : x.label;
        return {
          ...x,
          category: a.category,
          searchTerm: _label,
          desc: x.desc || `Online convert ${_label}, automatically faster`
        };
      })
    )
    .concat({
      label: "W3cubTools",
      path: "/",
      title:
        "W3cubTools | All Free, Collections of Tools For Developers and Family",
      desc:
        "W3cubTools | All Free, Collections of Tools For Developers and Family"
    })
);

export function activeRouteData(pathname) {
  return find(routes, o => o.path === pathname);
}
