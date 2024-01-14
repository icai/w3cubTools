// import { transform } from "@babel/standalone";
import jsonToProptypes from "babel-plugin-json-to-proptypes";
import jsonToMobxTree from "@assets/vendor/babel-plugin-js-to-mobx-state-tree";
import { merge } from "lodash";
import { prettify } from "@utils/prettify";
import { BabelTransforms } from "@constants/babelTransforms";
import objStylesToTemplate from "babel-plugin-object-styles-to-template";

declare const self;

const _self: any = self;

interface Data {
  id: string;
  payload: {
    value: string;
    type: BabelTransforms;
    settings?: any;
  };
}

async function handleJsonToProptypes(value, id) {
  let code = JSON.parse(value);

  if (typeof code !== "object" || Array.isArray(code)) {
    code = merge({}, ...code);
  }

  const result = Babel.transform(`const propTypes = ${JSON.stringify(code)}`, {
    plugins: [jsonToProptypes]
  }).code;

  const prettyCode = await prettify("javascript", result);

  _self.postMessage({
    id,
    payload: prettyCode
  });
}

function objectStylesToTemplate(value, id, settings) {
  _self.postMessage({
    id,
    payload: Babel.transform(value, {
      plugins: [[objStylesToTemplate, settings]]
    }).code
  });
}

function jsonToMobx(value, id) {
  _self.postMessage({
    id,
    payload: Babel.transform(`const myModel = ${value}`, {
      plugins: [jsonToMobxTree]
    }).code
  });
}

function deobfuscateCode(value, id) {
  importScripts("https://bundle.run/babel-plugin-deobfuscate@0.0.3");
  _self.postMessage({
    id,
    payload: Babel.transform(value, {
      plugins: [self.babelPluginDeobfuscate]
    }).code
  });
}

_self.onmessage = ({ data: { id, payload } }: { data: Data }) => {
  const { value, type, settings } = payload;

  importScripts("https://unpkg.com/@babel/standalone@7.5.4");

  try {
    if (type === BabelTransforms.JSON_TO_PROPTYPES) {
      handleJsonToProptypes(value, id);
    } else if (type === BabelTransforms.OBJECT_STYLES_TO_TEMPLATE) {
      objectStylesToTemplate(value, id, settings);
    } else if (type === BabelTransforms.JSON_TO_MOBX_TREE) {
      jsonToMobx(value, id);
    } else if (type === BabelTransforms.JS_DEOBFUSCATE) {
      deobfuscateCode(value, id);
    }
  } catch (e) {
    if (process.env.dev) {
      console.error(e);
    }
    _self.postMessage({
      id,
      err: e.message
    });
  }
};
