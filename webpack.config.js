const path = require("path");
const { generateWebpackConfig } = require("@simplrjs/webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = generateWebpackConfig({
    devServerPort: 4000,
    entryFile: "./src/app.tsx",
    staticContentDirectory: "./src/static",
    outputDirectory: "./dist/wwwroot",
    emitHtml: true,
    htmlOptions: {
        title: "Credit card"
    },
    projectDirectory: __dirname
});

if (config.plugins == null) {
    config.plugins = [];
}

config.plugins.push(
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, "web.config"),
            to: path.resolve(__dirname, "dist", "web.config"),
            toType: "file"
        }
    ])
);

config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)\/(webpack-dev-server)/
});

module.exports = config;
