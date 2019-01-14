const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: {
       'bundle' : './src/app.js',
    },
    output : {
        path:path.resolve(__dirname, 'dist/static'),
        filename:`[name].js`,
    },
    plugins:[
        new CopyWebpackPlugin([
            {
                from:'./index.html',
                to:''
            },
            {
                from:'node_modules/leaflet/dist/leaflet.css',
                to:''
            }
        ]),
    ],
    module : {
        rules :
        [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name:'img/[name]_[hash:7].[ext]',
                    }
                }]
            }
        ]     
    },
    devServer:{
        historyApiFallback: true
    }
}