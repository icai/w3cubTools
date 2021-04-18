// const withCSS = require("@zeit/next-css");
// const withLess = require("@zeit/next-less");
// const withFonts = require("next-fonts");
const path = require("path");
const webpack = require("webpack");
// const withTM = require('next-transpile-modules')(['monaco-editor'])
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const config = {
  webpack(config, options) {

    const { isServer } = options;
    const assetPrefix = '';
    const enableSvg = true;
    const limit = config.inlineFontLimit || 8192;
    // let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)$/;
    let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;
    if (enableSvg) testPattern = /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/;
    config.module.rules.push({
      test: testPattern,
      // Next.js already handles url() in css/sass/scss files
      issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit,
            fallback: require.resolve('file-loader'),
            publicPath: `${assetPrefix}/_next/static/chunks/fonts/`,
            outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    });

  //   const rule = config.module.rules
  //   .find(rule => rule.oneOf)
  //   .oneOf.find(
  //     r =>
  //       // Find the global CSS loader
  //       r.issuer && r.issuer.include && r.issuer.include.includes("_document")
  //   );
  // if (rule) {
  //   rule.issuer.include = [
  //     rule.issuer.include,
  //     // Allow `monaco-editor` to import global CSS:
  //     /[\\/]node_modules[\\/]monaco-editor[\\/]/
  //   ];
  // }

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
        output: "../../public/static/monaco",
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
          "java",
          "pug"
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
    config.module.rules.unshift({
      test: /\.md$/,
      exclude: /node_modules/,
      use: [defaultLoaders.babel, "markdown-to-react-loader"]
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
      "@md": path.join(__dirname, "md"),
      "@styles": path.join(__dirname, "styles"),
      "@components": path.join(__dirname, "components"),
      "@constants": path.join(__dirname, "constants"),
      "@workers": path.join(__dirname, "workers"),
      "@utils": path.join(__dirname, "utils"),
      "@hooks": path.join(__dirname, "hooks"),
      "@assets": path.join(__dirname, "assets")
    };

    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";

    return config;
  },
  // enableSvg: true,
  // cssModules: true,
  target: "server"
};

module.exports = config;
