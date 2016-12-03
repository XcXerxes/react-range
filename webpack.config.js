const webpack=require("webpack");
const WebpackHtmlPlugin=require("webpack-html-plugin");
const isDebug=global.DEBUG===false?false:process.argv.includes('--release');
const config={
    entry:__dirname+"/src/index.js",
    output:{
        filename:"bundle.js",
        path:__dirname+"/public"
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel",
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:"style!css!postcss"
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    devServer:{
      contentBase:"./public"  
    },
    devtool:isDebug?"source-map":false,
    postcss:[
        require("autoprefixer")({ browsers: ['last 10 versions'] })
    ],
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
          __DEV__: isDebug,
        }),
    ]
}
if(!isDebug){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    );
}
if(isDebug){
    config.unshift(new webpack.HotModuleReplacementPlugin());
}
module.exports=config;