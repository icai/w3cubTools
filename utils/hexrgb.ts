const hexCharacters = "a-f\\d";
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, "gi");
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, "i");

type Options = {
  format?: string;
};

declare namespace hexRgb {
  interface Options {
    readonly format?: "array";
  }

  interface RgbaObject {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
}

export default function(hex: string): hexRgb.RgbaObject {
  if (
    typeof hex !== "string" ||
    nonHexChars.test(hex) ||
    !validHexSize.test(hex)
  ) {
    throw new TypeError("Expected a valid hex string");
  }

  hex = hex.replace(/^#/, "");
  let alpha = 1;

  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);
  const red = num >> 16;
  const green = (num >> 8) & 255;
  const blue = num & 255;

  return { red, green, blue, alpha };
}
