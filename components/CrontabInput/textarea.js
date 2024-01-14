var it = {},
  ds = typeof window !== "undefined" && document.selection;
it.selectionStart = function(oElement) {
  if (!ds) {
    return oElement.selectionStart;
  }
  var er = ds.createRange(),
    value,
    len,
    s = 0;
  var er1 = document.body.createTextRange();
  er1.moveToElementText(oElement);
  for (s; er1.compareEndPoints("StartToStart", er) < 0; s++) {
    er1.moveStart("character", 1);
  }
  return s;
};
it.selectionBefore = function(oElement) {
  return oElement.value.slice(0, it.selectionStart(oElement));
};
it.selectText = function(oElement, nStart, nEnd) {
  oElement.focus();
  if (!ds) {
    oElement.setSelectionRange(nStart, nEnd);
    return;
  }
  var c = oElement.createTextRange();
  c.collapse(1);
  c.moveStart("character", nStart);
  c.moveEnd("character", nEnd - nStart);
  c.select();
};
it.insertText = function(oElement, sInsertText, nStart, nLen) {
  oElement.focus();
  nLen = nLen || 0;
  if (!ds) {
    var text = oElement.value,
      start = nStart - nLen,
      end = start + sInsertText.length;
    oElement.value =
      text.slice(0, start) + sInsertText + text.slice(nStart, text.length);
    it.selectText(oElement, end, end);
    return;
  }
  var c = ds.createRange();
  c.moveStart("character", -nLen);
  c.text = sInsertText;
};
it.getCursorPos = function(obj) {
  var CaretPos = 0;
  if ($IE) {
    obj.focus();
    var range = null;
    range = ds.createRange();
    var stored_range = range.duplicate();
    stored_range.moveToElementText(obj);
    stored_range.setEndPoint("EndToEnd", range);
    obj.selectionStart = stored_range.text.length - range.text.length;
    obj.selectionEnd = obj.selectionStart + range.text.length;
    CaretPos = obj.selectionStart;
  } else {
    if (obj.selectionStart || obj.selectionStart == "0") {
      CaretPos = obj.selectionStart;
    }
  }
  return CaretPos;
};
it.getSelectedText = function(obj) {
  var selectedText = "";
  var getSelection = function(e) {
    if (e.selectionStart != undefined && e.selectionEnd != undefined) {
      return e.value.substring(e.selectionStart, e.selectionEnd);
    } else {
      return "";
    }
  };
  if (window.getSelection) {
    selectedText = getSelection(obj);
  } else {
    selectedText = ds.createRange().text;
  }
  return selectedText;
};
it.setCursor = function(obj, pos, coverlen) {
  pos = pos == null ? obj.value.length : pos;
  coverlen = coverlen == null ? 0 : coverlen;
  obj.focus();
  if (obj.createTextRange) {
    var range = obj.createTextRange();
    range.move("character", pos);
    range.moveEnd("character", coverlen);
    range.select();
  } else {
    obj.setSelectionRange(pos, pos + coverlen);
  }
};
it.unCoverInsertText = function(obj, str, pars) {
  pars = pars == null ? {} : pars;
  pars.rcs = pars.rcs == null ? obj.value.length : pars.rcs * 1;
  pars.rccl = pars.rccl == null ? 0 : pars.rccl * 1;
  var text = obj.value,
    fstr = text.slice(0, pars.rcs),
    lstr = text.slice(pars.rcs + pars.rccl, text == "" ? 0 : text.length);
  obj.value = fstr + str + lstr;
  this.setCursor(obj, pars.rcs + (str == null ? 0 : str.length));
};

export default it;
// module.exports = it;
