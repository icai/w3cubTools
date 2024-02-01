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
        desc:
          "Online Math Worksheets, Free math worksheets 1 to 100 for kids and primary school students, easy to print and download. No sign-up required.",
        keywords:
          "math worksheets, download math worksheets,print math worksheets, math worksheets testing"
      },
      {
        label: "Calculator",
        path: "/calculator",
        title: "Online Calculator",
        desc:
          "Online Calculator, A Free Online Calculator, Quick and Keyboard Easy.",
        keywords: "calculator, beautiful calculator, easy use calculator"
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
        desc:
          "2048 Game online play. No sign-up required. No download required.",
        keywords: "2048 game, the popular 2048 came, 2048 online, 2048 "
      },
      {
        label: "Gomoku Game",
        path: "/gomoku",
        title: "Gomoku Game with computer",
        desc: "Gomoku Game with computer, train your gomoku skills",
        keywords:
          "gomoku Game, gobang game, gomoku with computer, gomoku skills"
      }
    ]
  },
  {
    category: "Video",
    content: [
      {
        label: "Video Download",
        path: "https://weibomiaopai.com/",
        title: "YouTube Downloader",
        desc: "Online download videos from YouTube for FREE to PC, mobile",
        keywords:
          "youTube downloader, youtube mp4 downloader, fast youtube downloader, easy youtube downloader",
        target: "_blank"
      },
      {
        label: "Savefrom Downloader",
        path: "https://www.savefrom.net/",
        title: "Savefrom Downloader",
        desc: "Online download videos from YouTube for FREE to PC, mobile",
        keywords:
          "youTube downloader, youtube mp4 downloader, fast youtube downloader, easy youtube downloader",
        target: "_blank"
      },
      {
        label: "Y2mate Downloader",
        path: "https://www.y2mate.com/",
        title: "Y2mate Downloader",
        desc: "Online download videos from YouTube for FREE to PC, mobile",
        keywords:
          "youTube downloader, youtube mp4 downloader, fast youtube downloader, easy youtube downloader",
        target: "_blank"
      },
      {
        label: "Tiktok Downloader",
        path: "https://www.dlpanda.com/",
        title: "Tiktok Downloader",
        desc: "Online download videos from Douyin for FREE to PC, mobile",
        keywords:
          "Douyin downloader, Douyin mp4 downloader, fast Douyin downloader, easy Douyin downloader",
        target: "_blank"
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
        desc:
          "Web Colors Chart, web safe colors for web developers, web designers",
        keywords:
          "web safe colors, web colors chart, beautiful web colors chart"
      },
      {
        label: "Open Color",
        path: "/open-color",
        title: "Open color schemes",
        desc:
          "Open color schemes for web developers, web designers, easy use open color schemes.",
        keywords: "open color schemes, open color charts"
      },
      {
        label: "Gradient Colors",
        path: "/gradient-color",
        title: "Gradient Colors Collection Palette",
        desc:
          "Gradient Colors Collection Palette, easy to preview and download. No sign-up required.",
        keywords:
          "Gradient Colors, beautiful Gradient colors, download gradient background"
      },
      {
        label: "HTML Entities",
        path: "/html-entities",
        title: "Character Entity Reference Chart",
        desc:
          "Character Entity Reference Chart, show you the character entity in one screen. easy to search and copy.",
        keywords: "HTML Entities, Character Entities, character Entity Chart"
      },
      {
        label: "MIME Types",
        path: "/mime-list",
        title: "Complete List of MIME Types, Searchable",
        desc: "Complete List of MIME Types, easy to search and copy.",
        keywords: "mime types, find mime types"
      }
    ]
  },
  {
    category: "Word",
    content: [
      {
        label: "Chinese Stroke",
        path: "/write-chinese",
        title: "How to write Chinese",
        desc:
          "How to write Chinese, Chinese Stroke, tell you how to write chinese, and voice to speak",
        keywords: "chinese stroke, write chinese, speak chinese",
        scripts: ["/static/dict/pinyin.js"]
      },
      {
        label: "Chinese to Pinyin",
        path: "/chinese-to-pinyin",
        title: "Chinese convert to Pinyin，searchable，readable",
        desc: "Chinese convert to Pinyin, searchable，readable",
        keywords: "Chinese Pinyin",
        scripts: ["/static/dict/pinyin.js"]
      },
      {
        label: "Japanese 五十音図",
        path: "/japanese-syllabary",
        title: "五十音図, ごじゅうおんず, 五十音图, Hiragana",
        desc:
          "This tool help you learn Japanese syllabary 五十音図, ごじゅうおんず, 五十音图, Hiragana",
        keywords: "learn Japanese, 五十音図, ごじゅうおんず, 五十音图, Hiragana"
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
        desc:
          "online Random Hex string Generator. This tools help you generate the random hex string, you can setting the string len and how many time you generate",
        keywords:
          "random generate string, Random Hex, Random Hex Generator, random"
      },
      {
        label: "Random Mac",
        path: "/random-mac",
        title: "Random Mac Generator",
        desc:
          "online Random Mac address Generator. This tools help you generate the random hex string, you can setting the string len and how many time you generate.",
        keywords:
          "random generate Mac address, Random mac address, Random Mac address Generator, random"
      },
      {
        label: "Shuffle Twitter",
        path: "/shuffle-twitter",
        title: "Shuffle Twitter",
        desc: "Shuffle Twitter, help you bypass censorship.",
        keywords: "Shuffle Twitter, Shuffle weibo, spread accessible channel"
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
        desc:
          "This tools help you generate base64 encode string, base64 decode string. fast and easy to use.",
        keywords:
          "Base64 encode, Base64 decode, Base64 string generator, base64 decode recover"
      },
      {
        label: "MD5 encode",
        path: "/md5-encode",
        title: "MD5 encode",
        desc:
          "This tool help you generate MD5 encode string and sha1 encode string, fast and easy to use.",
        keywords: "MD5 encode, sha1 encode, hex generator"
      },
      {
        label: "SHA encode",
        path: "/sha-encode",
        title: "SHA encode",
        desc:
          "This tool help you generate SHA encode, support sha1, sha256, sha512",
        keywords: "sha1 encode, sha256 encode, sha512 encode, hex generator"
      },
      {
        label: 'Hash text',
        path: '/hash-text',
        title: 'Hash text',
        description:
          'Hash a text string using the function you need : MD5, SHA1, SHA256, SHA224, SHA512, SHA384, SHA3 or RIPEMD160',
        keywords: [
          'hash',
          'digest',
          'crypto',
          'security',
          'text',
          'MD5',
          'SHA1',
          'SHA256',
          'SHA224',
          'SHA512',
          'SHA384',
          'SHA3',
          'RIPEMD160',
        ]
      }
    ]
  },
  {
    category: "Web",
    content: [
      {
        label: "Deobfuscate",
        path: "/js-deobfuscate",
        title: "Deobfuscate Code",
        desc:
          "This tool help you deobfuscate the javaScript code by javaScript obfuscator. use AST transformation to implemented",
        keywords: "deobfuscate, ast deobfuscate, javaScript obfuscator crack"
        // packageName: "babel-plugin-deobfuscate",
        // packageUrl: "https://www.npmjs.com/package/babel-plugin-deobfuscate"
      },
      {
        label: "Url Encode",
        path: "/urlencode",
        title: "Url encode",
        desc:
          "This tool help use handle the Url Escape, Unescape, encodeURI, decodeURI, encodeURIComponent, decodeURIComponment, in one screen, easy to use and copy the result",
        keywords:
          "url Escape, urlUnescape, url encodeURI, url decodeURI, url encodeURIComponent, url decodeURIComponment"
      },
      ...["html", "xml", "json", "js", "java", "csharp", "csv", "sql"].map(
        item => {
          const name = ucfirst(alias[item] || item);
          return {
            label: `${name} Escape Unescape`,
            path: `/${item}-escape-unescape`,
            title: `${name} Escape/Unescape`,
            desc: `This tool help you Escape ${name} code and Unescape ${name} code`,
            keywords: `${name} Escape, ${name} Unescape, code converter`
          };
        }
      ),
      {
        label: "Unicode to Ascii",
        path: "/unicode-to-ascii",
        title: "Unicode to Ascii",
        desc: "you can use this tool converting Unicode to Ascii",
        keywords: "Unicode, Ascii, Unicode converter"
      },
      {
        label: 'Device information',
        path: '/device-information',
        title: 'Device information',
        description: 'Get information about your current device (screen size, pixel-ratio, user agent, ...)',
        keywords: [
          'device',
          'information',
          'screen',
          'pixel',
          'ratio',
          'status',
          'data',
          'computer',
          'size',
          'user',
          'agent',
        ],
      },
      {
        label: 'Case converter',
        path: '/case-converter',
        title: 'Case converter',
        description: 'Change the case of a string and chose between different formats',
        keywords: [
          'case',
          'converter',
          'camelCase',
          'capitalCase',
          'constantCase',
          'dotCase',
          'headerCase',
          'noCase',
          'paramCase',
          'pascalCase',
          'pathCase',
          'sentenceCase',
          'snakeCase',
        ],
      },
      {
        label: 'Date-time converter',
        path: '/date-converter',
        title: 'Date-time converter',
        description: 'Convert date and time into the various different formats',
        keywords: ['date', 'time', 'converter', 'iso', 'utc', 'timezone', 'year', 'month', 'day', 'minute', 'seconde'],
      },
      {
        label: 'Integer base converter',
        path: '/base-converter',
        title: 'Integer base converter',
        description: 'Convert number between different bases (decimal, hexadecimal, binary, octal, base64, ...)',
        keywords: ['integer', 'number', 'base', 'conversion', 'decimal', 'hexadecimal', 'binary', 'octal', 'base64'],
      }
    ]
  },
  {
    category: "Image",
    content: [
      {
        label: "Image to Base64",
        path: "/image-to-base64",
        title: "Image convert to base64 html code online",
        desc:
          "This tool help you convert Image to base64 html code, faster and easy to copy",
        keywords:
          "Image converter, Image base64 converter, Image base64 html converter"
      },
      {
        label: "Base64 to Image",
        path: "/base64-to-image",
        title: "Image base64 to image online",
        desc: "This tool help you convert Image base64 to image online",
        keywords:
          "Image converter, Image base64 converter, Image base64 html converter"
      },
      {
        label: "Image converter",
        path: "/image-converter",
        title: "Image convert to png, jpg, gif, bmp",
        desc:
          "This tool help you convert the images to png, jpg, gif, bmp, free online, faster, No sign-up required.",
        keywords:
          "Image converter, Picture format converter, png format converter, jpg format converter, gif format converter, bmp format converter",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "Image to Ascii Art",
        path: "/image-to-text",
        title: "online image to ascii art code, 在线图片转字符画",
        desc:
          "This tool help you convert Image to ascii art code online. 在线图片转字符画",
        keywords:
          "Image ascii art, Image ascii art converter, Image ascii converter"
      },
      {
        label: 'QR Code generator',
        path: '/qrcode-generator',
        title: 'QR Code generator',
        description:
          'Generate and download QR-code for an url or just a text and customize the background and foreground colors.',
        keywords: ['qr', 'code', 'generator', 'square', 'color', 'link', 'low', 'medium', 'quartile', 'high', 'transparent'],
      },
      {
        label: 'WiFi QR Code generator',
        path: '/wifi-qrcode-generator',
        title: 'WiFi QR Code generator',
        description:
          'Generate and download QR-codes for quick connections to WiFi networks.',
        keywords: ['qr', 'code', 'generator', 'square', 'color', 'link', 'low', 'medium', 'quartile', 'high', 'transparent', 'wifi'],
      },
      {
        label: 'QR Code Decoder',
        path: '/qrcode-decode',
        title: 'QR Code Decoder',
        description:
          'Decode QR Code from an image on the web or Enter an image URL',
        keywords: ['qr', 'code', 'decode', 'decoder', 'qrcode decode', 'qrcode decoder'],
      },
      {
        label: "Long Weibo",
        path: "/long-weibo",
        title: "Long Social Post Generator",
        desc:
          "This tool help you generate the long text social post Image. generate long weibo, long facebook, long twitter",
        keywords:
          "long weibo, long text weibo, long text image weibo,long text social post",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js",
          "//cdn.jsdelivr.net/npm/html2canvas@1.1.4/dist/html2canvas.min.js"
        ]
      },
      {
        label: 'SVG placeholder generator',
        path: '/svg-placeholder-generator',
        title: 'SVG placeholder generator',
        description: 'Generate svg images to use as placeholder in your applications.',
        keywords: ['svg', 'placeholder', 'generator', 'image', 'size', 'mockup'],
      }
    ]
  },
  {
    category: "Tool",
    content: [
      {
        label: "Meta Tag Generator",
        path: "/meta-tag-generator",
        title: "Online Meta Tag Generator, Support facebook and twitter",
        desc:
          "This tool help you generate the html website Meta Tag, support social media eg. facebook and twitter. No sign-up required.",
        keywords:
          "meta tag generator, make meta tag, html meta tag, meta tag copy"
      },
      {
        label: "Curl builder",
        path: "/curl-builder",
        title: "Online curl command line builder",
        desc:
          "This tool help you build the curl command line. No sign-up required.",
        keywords: "curl command builder, curl command generator"
      },
      {
        label: "Cron Generator",
        path: "/cron-gen",
        title: "Online Cron Generator",
        desc:
          "This tool help you generate cron schedule expressions, easy to use. No sign-up required.",
        keywords: "crontab, cron generator, cron examples"
      },
      {
        label: 'Chmod calculator',
        path: '/chmod-calculator',
        title: 'Chmod calculator',
        description: 'Compute your chmod permissions and commands with this online chmod calculator.',
        keywords: [
          'chmod',
          'calculator',
          'file',
          'permission',
          'files',
          'directory',
          'folder',
          'recursive',
          'generator',
          'octal',
        ],
      },
      {
        label: "Favicon Converter",
        path: "/favicon-converter",
        title: "Favicon Converter - Convert Image to Favicon, Faster",
        desc:
          "This tool help you convert Image to Favicon, use browser capability implemented, easy to use, no need to download, faster",
        keywords:
          "Favicon Converter, Favicon Generator, favicon image, favicon image packages",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "Zip Compressor",
        path: "/zip-online",
        title: "Online Zip Compressor, faster",
        desc:
          "This tool help you compress the Zip file, use browser capability implemented, easy to use, no need to download, faster",
        keywords: "zip compressor, online zip compressor, compress zip",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "UnZip Files",
        path: "/unzip-online",
        title: "Online unZip, uncompress files faster",
        desc:
          "This tool help you uncompress the zip files, use browser capability implemented, easy to use, no need to download, faster",
        keywords: "unzip, online zip uncompresser, uncompress zip",
        scripts: [
          "//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"
        ]
      },
      {
        label: "Vue to React",
        path: "/vue-to-react",
        title: "Vue to React Online Converter",
        desc:
          "This tool help you convert Vue  code to React code Online Converter, use AST transformation to implemented.",
        keywords: "vue to react converter, react converter, vue converter",
        scripts: ["/static/bundle/vue-to-react@1.4.1.js"]
      },
      {
        label: "React to Vue",
        path: "/react-to-vue",
        title: "React to Vue Online Converter",
        desc:
          "This tool help you convert React code to Vue code Online Converter, use AST transformation to implemented.",
        keywords: "react to vue converter, react converter, vue converter",
        scripts: ["/static/bundle/react-to-vue@1.2.1.js"]
      }
    ]
  },
  {
    category: "Network",
    content: [
      {
        label: "IP Lookup",
        path: "/ip-lookup",
        title: "IP Address Lookup",
        desc: "Free IP address lookup tool to find your IP address and its geolocation. Verify an IP address, it's Hostname, and ISP to help check for malicious activity",
        keywords: "IP Lookup, IP address information"
      },
      {
        label: 'IPv4 subnet calculator',
        path: '/ipv4-subnet-calculator',
        title: 'IPv4 subnet calculator',
        description: 'Parse your IPv4 CIDR blocks and get all the info you need about your sub network.',
        keywords: ['ipv4', 'subnet', 'calculator', 'mask', 'network', 'cidr', 'netmask', 'bitmask', 'broadcast', 'address'],
      },
      {
        label: 'Ipv4 address converter',
        path: '/ipv4-address-converter',
        title: 'IPv4 address converter',
        description: 'Convert an ip address into decimal, binary, hexadecimal or event in ipv6',
        keywords: ['ipv4', 'address', 'converter', 'decimal', 'hexadecimal', 'binary', 'ipv6'],
      },
      {
        label: 'IPv4 range expander',
        path: '/ipv4-range-expander',
        title: 'IPv4 range expander',
        description:
          'Given a start and an end IPv4 address this tool calculates a valid IPv4 network with its CIDR notation.',
        keywords: ['ipv4', 'range', 'expander', 'subnet', 'creator', 'cidr'],
      },
      {
        label: 'IPv6 ULA generator',
        path: '/ipv6-ula-generator',
        title: 'IPv6 ULA generator',
        description: 'Generate your own local, non-routable IP addresses on your network according to RFC4193.',
        keywords: ['ipv6', 'ula', 'generator', 'rfc4193', 'network', 'private'],
      }
    ]
  },
  {
    category: "Fortune",
    content: [
      {
        label: "Programmer Calenar",
        path: "/huangli",
        title: "程序员老黄历, 据说很灵",
        desc:
          "程序员老黄历查询，通用版本程序员老黄历示例, react版程序员老黄历, react程序员老黄历原理，react程序员老黄历实现",
        keywords: "程序员老黄历, 程序员老黄历示例， react"
      },
      {
        label: "Programmer Divination",
        path: "/qiuqian",
        title: "Programmer Divination chinese version",
        desc:
          "程序员求签, 通用版本程序员求签示例, react版程序员求签, react程序员求签原理，react程序员求签实现",
        keywords: "程序员求签, 程序员求签示例，react"
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
        label: "to Go Bson",
        path: "/json-to-go-bson"
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
        label: "to Java",
        path: "/json-to-java",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to JSON Schema",
        path: "/json-to-json-schema",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to TOML",
        path: "/json-to-toml",
        packageUrl: "https://www.npmjs.com/package/@iarna/toml",
        packageName: "@iarna/toml"
      },
      {
        label: "to Zod Schema",
        path: "/json-to-zod",
        packageUrl: "https://www.npmjs.com/package/json-to-zod",
        packageName: "json-to-zod"
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
        packageUrl:
          "https://github.com/openapi-contrib/json-schema-to-openapi-schema"
      },
      {
        label: "to Protobuf",
        path: "/json-schema-to-protobuf",
        packageName: "jsonschema-protobuf",
        packageUrl: "https://github.com/okdistribute/jsonschema-protobuf"
      },
      {
        label: "to Zod Schema",
        path: "/json-schema-to-zod",
        packageName: "json-schema-to-zod",
        packageUrl: "https://www.npmjs.com/package/json-schema-to-zod"
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
      },
      {
        label: "to TailwindCSS",
        path: "/css-to-tailwind",
        packageUrl: "https://github.com/Jackardios/css-to-tailwindcss",
        packageName: "css-to-tailwindcss"
      }
      // {
      //   label: "to TailwindCSS",
      //   path: "/css-to-tailwind",
      //   packageUrl: "https://github.com/miklosme/css-to-tailwind",
      //   packageName: "css-to-tailwind"
      // }
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
        path: "/jsonld-to-normalized"
      }
    ].map(x => ({
      ...x,
      packageName: "jsonld",
      packageUrl: "https://github.com/digitalbazaar/jsonld.js"
    }))
  },
  {
    category: "TypeScript",
    content: [
      {
        label: "to Flow",
        path: "/typescript-to-flow",
        packageName: "flowgen",
        packageUrl: "https://github.com/joarwilk/flowgen"
      },
      {
        label: "to TypeScript Declaration",
        path: "/typescript-to-typescript-declaration"
      },
      {
        label: "to JSON Schema",
        path: "/typescript-to-json-schema",
        packageName: "ts-json-schema-generator",
        packageUrl: "https://github.com/vega/ts-json-schema-generator"
      },
      {
        label: "to plain JavaScript",
        path: "/typescript-to-javascript"
      },
      {
        label: "to Zod Schema",
        path: "/typescript-to-zod",
        packageName: "ts-to-zod",
        packageUrl: "https://www.npmjs.com/package/ts-to-zod"
      }
    ]
  },
  {
    category: "Flow",
    iconName: "",
    content: [
      {
        label: "to TypeScript",
        path: "/flow-to-typescript"
      },
      {
        label: "to TypeScript Declaration",
        path: "/flow-to-typescript-declaration"
      },
      {
        label: "to plain JavaScript",
        path: "/flow-to-javascript"
      }
    ]
  },
  {
    category: "Others",
    iconName: "",
    content: [
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
        label: "YAML to TOML",
        path: "/yaml-to-toml"
      },
      {
        label: "Markdown to HTML",
        path: "/markdown-to-html",
        packageName: "markdown",
        packageUrl: "https://github.com/evilstreak/markdown-js"
      },
      {
        label: "TOML to JSON",
        path: "/toml-to-json",
        packageUrl: "https://www.npmjs.com/package/@iarna/toml",
        packageName: "@iarna/toml"
      },
      {
        label: "TOML to YAML",
        path: "/toml-to-yaml"
      },
      {
        label: "Cadence to Go",
        path: "/cadence-to-go"
      }
    ]
  }
];

export interface Route {
  path: string;
  label: string;
  desc: string;
  beta?: boolean;
  target?: string;
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
          desc: (x.desc || x.description) || `Online convert ${_label}, automatically faster`
        };
      })
    )
    .concat({
      // @ts-ignore
      label: "W3cubTools",
      path: "/",
      title:
        "W3cubTools | all free, collections of tools for developers and family",
      desc:
        "Provide tools for developers and their family, to improve using HTML, Meta Tag, React, CSS, JavaScript, Color, SQL, SVG, GraphQL, JSON, Chinese, Japanese, Math and Game skills."
    })
);

export function activeRouteData(
  pathname
): {
  label: string;
  path: string;
  searchTerm: string;
  desc: string;
  packageUrl?: string;
  packageName?: string;
  scripts?: string[];
  title?: string;
  keywords?: string;
  links?: string[];
  target?: string;
} {
  return find(routes, o => o.path === pathname);
}
