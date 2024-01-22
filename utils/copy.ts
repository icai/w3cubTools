function dynamicNode(text) {
  var node = document.createElement("pre");
  node.style.position = "fixed";
  node.style.fontSize = "0px";
  node.textContent = text;
  return node;
}

export default function(text, _options = {}) {
  var node = dynamicNode(text);
  document.body.appendChild(node);
  var selection = getSelection() as any;
  selection.removeAllRanges(); // Add type assertion to ensure 'selection' is not null
  var range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
  document.body.removeChild(node);
  return true;
}
