"use strict";

const router = require("express").Router();

module.exports = function() {

    router.post("/v1/upload", (req, res, next) => {
        res.json("HELLO WORLD");
    });

    return router;
};