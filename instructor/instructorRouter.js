const router = require("express").Router();
const Class = require('./instructorModel');
const validate = require("../auth/validate.js");
const {checkInstructor} = require('./instructorMiddleware');


router.use(checkInstructor);
router.use("/:id", validate.user);


router.post('/', validate.loggedon, (req, res) => {
  const data = req.body;

  Class.addClass(data)
    .then(classes => {
      res.status(200).json({data: classes});
    })
    .catch(err => {
      res.status(500).json({message: 'could not add', error: err.message});
    });
});

router.put('/:id', validate.loggedon, (req, res) => {
  const changes = req.body;
  const {id} = req.params;

  Class.updateClass(id, changes)
    .then(clas => {
      if (clas) {
        res.status(200).json({clas});
      } else {
        res.status(404).json({error: 'please provide right information'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error updating', error: err.message});
    });
});

router.delete('/:id', validate.loggedon, (req, res) => {
  const {id} = req.params;

  Class.removeClass(id)
    .then(clas => {
      if (clas) {
        res.status(200).json({data: clas, message: 'class deleted'});
      } else {
        res.status(404).json({error: 'please provide correct id'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Error deleting class'});
    });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  Class.getClassById(id)
    .then(clas => {
      res.status(200).json({clas});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

router.get('/', (req, res, next) => {
  Class.getClass()
    .then(clas => res.status(200).json(clas))
    .catch(err => next({code: 500, message: "Error getting your classes", err}));
});

module.exports = router;