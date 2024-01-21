const path = require("path");
const webpack = require("webpack");

const config = {
  // https://github.com/vercel/next.js/blob/canary/packages/next/src/build/webpack/plugins/define-env-plugin.ts
  env: {
    HASHVERSION: "20240114"
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, options) {

    const customConfig = {
      resolve: {
        fallback: {
          dgram: false,
          fs: false,
          net: false,
          tls: false,
          child_process: false
        }
      }
    };
    config.resolve = {
      ...config.resolve,
      ...customConfig.resolve
    };

    // experiments.asyncWebAssembly: true
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true
    };

    const { isServer } = options;
    const assetPrefix = "";
    const enableSvg = true;
    const limit = config.inlineFontLimit || 8192;
    // let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)$/;
    let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;
    if (enableSvg)
      testPattern = /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/;
    config.module.rules.push({
      test: testPattern,
      // Next.js already handles url() in css/sass/scss files
      issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit,
            fallback: require.resolve("file-loader"),
            publicPath: `${assetPrefix}/_next/static/chunks/fonts/`,
            outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
            filename: "[name]-[fullhash].[ext]"
          }
        }
      ]
    });

    // config.module.rules.push({
    //   test: /\.wasm$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //     },
    //   ],
    // })

    const defaultLoaders = options.defaultLoaders;

    // config.module.rules.push({
    //   test: /\.scss$|\.css$/,
    //   use: [
    //     defaultLoaders.babel,
    //     {
    //       loader: require("styled-jsx/webpack").loader,
    //       options: {
    //         type: "scoped"
    //       }
    //     },
    //     "sass-loader"
    //   ]
    // });

    config.module.rules.unshift({
      test: /\.worker\.ts/,
      use: {
        // path.resolve(__dirname, "scripts/loader/worker-loader.js"),
        loader: 'worker-loader',
        options: {
          filename: "static/[chunkhash].worker.js",
          publicPath: "/_next/"
        }
      }
    });
    config.module.rules.unshift({
      test: /\.md$/,
      exclude: /node_modules/,
      use:[
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {}
      }]
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.join(__dirname),
      "@md": path.join(__dirname, "md"),
      // "@styles": path.join(__dirname, "styles"),
      "@components": path.join(__dirname, "components"),
      "@constants": path.join(__dirname, "constants"),
      "@workers": path.join(__dirname, "workers"),
      "@utils": path.join(__dirname, "utils"),
      "@hooks": path.join(__dirname, "hooks"),
      "@assets": path.join(__dirname, "assets"),
      "@static": path.join(__dirname, "static")
    };

    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";

    return config;
  }
  // target: "server"
};

module.exports = config;
