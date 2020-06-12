const path = require("path");
const env = process.env.NODE_ENV;
const isDevelopmentEnv = env === 'development';

module.exports = {
    outputDir: isDevelopmentEnv ? path.resolve(__dirname, "dist/") : path.resolve(__dirname, "docs/"),
    publicPath: isDevelopmentEnv ? path.resolve(__dirname, "./") : "./musicapp",
}
