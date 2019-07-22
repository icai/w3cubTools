const withTypescript = require("@zeit/next-typescript");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withLess = require("@zeit/next-less");
const withFonts = require("next-fonts");

const config = {
  webpack(config, options) {
    config.node = {
      fs: "empty",
      module: "empty",
      net: "mock",
      tls: "mock"
    };

    if (options.isServer && options.dev)
      config.plugins.push(new ForkTsCheckerWebpackPlugin());

    config.plugins.push(
      new webpack.DefinePlugin({
        __HASHVERSION__: "20190722",
        "process.env.DEV": JSON.stringify(options.dev),
        IN_BROWSER: !options.isServer,
        IS_DEV: options.dev,
        __CLIENT__: !options.isServer,
        __DEV__: options.dev
      }),
      new MonacoWebpackPlugin({
        output: "../../static",
        languages: [
          "json",
          "typescript",
          "css",
          "javascript",
          "html",
          "sql",
          "xml",
          "yaml",
          "rust",
          "markdown",
          "go",
          "graphql",
          "scala",
          "plaintext",
          "java"
        ],
        features: [
          "folding",
          "goToDefinitionMouse",
          "goToDefinitionCommands",
          "referenceSearch"
        ]
      })
    );

    config.module.rules.unshift({
      test: /\.worker\.ts/,
      use: {
        loader: "worker-loader",
        options: {
          name: "static/[hash].worker.js",
          publicPath: "/_next/"
        }
      }
    });

    config.output.globalObject = `this`;

    return config;
  },
  enableSvg: true,
  target: "server"
};

module.exports = withCSS(withLess(withFonts(withTypescript(config))));
