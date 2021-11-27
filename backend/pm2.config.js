module.exports = {
    apps: [{
        name: 'serverAPI',
        script: 'src/server.js',
        node_args: '-r dotenv/config'
    }],
}
