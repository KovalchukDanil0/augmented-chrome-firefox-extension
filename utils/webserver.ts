import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../webpack.config";
import env from "./env";

config.devtool = "cheap-module-source-map";

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    https: false,
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: "sockjs",
    },
    webSocketServer: "sockjs",
    host: "localhost",
    port: env.PORT,
    static: {
      directory: path.join(__dirname, "../build"),
    },
    devMiddleware: {
      publicPath: `http://localhost:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  compiler,
);

(async () => {
  await server.start();
})();
