"use strict";

const config = require("../../lib/config");

const moment = require("moment");
const request = require("request");
const _ = require("lodash");
const Project = require("./model");

const priority = {
    Low: 1,
    Medium: 2,
    High: 4,
    Fast: 8,
    Urgent: 16,
};

exports.obtain_projects = function (filter, callback) {
    Project.find(filter)
        .limit(50)
        .exec((err, found_projects) => {
            if (err) logger.error(err);
            if (found_projects) {
                let return_info = [];
                _.forEach(found_projects, (proj) => {
                    return_info.push(proj.info);
                });
                callback(err, return_info);
            }
        });
};

// exports.saveRecord = function (request, callback) {
//     let taskId = request.taskId;
//     let priority = request.priority;
//     let description = request.description;
//     let deleted = request.deleted;

//     if (taskId) {
//         Task.findById(taskId).exec((err, found_task) => {
//             if (err) logger.error(err);
//             if (found_task) {
//                 found_task.description = description;
//                 found_task.priority = priority;
//                 found_task.deleted = deleted;
//                 found_task.save((err, saved_task) => {
//                     if (err) logger.error(err);
//                     callback(err, [saved_task.info]);
//                 });
//             }
//         })
//     } else {
//         let new_task = new Task({
//             'description': request.description,
//             'priority': request.priority
//         });

//         new_task.save((err, saved_task) => {
//             if (err) logger.error(err);
//             callback(err, [saved_task.info]);
//         });
//     }
// }

// exports.obtainRecords = function (callback) {
//     Task
//         .find({
//             close_date: null,
//             deleted: { $ne: true }
//         })
//         .limit(20)
//         .exec((err, obtained_tasks) => {
//             let taks_info_list = [];
//             if (err) logger.error(err);
//             _.forEach(obtained_tasks, (val) => {
//                 val.weight = (daysBetween(new Date(moment(val.created_date, "DD.MM.YYYY")), new Date()) + 1) * priority[val.priority]
//                 taks_info_list.push(val.info);
//             })
//             taks_info_list.sort(function (a, b) {
//                 return b.weight - a.weight;
//             });
//             callback(err, taks_info_list);
//         })
// }

// exports.obtainClosedToday = function (callback) {
//     let start = new Date();
//     start.setHours(0, 0, 0, 0);

//     let end = new Date();
//     end.setHours(23, 59, 59, 999);

//     Task
//         .find({
//             close_date: {
//                 $gte: start,
//                 $lt: end
//             }
//         })
//         .limit(20)
//         .exec((err, obtained_tasks) => {
//             let taks_info_list = [];
//             if (err) logger.error(err);
//             _.forEach(obtained_tasks, (val) => {
//                 taks_info_list.push(val.info);
//             })
//             taks_info_list.sort(function (a, b) {
//                 return priority[b.priority] - priority[a.priority];
//             });
//             callback(err, taks_info_list);
//         })
// }

// exports.closeTask = function (request, callback) {
//     Task
//         .findById(request.id)
//         .exec((err, task_to_close) => {
//             if (err) logger.error(err);
//             task_to_close.close_date = new Date();
//             task_to_close.save((err, saved_task) => {
//                 callback(err, saved_task);
//             });
//         })
// }

// exports.openTask = function (request, callback) {
//     Task
//         .findById(request.id)
//         .exec((err, task_to_open) => {
//             if (err) logger.error(err);
//             task_to_open.close_date = null;
//             task_to_open.save((err, saved_task) => {
//                 callback(err, saved_task);
//             });
//         })
// }

exports.obtainTypes = function (callback) {
    callback(_.keys(priority));
};

function daysBetween(date1, date2) {
    let one_day = 1000 * 60 * 60 * 24;
    let difference_ms = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(difference_ms / one_day);
}
