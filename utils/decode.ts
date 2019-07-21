import { func } from "prop-types";

const decodeUnicode = function(str) {
  str = str.replace(/\\u/gi, "%u");
  return unescape(str);
};

export function decodeConText(str) {
  return str.replace(/("|')([\s\S])*?\1/g, all => {
    return decodeUnicode(all);
  });
}

export function decodeString(str) {
  return decodeUnicode(str);
}

export function unicodeString(str: string) {
  const s = escape(str)
    .toLocaleLowerCase()
    .replace(/%u/gi, "\\u");
  return s
    .replace(/%7b/gi, "{")
    .replace(/%7d/gi, "}")
    .replace(/%3a/gi, ":")
    .replace(/%2c/gi, ",")
    .replace(/%27/gi, "'")
    .replace(/%22/gi, '"')
    .replace(/%5b/gi, "[")
    .replace(/%5d/gi, "]")
    .replace(/%3D/gi, "=")
    .replace(/%20/gi, " ")
    .replace(/%3E/gi, ">")
    .replace(/%3C/gi, "<")
    .replace(/%3F/gi, "?")
    .replace(/%5c/gi, "\\");
}

export function cnChar2EnChar(str: string) {
  str = str
    .replace(/\’|\‘/g, "'")
    .replace(/\“|\”/g, '"')
    .replace(/\【/g, "[")
    .replace(/\】/g, "]")
    .replace(/\｛/g, "{")
    .replace(/\｝/g, "}")
    .replace(/，/g, ",")
    .replace(/：/g, ":");
  return str;
}
