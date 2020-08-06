const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

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
koalaRouter.post('/', (req, res) => {
    let newBear = req.body;
    console.log('adding bear', newBear);
    let queryText = ` INSERT INTO "bears" ("name", "gender", "age", "ready_to_transfer","notes")
     VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [newBear.name, newBear.gender, newBear.age, newBear.ready_to_transfer, newBear.notes])
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in adding bear', error);
            res.sendStatus(500);
        })
})

// PUT
koalaRouter.put('/:id', (req, res) => {
    let bear = req.body; // bear with new content
    let bearStatus = bear.ready_to_transfer;
    let id = req.params.id;  //bear id
    console.log(`updating pick-up status of bear id: ${id} with ${bearStatus}`);

    let queryText = '';
    if (bearStatus === 'No') {
    queryText = `
                UPDATE "bears"
                SET "status" = 'Yes'
                WHERE "id" = $1
                `
    } else if (bearStatus === 'Yes'){
      queryText = `
                UPDATE "bears"
                SET "status" = 'No'
                WHERE "id" = $1
                `
    }
    
  pool.query(queryText, [req.params.id]).then(result => {
    console.log(result);
    res.sendStatus(201);
  }).catch(error => {
    console.log('error in post', error);
    res.sendStatus(500);
  })
});

// DELETE

module.exports = koalaRouter;