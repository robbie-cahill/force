// @ts-check

import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import webpack from "webpack"
import { env } from "../utils/env"

export const sharedPlugins = () => [
  new LodashModuleReplacementPlugin({
    collections: true,
    currying: true,
    flattening: true,
    guards: true,
    shorthands: true,
  }),

  new NodePolyfillPlugin(),

  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(env.nodeEnv),
    },
  }),
  // Remove moment.js localization files
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  // Remove server-only modules from client bundles
  // TODO: Why would these end up in the client bundle?
  new webpack.IgnorePlugin({ resourceRegExp: /^graphql(\/.*)?$/ }),

  new RetryChunkLoadPlugin({
    maxRetries: 5,
    cacheBust: `function() {
      return "cache-bust=" + Date.now();
    }`,
  }),
]
