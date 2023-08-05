'use strict'

const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

let ObjectModel = new Schema({
    number: {
        type: Number
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    last_modified_date: {
        type: Date,
        default: new Date()
    }
});

ObjectModel.plugin(autoIncrement.plugin, {
    model: 'ObjectModel',
    field: 'number',
    startAt: 0,
    incrementBy: 1
});

exports.Model = ObjectModel;
