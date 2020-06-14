const express = require('express');
const actionDb = require('./actionModel');
const projectDb = require('./projectModel');
const router = express.Router();


//============
//   CREATE new action by project ID
//=============
router.post('/:id', validateBody(), (req,res) => {
  const id = req.params.id
  const { description, notes } = req.body

  actionDb.insert({ project_id: id, description, notes })
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      next(error)
    })
})

//===================
//  READ all actions BY project ID
//==================
router.get('/:id', validateProjId(), (req, res) => {
  projectDb.get(req.params.id)
  // actionDb.get(req.params.id)
  .then(p => {
    if(p){
      return res.status(200).json(p.actions)
    }
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving project"})
  })
});
//=================
//   DELETE a projects action by action ID
//===================
router.delete('/:id', validateActId(), (req, res) => {
  actionDb.remove(req.params.id)
  .then(a => {
    res.status(200).json({ID: req.params.id, message: a })
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving action"})
  })
});
//================
//  UPDATE by action ID
//=================
router.put('/:id', validateActId(), validateBody(), (req, res) => {
  actionDb.update(req.params.id, req.body)
  .then(a => {
    if(a){
      return res.status(200).json(a)
    }
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving action"})
  })
});

// custom middleware

function validateProjId(req, res, next) {
  return (req, res, next) => {
		projectDb.get(req.params.id)
			.then(p => {
				if (p) {
					req.project = p;
					next();
				} else {
					res.status(404).json({ message: `Project with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validateActId(req, res, next) {
  return (req, res, next) => {
		actionDb.get(req.params.id)
			.then(a => {
				if (a) {
					req.action = a;
					next();
				} else {
					res.status(404).json({ message: `Action with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validateBody() {
  return (req, res, next) => {
    if(req.body && req.body.notes && req.body.description){
      next()
    }else{
      res.status(400).json({ message: "missing project data" })
    }
  }
}

module.exports = router;