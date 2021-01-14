import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import yargs from 'yargs'

const DIST_FOLDER = 'dist'

const generateArgs = () => {
  return yargs
    .option('port', {
      describe: 'Select a specific port',
      type: 'string',
    })
    .option('prod', {
      describe: 'Build code for production',
      type: 'boolean',
    })
    .option('base', {
      describe: 'Build code for production',
      type: 'string',
    })
    .help('help')
    .wrap(75).argv
}

const args = generateArgs()
const prod = args.prod === true

// Webpack configuration should be a default export
/* eslint-disable-next-line import/no-default-export */
export default {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('.', DIST_FOLDER),
    filename: 'main.js',
    publicPath: args.base ?? '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules\/(?!(practical-react-components\/*)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: prod,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, DIST_FOLDER),
    historyApiFallback: true,
    port: 9009,
  },
}
