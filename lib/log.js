'use strict'

const projectname = require('../package').name;
const stackTrace = require('stack-trace');
const util = require('util');
const path = require('path');
const clc = require('cli-color');
const _ = require('lodash');

var defaultOptions = {
    time: true,
    path: false,
    trace: false
};

var levelMapping = {
    "log": clc.cyanBright,
    "info": clc.blue,
    "error": clc.red,
    "warn": clc.yellow,
    "green": clc.green,
    "red": clc.red
};

module.exports = class Logger {
    constructor() {
        function generateLogFunction(level) {
            return function (message, customLevel, customColor, meta) {
                var d = new Date();
                var mes = "";
                mes += defaultOptions.time ? ('[' + formatDateTime(d) + "] ") : "";
                mes += defaultOptions.path ? (this.module + " ") : "";
                mes += levelMapping[customColor ? customColor.toLowerCase() : level.toLowerCase()](customLevel ? customLevel.toUpperCase() : level.toUpperCase()) + ": ";
                mes += message;
                if (defaultOptions.trace && level == 'Error') mes += this.trace;
                if (meta) mes += "  " + util.inspect(meta) + " ";
                mes += '\n';
                this.write(mes);
            }
        };

        // TODO: modify trace logic PLEASE
        let traceString = '';
        _.forEach(stackTrace.get(), (value) => {
            traceString += '\n\tat ' + value;
        });
        this.trace = traceString;
        this.filename = stackTrace.get()[1].getFileName();
        this.module = projectname + path.sep + path.relative(__dirname + "/..", this.filename);
        this.streams = [process.stdout];

        this.log = generateLogFunction('Log');
        this.info = generateLogFunction('Info');
        this.error = generateLogFunction('Error');
        this.warn = generateLogFunction('Warning');
    }

    write(d) {
        this.streams.forEach((stream) => {
            stream.write(d);
        });
    }
}

function formatDateTime(dateTime) {
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var date = dateTime.getDate();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var seconds = dateTime.getSeconds();
    var milliseconds = dateTime.getMilliseconds();
    return pad(date, 2) + '.' + pad(month, 2) + ' ' + pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ':' + pad(milliseconds, 3);
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
