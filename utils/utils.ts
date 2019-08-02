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
