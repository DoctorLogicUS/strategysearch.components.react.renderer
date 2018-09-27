module.exports = {
    target: "node",
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: __dirname + "/dist",
        libraryTarget: 'umd'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
    externals: {
        react: 'react'
    }
};