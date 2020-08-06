const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router(); 

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "bears";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET:', error);
        res.sendStatus(500);
    });
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;