module.exports = {
    devServer: {
        proxy: {
            // '/add': {
            //     target: 'http://localhost:3000/add',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/add': ''
            //       }
            //   },
            //   '/del': {
            //     target: 'http://localhost:3000/del',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/del': ''
            //       }
            //   },
              '/api': {
              target: 'http://localhost:3000/api',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          }
      },
};