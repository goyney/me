import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, eng, helpers) => {
  // Set global variables
  config.plugins.push(
    new webpack.DefinePlugin({
      config: {
        baseUrl: JSON.stringify('https://www.irigoyen.dev')
      }
    })
  );

  // Override CSS modules class names
  const cssClassIdentName = process.env.BUILD_ID ? '[hash:base64:5]' : '[path][name]__[local]';
  config.module.rules[4].use[1].options.modules.localIdentName = cssClassIdentName;

  // Inject the GitHub build ID
  const { plugin: HtmlWebpackPlugin } = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0] || {};
  if (HtmlWebpackPlugin) {
    HtmlWebpackPlugin.options.meta.version = process.env.BUILD_ID || 'dev';
  }

  // Copy assets to the root
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, 'src/assets'),
          from: '*'
        }
      ]
    })
  );

  // Don't hash woff files so we can preload them
  const { rule: fileLoader } = helpers.getLoadersByName(config, 'file-loader')[0] || [];
  if (fileLoader) {
    fileLoader.options = {
      name(resourcePath) {
        if (path.extname(resourcePath).match(/.woff2?/)) {
          return '[name].[ext]';
        }

        return '[contenthash].[ext]';
      }
    };
  }
};
