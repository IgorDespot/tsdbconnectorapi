"use strict";

const service = require("express")();

const { tsdbApi } = require("../components/tsdbcomponent");

module.exports = function() {

    service.use("/", tsdbApi);

    service.use((req, res, next) => {
        const error = new Error("Requested route not found");
        error.status = 404;
        next(error);
    });

    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json(error.message);
    });

    return service;
};