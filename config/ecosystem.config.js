module.exports = {
  apps: [{
    name: 'myapp',                                 // the name PM2 shows in `pm2 list`
    script: 'app.js',                              // the file PM2 runs
    env: { NODE_ENV: 'production', PORT: 8080 }    // environment variables passed to the app
  }]
};
