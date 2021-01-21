import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import { createServer } from 'net'

const DIST_FOLDER = 'dist'
const PORT = 8080

// Check if port is open, if not increase by 1 until open port is found
const getNextFreePort = async (port: number): Promise<number> => {
  return new Promise<number>(resolve => {
    const tmpServer = createServer()

    tmpServer.listen(port, () => {
      tmpServer.close()
      resolve(port)
    })

    tmpServer.on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE') {
        tmpServer.close()
        port = 1 + port
        tmpServer.listen(port)
      }
    })
  })
}

interface Args {
  readonly port?: string
  readonly prod?: boolean
  readonly base?: string
}

// Webpack configuration should be a default export
/* eslint-disable-next-line import/no-default-export */
export default async (env: Record<string, string> = {}) => {
  const args = Object.keys(env).reduce<Args>((acc, key) => {
    const value = env[key]

    if (key === 'prod') {
      return {
        ...acc,
        [key]: value === 'true',
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})

  const prod = args.prod === true
  const port = await getNextFreePort(
    args.port !== undefined ? parseInt(args.port) : PORT
  )

  return {
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
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
              },
            },
            '@mdx-js/loader',
          ],
        },
        {
          test: /\.svg$/,
          use: 'svg-url-loader',
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
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
      port,
      host: '0.0.0.0',
      disableHostCheck: true,
    },
  }
}
