const express = require('express');
const { Router } = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "bears" ORDER BY "id"; `;
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
    let queryText = ` INSERT INTO "bears" ("name", "age", "gender", "ready_to_transfer","notes")
     VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [newBear.name, newBear.age, newBear.gender, newBear.ready_to_transfer, newBear.notes])
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in adding bear', error);
            res.sendStatus(500);
        })
})

// PUT
koalaRouter.put('/', (req, res) => {
    let bear = req.body; // bear with new content
     console.log(bear);
     
    let bearStatus = bear.ready_to_transfer;
    let id = bear.id;  
    console.log(`updating pick-up status of bear id: ${id} with ${bearStatus}`);

    let queryText = '';
    if (bearStatus === 'No') {
    queryText = `
                UPDATE bears
                SET ready_to_transfer = 'Yes'
                WHERE id = $1
                `
    } else if (bearStatus === 'Yes'){
      queryText = `
                UPDATE bears
                SET ready_to_transfer = 'No'
                WHERE id = $1
                `
    }
    
  pool.query(queryText, [id]).then(result => {
    console.log(result);
    res.sendStatus(201);
  }).catch(error => {
    console.log('error in post', error);
    res.sendStatus(500);
  })
});

// RE-PUT
koalaRouter.put('/reSubmit', (req, res) => {
  let bear = req.body; // bear with new content
  console.log('in reput router');
  
  console.log(bear);

  let queryText = '';
 
  queryText = `
              UPDATE bears
              SET name = $1,
                  age = $2,
                  gender = $3,
                  notes = $4
              WHERE id = $5
              ;`
  
  pool.query(queryText, [bear.name, Number(bear.age), bear.gender, bear.notes, Number(bear.id)]).then(result => {
    console.log(result);
    res.sendStatus(201);
  }).catch(error => {
    console.log('error in post', error);
    res.sendStatus(500);
  });

});


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    let id = req.params.id; 
    console.log(`DELETING bear id: ${id}`);

    let queryText  =`
                DELETE FROM bears
                WHERE id = $1;
                `;
  pool.query(queryText, [req.params.id]).then(result => {
    console.log(result);
    res.sendStatus(201);
  }).catch(error => {
    console.log('error in post', error);
    res.sendStatus(500);
  })
});

module.exports = koalaRouter;