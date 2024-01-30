import { Buffer } from 'buffer';

export { textToBase64, base64ToText, isValidBase64, removePotentialDataAndMimePrefix };

function btoaInNode(str: string) {
  return Buffer.from(str).toString('base64');
}

function atobInNode(str: string) {
  return Buffer.from(str, 'base64').toString();
}

function isNode() {
  return typeof window === 'undefined';
}
function atob(str: string) {
  return isNode() ? atobInNode(str) : window.atob(str);
}

function btoa(str: string) {
  return isNode() ? btoaInNode(str) : window.btoa(str);
}

function textToBase64(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  const encoded = btoa(str);
  return makeUrlSafe ? makeUriSafe(encoded) : encoded;
}

function base64ToText(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  if (!isValidBase64(str, { makeUrlSafe })) {
    throw new Error('Incorrect base64 string');
  }

  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (makeUrlSafe) {
    cleanStr = unURI(cleanStr);
  }
  return atob(cleanStr);
}

function removePotentialDataAndMimePrefix(str: string) {
  return str.replace(/^data:.*?;base64,/, '');
}

function isValidBase64(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (makeUrlSafe) {
    cleanStr = unURI(cleanStr);
  }

  try {
    if (makeUrlSafe) {
      return removePotentialPadding(btoa(atob(cleanStr))) === cleanStr;
    }
    return btoa(atob(cleanStr)) === cleanStr;
  }
  catch (err) {
    return false;
  }
}

function makeUriSafe(encoded: string) {
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function unURI(encoded: string): string {
  return encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/[^A-Za-z0-9+/]/g, '');
}

function removePotentialPadding(str: string) {
  return str.replace(/=/g, '');
}
