"use strict";

const csvparser = require("csvtojson/v2");
const fs = require("fs");
const axios = require("axios");

async function createData(contextObject) {
    try {
        let data = await parseData(contextObject);

        let chunkedData = chunk(data, 2);

        let final = [];

        for (let single of chunkedData) {
            final.push(writeDataToTsdb(single))
        }

        let result = Promise.all(final)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

        fs.unlink(`upload/${contextObject.file}`,(err) => {
            if (err) throw err;
            console.log(`Removed file: ${contextObject.file}`)
        })

        return result;
    } catch (error) {
        throw error;
    }
}

async function parseData(contextObject) {
    var parseData = csvparser({ delimiter: ";", checkType: true }).fromFile(`upload/${contextObject.file}`)
                    .then((result) => { return result })
                    .catch((error) => { throw error });
    return parseData;
}

async function writeDataToTsdb(data) {
    return axios({
        url: "http://localhost:4242/api/put?details&summary",
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        data: data,
        responseType: 'json'
      });
};

function chunk(array, size) {
    const chunks = [];
    let index = 0;

    while (index < array.length) {
        chunks.push(array.slice(index, index + size));
        index += size;
    }

    return chunks;
}

// let chunk = (array, size) => {
//     const chunks = [];
//     let index = 0;
    
//     while (index < array.length) {
//         chunks.push(array.slice(index, index + size));
//         index += size;
//     }

//     return chunks;
// }

module.exports = {
    createData
}