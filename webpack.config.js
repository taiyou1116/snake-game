// webpack.config.js
module.exports = {
    entry: './main.js',  // エントリーポイント
    output: {
      filename: 'bundle.js',  // 出力ファイル名
      path: __dirname + '/dist'  // 出力ディレクトリ
    }
  };
  