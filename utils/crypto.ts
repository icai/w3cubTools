//@ts-nocheck
/**
 * RegEx escaping
 */
const regEscape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const D3 = {
  PhrasesEnglish: new Array(
    "crap",
    "dude",
    "hacker",
    "hacks",
    "you",
    "cool",
    "oh my god",
    "fear",
    "power",
    "own",
    "lol",
    "what the hell",
    "elite",
    "for the win",
    "oh really",
    "good game"
  ),

  PhrasesLeet: new Array(
    "carp",
    "dood",
    "haxor",
    "hax",
    "joo",
    "kewl",
    "omg",
    "ph43",
    "powwah",
    "pwn",
    "lawl",
    "wth",
    "leet",
    "ftw",
    "o rly",
    "gg"
  ),

  LettersEnglish: new Array(
    "n",
    "b",
    "k",
    "d",
    "e",
    "f",
    "g",
    "h",
    "p",
    "m",
    "r",
    "l",
    "o",
    "q",
    "s",
    "t",
    "u",
    "x",
    "w",
    "y",
    "z",
    "c",
    "a",
    "j",
    "i",
    "v",
    " "
  ),

  LettersLeet: new Array(
    "/\\/",
    "|}",
    "|X",
    "[)",
    "3",
    "|=",
    "gee",
    "|-|",
    "|*",
    "(\\/)",
    "|2",
    "1",
    "()",
    "0",
    "$",
    "+",
    "|_|",
    "><",
    "\\X/",
    "'/",
    "2",
    "<",
    "/\\",
    "_|",
    "|",
    "\\/",
    "  "
  ),

  rot13decode: function(text) {
    var keycode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var textrot = new String();

    for (var i = 0; i < text.length; i++) {
      var codechar = text.substring(i, i + 1);
      var pos = keycode.indexOf(codechar.toUpperCase());

      if (pos >= 0) {
        pos = (pos + keycode.length / 2) % keycode.length;
        codechar =
          codechar == codechar.toUpperCase()
            ? keycode.substring(pos, pos + 1)
            : keycode.substring(pos, pos + 1).toLowerCase();
      }
      textrot = textrot + codechar;
    }

    return textrot;
  },

  timestampToDate: function(text) {
    var timestamp = parseInt(text);

    if (!timestamp) return;

    var dateObject = new Date();
    dateObject.setTime(timestamp * 1000);
    return dateObject;
  },
  crc32: function(str) {
    str = D3.utf8_encode(str);
    var table =
      "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    var crc = 0;
    var x = 0 as any;
    var y = 0;

    crc = crc ^ -1;
    for (var i = 0, iTop = str.length; i < iTop; i++) {
      y = (crc ^ str.charCodeAt(i)) & 0xff;
      x = "0x" + table.substr(y * 9, 8);
      crc = (crc >>> 8) ^ x;
    }

    return crc ^ -1;
  },
  bin2hex: function(s) {
    var i,
      f = 0,
      a = [];

    s += "";
    f = s.length;

    for (i = 0; i < f; i++) {
      a[i] = s
        .charCodeAt(i)
        .toString(16)
        .replace(/^([\da-f])$/, "0$1");
    }

    return a.join("");
  },
  bin2txt: function(binary) {
    binary = binary.replace(/(\s)/gm, "");

    var string = "";

    for (var i = 0; i < binary.length / 8; i++) {
      let sub = binary.substr(i * 8, 8);
      let num = 0;

      for (var j = 0; j < sub.length; j++) {
        if (sub.charAt(j) != "0") {
          num += Math.pow(2, 7 - j);
        }
      }

      string += String.fromCharCode(num);
    }

    return string;
  },
  html_entity_decode: function(string, quote_style) {
    var hash_map = {},
      symbol = "",
      tmp_str = "",
      entity = "";
    tmp_str = string.toString();

    if (
      false ===
      (hash_map = D3.get_html_translation_table("HTML_ENTITIES", quote_style))
    ) {
      return false;
    }

    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
    delete hash_map["&"];
    hash_map["&"] = "&amp;";

    for (symbol in hash_map) {
      entity = hash_map[symbol];
      tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split("&#039;").join("'");

    return tmp_str;
  },
  htmlentities: function(string, quote_style) {
    var hash_map = {},
      symbol = "",
      tmp_str = "",
      entity = "";
    tmp_str = string.toString();

    if (
      false ===
      (hash_map = D3.get_html_translation_table("HTML_ENTITIES", quote_style))
    ) {
      return false;
    }
    hash_map["'"] = "&#039;";
    for (symbol in hash_map) {
      entity = hash_map[symbol];
      tmp_str = tmp_str.split(symbol).join(entity);
    }

    return tmp_str;
  },
  htmlspecialchars: function(string, quote_style, charset, double_encode) {
    var optTemp = 0,
      i = 0,
      noquotes = false;
    if (typeof quote_style === "undefined" || quote_style === null) {
      quote_style = 2;
    }
    string = string.toString();
    if (double_encode !== false) {
      // Put this first to avoid double-encoding
      string = string.replace(/&/g, "&amp;");
    }
    string = string.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    var OPTS = {
      ENT_NOQUOTES: 0,
      ENT_HTML_QUOTE_SINGLE: 1,
      ENT_HTML_QUOTE_DOUBLE: 2,
      ENT_COMPAT: 2,
      ENT_QUOTES: 3,
      ENT_IGNORE: 4
    };
    if (quote_style === 0) {
      noquotes = true;
    }
    if (typeof quote_style !== "number") {
      // Allow for a single string or an array of string flags
      quote_style = [].concat(quote_style);
      for (i = 0; i < quote_style.length; i++) {
        // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
        if (OPTS[quote_style[i]] === 0) {
          noquotes = true;
        } else if (OPTS[quote_style[i]]) {
          optTemp = optTemp | OPTS[quote_style[i]];
        }
      }
      quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
      string = string.replace(/'/g, "&#039;");
    }
    if (!noquotes) {
      string = string.replace(/"/g, "&quot;");
    }

    return string;
  },
  htmlspecialchars_decode: function(string, quote_style) {
    var optTemp = 0,
      i = 0,
      noquotes = false;
    if (typeof quote_style === "undefined") {
      quote_style = 2;
    }
    string = string
      .toString()
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    var OPTS = {
      ENT_NOQUOTES: 0,
      ENT_HTML_QUOTE_SINGLE: 1,
      ENT_HTML_QUOTE_DOUBLE: 2,
      ENT_COMPAT: 2,
      ENT_QUOTES: 3,
      ENT_IGNORE: 4
    };
    if (quote_style === 0) {
      noquotes = true;
    }
    if (typeof quote_style !== "number") {
      // Allow for a single string or an array of string flags
      quote_style = [].concat(quote_style);
      for (i = 0; i < quote_style.length; i++) {
        // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
        if (OPTS[quote_style[i]] === 0) {
          noquotes = true;
        } else if (OPTS[quote_style[i]]) {
          optTemp = optTemp | OPTS[quote_style[i]];
        }
      }
      quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
      string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
      // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
    }
    if (!noquotes) {
      string = string.replace(/&quot;/g, '"');
    }
    // Put this in last place to avoid escape being double-decoded
    string = string.replace(/&amp;/g, "&");

    return string;
  },
  uri_encode: function(str) {
    return encodeURIComponent(str);
  },
  uri_decode: function(str) {
    return decodeURIComponent(str);
  },
  quoted_printable_decode: function(str) {
    var RFC2045Decode1 = /=\r\n/gm,
      // Decodes all equal signs followed by two hex digits
      RFC2045Decode2IN = /=([0-9A-F]{2})/gim, // the RFC states against decoding lower case encodings, but following apparent PHP behavior
      // RFC2045Decode2IN = /=([0-9A-F]{2})/gm,

      RFC2045Decode2OUT = function(_sMatch, sHex) {
        return String.fromCharCode(parseInt(sHex, 16));
      };
    return str
      .replace(RFC2045Decode1, "")
      .replace(RFC2045Decode2IN, RFC2045Decode2OUT);
  },
  quoted_printable_encode: function(str) {
    var hexChars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
      ],
      RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm,
      RFC2045Encode1OUT = function(sMatch) {
        // Encode space before CRLF sequence to prevent spaces from being stripped
        // Keep hard line breaks intact; CRLF sequences
        if (sMatch.length > 1) {
          return sMatch.replace(" ", "=20");
        }
        // Encode matching character
        var chr = sMatch.charCodeAt(0);
        return "=" + hexChars[(chr >>> 4) & 15] + hexChars[chr & 15];
      },
      RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g,
      RFC2045Encode2OUT = function(sMatch) {
        if (sMatch.substr(sMatch.length - 2) === "\r\n") {
          return sMatch;
        }
        return sMatch + "=\r\n";
      };
    str = str
      .replace(RFC2045Encode1IN, RFC2045Encode1OUT)
      .replace(RFC2045Encode2IN, RFC2045Encode2OUT);
    return str.substr(0, str.length - 3);
  },
  escapeshellarg: function(arg) {
    var ret = "";

    ret = arg.replace(/[^\\]'/g, function(m) {
      return m.slice(0, 1) + "\\'";
    });

    return "'" + ret + "'";
  },
  leetEncode: function(inputString) {
    if (!inputString) return "";

    for (var i = 0; i < D3.PhrasesEnglish.length; ++i)
      inputString = inputString.replace(
        new RegExp(D3.PhrasesEnglish[i], "gi"),
        D3.PhrasesLeet[i]
      );

    for (var i = 0; i < D3.LettersEnglish.length; ++i)
      inputString = inputString.replace(
        new RegExp(D3.LettersEnglish[i], "gi"),
        D3.LettersLeet[i]
      );
    return inputString;
  },
  leetDecode: function(inputString) {
    for (var i = 0; i < D3.LettersLeet.length; ++i)
      inputString = inputString.replace(
        new RegExp(regEscape(D3.LettersLeet[i]), "g"),
        D3.LettersEnglish[i]
      );

    for (var i = 0; i < D3.PhrasesLeet.length; ++i)
      inputString = inputString.replace(
        new RegExp(regEscape(D3.PhrasesLeet[i]), "g"),
        D3.PhrasesEnglish[i]
      );
    return inputString;
  },
  reverseText: function(inputString) {
    return inputString
      .split("")
      .reverse()
      .join("");
  },
  base64_encode: function(data) {
    var b64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      ac = 0,
      enc = "",
      tmp_arr = [];

    if (!data) {
      return data;
    }

    data = D3.utf8_encode(data + "");

    do {
      // pack three octets into four hexets
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);

      bits = (o1 << 16) | (o2 << 8) | o3;

      h1 = (bits >> 18) & 0x3f;
      h2 = (bits >> 12) & 0x3f;
      h3 = (bits >> 6) & 0x3f;
      h4 = bits & 0x3f;

      // use hexets to index into b64, and append result to encoded string
      tmp_arr[ac++] =
        b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join("");

    switch (data.length % 3) {
      case 1:
        enc = enc.slice(0, -2) + "==";
        break;
      case 2:
        enc = enc.slice(0, -1) + "=";
        break;
    }

    return enc;
  },
  base64_decode: function(data) {
    var b64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      ac = 0,
      dec = "",
      tmp_arr = [];

    if (!data) {
      return data;
    }

    data += "";

    do {
      // unpack four hexets into three octets using index points in b64
      h1 = b64.indexOf(data.charAt(i++));
      h2 = b64.indexOf(data.charAt(i++));
      h3 = b64.indexOf(data.charAt(i++));
      h4 = b64.indexOf(data.charAt(i++));

      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

      o1 = (bits >> 16) & 0xff;
      o2 = (bits >> 8) & 0xff;
      o3 = bits & 0xff;

      if (h3 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1);
      } else if (h4 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < data.length);

    dec = tmp_arr.join("");
    dec = D3.utf8_decode(dec);

    return dec;
  },
  get_html_translation_table: function(table, quote_style) {
    var entities = {},
      hash_map = {},
      decimal = 0,
      symbol = "";
    var constMappingTable = {},
      constMappingQuoteStyle = {};
    var useTable = {},
      useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = "HTML_SPECIALCHARS";
    constMappingTable[1] = "HTML_ENTITIES";
    constMappingQuoteStyle[0] = "ENT_NOQUOTES";
    constMappingQuoteStyle[2] = "ENT_COMPAT";
    constMappingQuoteStyle[3] = "ENT_QUOTES";

    useTable = !isNaN(table)
      ? constMappingTable[table]
      : table
      ? table.toUpperCase()
      : "HTML_SPECIALCHARS";
    useQuoteStyle = !isNaN(quote_style)
      ? constMappingQuoteStyle[quote_style]
      : quote_style
      ? quote_style.toUpperCase()
      : "ENT_COMPAT";

    if (useTable !== "HTML_SPECIALCHARS" && useTable !== "HTML_ENTITIES") {
      throw new Error("Table: " + useTable + " not supported");
      // return false;
    }

    entities["38"] = "&amp;";
    if (useTable === "HTML_ENTITIES") {
      entities["160"] = "&nbsp;";
      entities["161"] = "&iexcl;";
      entities["162"] = "&cent;";
      entities["163"] = "&pound;";
      entities["164"] = "&curren;";
      entities["165"] = "&yen;";
      entities["166"] = "&brvbar;";
      entities["167"] = "&sect;";
      entities["168"] = "&uml;";
      entities["169"] = "&copy;";
      entities["170"] = "&ordf;";
      entities["171"] = "&laquo;";
      entities["172"] = "&not;";
      entities["173"] = "&shy;";
      entities["174"] = "&reg;";
      entities["175"] = "&macr;";
      entities["176"] = "&deg;";
      entities["177"] = "&plusmn;";
      entities["178"] = "&sup2;";
      entities["179"] = "&sup3;";
      entities["180"] = "&acute;";
      entities["181"] = "&micro;";
      entities["182"] = "&para;";
      entities["183"] = "&middot;";
      entities["184"] = "&cedil;";
      entities["185"] = "&sup1;";
      entities["186"] = "&ordm;";
      entities["187"] = "&raquo;";
      entities["188"] = "&frac14;";
      entities["189"] = "&frac12;";
      entities["190"] = "&frac34;";
      entities["191"] = "&iquest;";
      entities["192"] = "&Agrave;";
      entities["193"] = "&Aacute;";
      entities["194"] = "&Acirc;";
      entities["195"] = "&Atilde;";
      entities["196"] = "&Auml;";
      entities["197"] = "&Aring;";
      entities["198"] = "&AElig;";
      entities["199"] = "&Ccedil;";
      entities["200"] = "&Egrave;";
      entities["201"] = "&Eacute;";
      entities["202"] = "&Ecirc;";
      entities["203"] = "&Euml;";
      entities["204"] = "&Igrave;";
      entities["205"] = "&Iacute;";
      entities["206"] = "&Icirc;";
      entities["207"] = "&Iuml;";
      entities["208"] = "&ETH;";
      entities["209"] = "&Ntilde;";
      entities["210"] = "&Ograve;";
      entities["211"] = "&Oacute;";
      entities["212"] = "&Ocirc;";
      entities["213"] = "&Otilde;";
      entities["214"] = "&Ouml;";
      entities["215"] = "&times;";
      entities["216"] = "&Oslash;";
      entities["217"] = "&Ugrave;";
      entities["218"] = "&Uacute;";
      entities["219"] = "&Ucirc;";
      entities["220"] = "&Uuml;";
      entities["221"] = "&Yacute;";
      entities["222"] = "&THORN;";
      entities["223"] = "&szlig;";
      entities["224"] = "&agrave;";
      entities["225"] = "&aacute;";
      entities["226"] = "&acirc;";
      entities["227"] = "&atilde;";
      entities["228"] = "&auml;";
      entities["229"] = "&aring;";
      entities["230"] = "&aelig;";
      entities["231"] = "&ccedil;";
      entities["232"] = "&egrave;";
      entities["233"] = "&eacute;";
      entities["234"] = "&ecirc;";
      entities["235"] = "&euml;";
      entities["236"] = "&igrave;";
      entities["237"] = "&iacute;";
      entities["238"] = "&icirc;";
      entities["239"] = "&iuml;";
      entities["240"] = "&eth;";
      entities["241"] = "&ntilde;";
      entities["242"] = "&ograve;";
      entities["243"] = "&oacute;";
      entities["244"] = "&ocirc;";
      entities["245"] = "&otilde;";
      entities["246"] = "&ouml;";
      entities["247"] = "&divide;";
      entities["248"] = "&oslash;";
      entities["249"] = "&ugrave;";
      entities["250"] = "&uacute;";
      entities["251"] = "&ucirc;";
      entities["252"] = "&uuml;";
      entities["253"] = "&yacute;";
      entities["254"] = "&thorn;";
      entities["255"] = "&yuml;";
    }

    if (useQuoteStyle !== "ENT_NOQUOTES") {
      entities["34"] = "&quot;";
    }
    if (useQuoteStyle === "ENT_QUOTES") {
      entities["39"] = "&#39;";
    }
    entities["60"] = "&lt;";
    entities["62"] = "&gt;";

    // ascii decimals to real symbols
    for (let decimal in entities) {
      symbol = String.fromCharCode(+decimal);
      hash_map[symbol] = entities[decimal];
    }

    return hash_map;
  },
  unserialize: function(data) {
    var that = this;
    var utf8Overhead = function(chr) {
      var code = chr.charCodeAt(0);
      if (code < 0x0080) {
        return 0;
      }
      if (code < 0x0800) {
        return 1;
      }
      return 2;
    };

    var error = function(type, msg, filename?, line?) {
      throw new that.window[type](msg, filename, line);
    };
    var read_until = function(data, offset, stopchr) {
      var buf = [];
      var chr = data.slice(offset, offset + 1);
      var i = 2;
      while (chr != stopchr) {
        if (i + offset > data.length) {
          error("Error", "Invalid");
        }
        buf.push(chr);
        chr = data.slice(offset + (i - 1), offset + i);
        i += 1;
      }
      return [buf.length, buf.join("")];
    };
    var read_chrs = function(data, offset, length) {
      var buf;

      buf = [];
      for (var i = 0; i < length; i++) {
        var chr = data.slice(offset + (i - 1), offset + i);
        buf.push(chr);
        length -= utf8Overhead(chr);
      }
      return [buf.length, buf.join("")];
    };
    var _unserialize = function(data, offset) {
      var readdata;
      var readData;
      var chrs = 0;
      var ccount;
      var stringlength;
      var keyandchrs;
      var keys;

      if (!offset) {
        offset = 0;
      }
      var dtype = data.slice(offset, offset + 1).toLowerCase();

      var dataoffset = offset + 2;
      var typeconvert = function(x) {
        return x;
      };

      switch (dtype) {
        case "i":
          typeconvert = function(x) {
            return parseInt(x, 10);
          };
          readData = read_until(data, dataoffset, ";");
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case "b":
          typeconvert = function(x) {
            return parseInt(x, 10) !== 0;
          };
          readData = read_until(data, dataoffset, ";");
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case "d":
          typeconvert = function(x) {
            return parseFloat(x);
          };
          readData = read_until(data, dataoffset, ";");
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 1;
          break;
        case "n":
          readdata = null;
          break;
        case "s":
          ccount = read_until(data, dataoffset, ":");
          chrs = ccount[0];
          stringlength = ccount[1];
          dataoffset += chrs + 2;

          readData = read_chrs(
            data,
            dataoffset + 1,
            parseInt(stringlength, 10)
          );
          chrs = readData[0];
          readdata = readData[1];
          dataoffset += chrs + 2;
          if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
            error("SyntaxError", "String length mismatch");
          }

          // Length was calculated on an utf-8 encoded string
          // so wait with decoding
          readdata = D3.utf8_decode(readdata);
          break;
        case "a":
          readdata = {};

          keyandchrs = read_until(data, dataoffset, ":");
          chrs = keyandchrs[0];
          keys = keyandchrs[1];
          dataoffset += chrs + 2;

          for (var i = 0; i < parseInt(keys, 10); i++) {
            var kprops = _unserialize(data, dataoffset);
            var kchrs = kprops[1];
            var key = kprops[2];
            dataoffset += kchrs;

            var vprops = _unserialize(data, dataoffset);
            var vchrs = vprops[1];
            var value = vprops[2];
            dataoffset += vchrs;

            readdata[key] = value;
          }

          dataoffset += 1;
          break;
        default:
          error("SyntaxError", "Unknown / Unhandled data type(s): " + dtype);
          break;
      }
      return [dtype, dataoffset - offset, typeconvert(readdata)];
    };

    return D3.var_dump(_unserialize(data + "", 0)[2]);
  },
  utf8_encode: function(argString) {
    var string = argString + ""; // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
      var c1 = string.charCodeAt(n);
      var enc = null;

      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc =
          String.fromCharCode((c1 >> 6) | 192) +
          String.fromCharCode((c1 & 63) | 128);
      } else {
        enc =
          String.fromCharCode((c1 >> 12) | 224) +
          String.fromCharCode(((c1 >> 6) & 63) | 128) +
          String.fromCharCode((c1 & 63) | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.substring(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }

    if (end > start) {
      utftext += string.substring(start, string.length);
    }

    return utftext;
  },
  utf8_decode: function(str_data) {
    var tmp_arr = [],
      i = 0,
      ac = 0,
      c1 = 0,
      c2 = 0,
      c3 = 0;

    str_data += "";

    while (i < str_data.length) {
      c1 = str_data.charCodeAt(i);
      if (c1 < 128) {
        tmp_arr[ac++] = String.fromCharCode(c1);
        i++;
      } else if (c1 > 191 && c1 < 224) {
        c2 = str_data.charCodeAt(i + 1);
        tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = str_data.charCodeAt(i + 1);
        c3 = str_data.charCodeAt(i + 2);
        tmp_arr[ac++] = String.fromCharCode(
          ((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }

    return tmp_arr.join("");
  },
  var_dump: function(x, max?, sep?, l?) {
    l = l || 0;
    max = max || 10;
    sep = sep || " ";
    if (l > max) {
      return "[WARNING: Too much recursion]\n";
    }
    var i,
      r = "",
      t = typeof x as (typeof x | "array"),
      tab = "";

    if (x === null) {
      r += "(null)\n";
    } else if (t == "object") {
      l++;

      for (i = 0; i < l; i++) {
        tab += sep;
      }

      if (x && x.length) {
        t = "array";
      }
      r += "(" + t + ") :\n";
      for (i in x) {
        try {
          r += tab + "[" + i + "] : " + D3.var_dump(x[i], max, sep, l + 1);
        } catch (e) {
          return "[ERROR: " + e + "]\n";
        }
      }
    } else {
      if (t == "string") {
        if (x == "") {
          x = "(empty)";
        }
      }
      r += "(" + t + ") " + x + "\n";
    }
    return r;
  }
};

export default D3;
