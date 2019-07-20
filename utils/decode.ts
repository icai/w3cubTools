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
