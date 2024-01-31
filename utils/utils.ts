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



export function withDefaultOnError<A, B>(cb: () => A, defaultValue: B): A | B {
  try {
    return cb();
  }
  catch (_) {
    return defaultValue;
  }
}


export function isNotThrowing(cb: () => unknown): boolean {
  try {
    cb();
    return true;
  }
  catch (_) {
    return false;
  }
}


export function convertBase({ value, fromBase, toBase }: { value: string; fromBase: number; toBase: number }) {
  const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
  const fromRange = range.slice(0, fromBase);
  const toRange = range.slice(0, toBase);
  let decValue = value
    .split('')
    .reverse()
    .reduce((carry: number, digit: string, index: number) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${fromBase}.`);
      }
      return (carry += fromRange.indexOf(digit) * fromBase ** index);
    }, 0);
  let newValue = '';
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue;
    decValue = (decValue - (decValue % toBase)) / toBase;
  }
  return newValue || '0';
}

