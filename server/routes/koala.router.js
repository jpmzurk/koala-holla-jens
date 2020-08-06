const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET


// POST


// PUT
koalaRouter.put(':id', (req, res) => {
    let bear = req.body; // bear with new content
    let bearStatus = bear.ready_to_transfer;
    let id = req.params.id;  //bear id
    console.log(`updating pick-up status of ${id} with ${bearStatus}`);

    let queryText = '';
    

    if (bookStatus === 'No') {
    queryText = `
                UPDATE "bears"
                SET "status" = 'Yes'
                WHERE "id" = $1
                `
    } else if (bookStatus === 'Yes'){
      queryText = `
                UPDATE "bears"
                SET "status" = No'
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