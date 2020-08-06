const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
koalaRouter.post('/', (req, res) => {
    let newBear = req.body;
    console.log('adding bear', newBear);
    let queryText = ` INSERT INTO "bears" ("name", "gender", "age", "ready_to_transfer","notes")
     VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [newBear.name, newBear.gender, newBear.age, newBear.readyForTransfer, newBear.notes])
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in adding bear', error);
            res.sendStatus(500);
        })
})

// PUT


// DELETE

module.exports = koalaRouter;