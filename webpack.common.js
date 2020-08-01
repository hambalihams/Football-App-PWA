const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: "index.html",
          template: "./src/index.html"
      }),
      new HtmlWebpackPlugin({ 
          filename: 'pages/home.html',
          template: './src/assets/pages/home.html',
          skipAssets: [/main.*.js/]
      }),
      new HtmlWebpackPlugin({ 
        filename: 'pages/competitions.html',
        template: './src/assets/pages/competitions.html',
        skipAssets: [/main.*.js/]
      }),
      new HtmlWebpackPlugin({ 
        filename: 'pages/saved.html',
        template: './src/assets/pages/saved.html',
        skipAssets: [/main.*.js/]
      }),
      new HtmlWebpackPlugin({ 
        filename: 'pages/schedule.html',
        template: './src/assets/pages/schedule.html',
        skipAssets: [/main.*.js/]
      }),
      new HtmlWebpackSkipAssetsPlugin(),
      new WebpackPwaManifest({
        name: 'Football App',
        short_name: 'FBL App',
        description: 'Information Schedule Football',
        background_color: '#b2dfdb',
        theme_color: '#b2dfdb',
        display: 'standalone',
        start_url: '/index.html',
        orientation: 'portrait',
        fingerprints: false,
        inject: true,
        ios: true,
        gcm_sender_id: "1079722738342",
        icons: [
          {
            src: path.resolve('src/assets/img/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('img', 'icon')
          },
          {
            src: path.resolve('src/assets/img/maskable_icon.png'),
            size: '1024x1024',
            destination: path.join('img', 'icon'),
            purpose: 'any maskable'
          },
          {
            src: path.resolve('src/assets/img/icon-ios.png'),
            sizes: [120, 152, 167, 180],
            destination: path.join('img', 'icon', 'ios'),
            ios: true
          }
        ]
      }),
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "sw.js"
      }),
  ]
};