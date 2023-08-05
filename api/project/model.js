"use strict";

const _ = require("lodash");
const dateFormat = require("dateformat");
const Logger = require("../../lib/log");
const logger = new Logger();
const mongoose = require("mongoose"),
    ObjectSchema = require("../object"),
    extend = require("mongoose-schema-extend"),
    Schema = mongoose.Schema,
    Project = ObjectSchema.Model.extend({
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
        },
        category: {
            type: String,
            enum: ["Internal", "External", "Home", "Other"],
            default: "Other",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Fast", "Urgent"],
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        close_date: {
            type: Date,
        },
    });

Project.post("save", function (doc) {
    logger.info(doc.constructor.modelName + " #" + doc.number + " was saved.");
});

Project.virtual("info").get(function () {
    return {
        _id: this._id,
        weight: this.weight,
        description: this.description,
        priority: this.priority,
        close_date: this.close_date
            ? dateFormat(this.close_date, "dd/mm/yyyy")
            : undefined,
        last_modified_date: dateFormat(this.last_modified_date, "dd/mm/yyyy"),
        created_date: dateFormat(this.created_date, "dd/mm/yyyy"),
    };
});

module.exports = mongoose.model("Project", Project);
