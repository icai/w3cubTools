export const arrayUniq = array => [...new Set(array)];

String.prototype.repeat = function(n) {
  var n = n || 1;
  return Array(n + 1).join(this);
};

export const getDate = function() {
  var date = new Date();
  var arr = [
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getMilliseconds()
  ] as any;
  for (var i = 0, len = arr.length; i < len; i++) {
    var sl = ("" + arr[i]).length;
    if (i == len - 1) {
      if (sl < 3) {
        arr[i] = "0".repeat(3 - sl) + arr[i];
      }
    } else {
      if (sl == 1) {
        arr[i] = "0" + arr[i];
      }
    }
  }
  return "" + date.getFullYear() + arr.join("");
};

const v = [
  ["āáǎà", "a"],
  ["ēéěè", "e"],
  ["īíǐì", "i"],
  ["ōóǒò", "o"],
  ["ūúǔù", "u"],
  ["ǘǚǜ", "v"]
];
const h = [
  ["āēīōū", 1],
  ["áéíóúǘ", 2],
  ["ǎěǐǒǔǚ", 3],
  ["àèìòùǜ", 4]
];

// guó => guo2
export const converttoNoTone = s => {
  v.forEach(it => {
    s = s.replace(new RegExp("([" + it[0] + "])", "g"), (_a, s1) => {
      return it[1] + s1;
    });
  });
  h.forEach(it => {
    s = s.replace(
      new RegExp("([a-z]*)?([" + it[0] + "])([a-z]*)?", "g"),
      (_a, s1, _s2, s3) => {
        return (s1 || "") + (s3 || "") + it[1];
      }
    );
  });
  return s;
};
