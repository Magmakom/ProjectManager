"use strict";

const lc = require("electron").remote.require("./localController");

function init_settings() {
    lc.get_settings(function (response) {
        if (response.error == null) {
            // Project data
            var selectList = document.getElementsByClassName("priorityList");
            selectList[0].innerHTML = "";
            types.forEach(function (type) {
                addOption(selectList[0], type, type);
            });
            initDefault();
        } else {
            console.log("ERROR: " + response.error.message);
        }
    });
}
