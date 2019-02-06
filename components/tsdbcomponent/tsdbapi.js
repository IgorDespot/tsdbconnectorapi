"use strict";

const router = require("express").Router();

const { createData } = require("./tsdbcontroller");

module.exports = function() {

    router.post("/v1/upload", (req, res, next) => {

        const contextObject = {
            file: req.files[0].filename
        };

        createData(contextObject)
            .then( (response) => {
                res.json(response[0].data)
            })
            .catch( (err) => res.json(err));
         
    });

    return router;
};