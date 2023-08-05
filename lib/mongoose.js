'use strict'

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

const Logger = require('./log');
const logger = new Logger();
const config = require('./config');

var uri = config.get('mongoose_remote:uri');

var options = {
    user: config.get('mongoose_remote:user'),
    pass: config.get('mongoose_remote:pass')
}

mongoose.Promise = global.Promise;
mongoose.connect(uri, options);

db.on('error', function (err) {
    logger.error('DB Connection error:', err.message);
});

db.once('open', function callback() {
    logger.info('Connected to DB!');
});

module.exports = mongoose;
