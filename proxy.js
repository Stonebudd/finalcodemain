const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiProxy = createProxyMiddleware('/api', {
    target: 'http://192.168.20.29:5001',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
});

app.use('/api', apiProxy);

const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
