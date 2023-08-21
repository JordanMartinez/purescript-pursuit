const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const clientAppDir = path.resolve(__dirname, "src", "client", "app");
const appIndex = path.resolve(clientAppDir, "index.js");
const appHtml = path.resolve(clientAppDir, "index.html");
const postcssConfig = path.resolve(__dirname, "postcss.config.js");
const psOutputDir = path.resolve(__dirname, isProduction ? "output-es" : "output");
const distDir = path.resolve(__dirname, "dist");
const distClientDir = path.resolve(distDir, "client");

const baseProdDevArray = (base, prod, dev) => {
  return isProduction ? [ ...base, ...prod ] : [ ...base, ...dev ];
}

const config = {
  entry: appIndex,
  output: {
    path: distClientDir,
    filename: isProduction ? "[contenthash].[ext]" : "[name].[ext]",
  },
  resolve: {
    alias: {
      output: psOutputDir,
    },
  },
  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: "all",
    },
  },
  target: "browserslist",
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
  },
  devtool: isProduction ? "hidden-source-map" : "cheap-module-source-map",
  mode: isProduction ? "production" : "development",
  plugins: baseProdDevArray(
    [
      new HtmlWebpackPlugin({
        template: appHtml,
      }),
    ],
    [
      new MiniCssExtractPlugin({ filename: "[contenthash].[ext]"}),
    ],
    [],
  ),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: postcssConfig,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: `static/${isProduction ? "[contenthash]" : "[name]"}.[ext][query]`,
        },
      }
    ],
  },
};

module.exports = () => {
  return config;
};
