const router = require("express").Router();
const Instructor = require('../instructor/instructorModel');
const db = require('../database/db-config.js');

// Get Requests

router.get("/", (req, res, next) => {
  Instructor.getClass()
      .then(clas => res.status(200).json(clas))
      .catch(err => next({ code: 500, message: "Error retrieving classes", err }));
});

// Post Request



// Put Request


// Delete Request




module.exports = router;