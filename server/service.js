"use strict";

const service = require("express")();

const { tsdbApi } = require("../components/tsdbcomponent");
const multer = require("multer");

module.exports = function() {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
      });
      
    service.use(multer({
        storage: storage,
        limits: {
          fileSize: Infinity
        }
      }).any());

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