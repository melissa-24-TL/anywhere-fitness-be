const router = require("express").Router();
const Instructor = require('./instructorModel.js');
const db = require('../database/db-config.js');

// Get Requests

router.get("/", (req, res, next) => {
  Instructor.getClass()
      .then(clas => res.status(200).json(clas))
      .catch(err => next({ code: 500, message: "Error retrieving classes", err }));
});

// Post Request

router.post('/', (req, res) => {
  const classData = req.body;
  db('class')
    .insert(classData)
    .then(id => res.status(201).json({data: id, message: "Class has been added"}))
    .catch((err) => console.log(err));
});

// Put Request
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  db('class')
      .where('id', id)
      .update(changes)
      .then(count => {
          if (count > 0) {
              res.status(200).json({message: 'Record numbers changed', count });
          } else {
              res.status(404).json({message: 'that id does not exist'});
          }
      })
      .catch((err) => console.log(err));
});

// Delete Request
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db('class')
      .where('id', id)
      .delete()
      .then(count => {
          if (count > 0) {
              res.status(200).json({message: 'Number of records deleted', count});
          } else {
              res.status(404).json({message: 'That is not a valid id'});
          }
      })
      .catch((err) => console.log(err));
});



module.exports = router;