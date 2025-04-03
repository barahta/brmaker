function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://192.168.0.166:3010');
    next()
}

module.exports = cors