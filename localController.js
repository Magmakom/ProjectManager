const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const senderController = require("./api/task/service");

exports.saveRecord = (request, callback) => {
    senderController.saveRecord(request, callback);
};

exports.obtainTypes = (callback) => {
    senderController.obtainTypes(callback);
};

exports.obtainRecords = (callback) => {
    senderController.obtainRecords(callback);
};

exports.closeTask = (request, callback) => {
    senderController.closeTask(request, callback);
};

exports.openTask = (request, callback) => {
    senderController.openTask(request, callback);
};

exports.obtainClosedToday = (callback) => {
    senderController.obtainClosedToday(callback);
};
