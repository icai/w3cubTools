const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withLess = require("@zeit/next-less");
const withFonts = require("next-fonts");
const path = require("path");

const config = {
  webpack(config, options) {
    const defaultLoaders = options.defaultLoaders;
    config.node = {
      fs: "empty",
      module: "empty",
      net: "mock",
      tls: "mock"
    };

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

    // config.module.rules.push(
    //   {
    //     test: /\.css$/,
    //     use: [
    //       defaultLoaders.babel,
    //       {
    //         loader: require('styled-jsx/webpack').loader,
    //         options: {
    //           type: 'global'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     test: /\.svg$/,
    //     use: [
    //       {
    //         loader: '@svgr/webpack'
    //       }
    //     ]
    //   }
    // )
    // config.module.rules.push({
    //   test: /\.less$/,
    //   use: [
    //     defaultLoaders.babel,
    //     {
    //       loader: require('styled-jsx/webpack').loader,
    //       options: {
    //         type: 'scoped'
    //       }
    //     },
    //     'less-loader'
    //   ]
    // })

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

    config.output.globalObject = 'typeof self !== "object" ? self : this';

    // Temporary fix for https://github.com/zeit/next.js/issues/8071
    config.plugins.forEach(plugin => {
      if (plugin.definitions && plugin.definitions["typeof window"]) {
        delete plugin.definitions["typeof window"];
      }
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@styles": path.join(__dirname, "styles"),
      "@components": path.join(__dirname, "components"),
      "@constants": path.join(__dirname, "constants"),
      "@workers": path.join(__dirname, "workers"),
      "@utils": path.join(__dirname, "utils"),
      "@hooks": path.join(__dirname, "hooks"),
      "@assets": path.join(__dirname, "assets")
    };

    return config;
  },
  enableSvg: true,
  // cssModules: true,
  target: "server"
};

module.exports = withCSS(withLess(withFonts(config)));
