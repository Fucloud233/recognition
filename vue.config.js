const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        https: true,
        port: 6061,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:6060/',
                changeOrigin: true,
                ws: false,
                secure: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
