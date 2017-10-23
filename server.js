import express from 'express'
import graphqlHTTP from 'express-graphql'
import path from 'path'
import webpack from 'webpack'
import WebPackDevServer from 'webpack-dev-server'
import { schema } from './data/schema'

const APP_PORT = 3000
const GRAPHQL_PORT = 8080

const graphQLServer = express()

graphQLServer.use('/', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
}))
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`graphQLServer server on localhost:${GRAPHQL_PORT}`))

const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'scr', 'App.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  output: {filename: 'App.js', path: '/'}
})

const app = new WebPackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'graphql': `http://localhost:${APP_PORT}`},
  publicPath: '/src',
  stats: {colors: true},
})

app.use('/', express.static(path.resolve(__dirname, 'public')))
app.listen(APP_PORT, () => console.log(`app server on localhost:${APP_PORT}`))
