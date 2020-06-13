const express = require('express');
const db = require('./projectModel');
const router = express.Router();


//============
//   CREATE
//=============
router.post('/', validateBody(), (req,res) => {
  db.insert(req.body)
  .then(p =>{
    if(p){
    return  res.status(200).json(p)
    }
  })
  .catch( err => {
    res.status(500).json({message: "error retrieving project"})
  })
})
//================
//READ
//================
router.get('/', (req, res) => {
  db.get()
  .then(p =>{
    if(p){
    return  res.status(200).json(p)
    }
  })
  .catch( err => {
    res.status(500).json({message: "error retrieving project"})
  })
});
//===================
//  READ BY ID
//==================
router.get('/:id', validatePostId(), (req, res) => {
  db.get(req.params.id)
  .then(p => {
    if(p){
      return res.status(200).json(p)
    }
  })
  .catch(err => {
    res.status(500).json({message: "Error retrieving project"})
  })
});
//=================
//   DELETE by ID
//===================
// router.delete('/:id', validatePostId(), (req, res) => {
//   db.remove(req.params.id)
//   .then(post => {
//     res.status(200).json({postID: req.params.id, post: post })
//   })
//   .catch(err => {
//     res.status(500).json({message: "Error retrieving post"})
//   })
// });

// router.put('/:id', (req, res) => {
//   db.update(req.params.id, req.body)
//   .then(post => {
//     if(post){
//       return res.status(200).json(post)
//     }
//   })
//   .catch(err => {
//     res.status(500).json({message: "Error retrieving post"})
//   })
// });

// custom middleware

function validatePostId(req, res, next) {
  return (req, res, next) => {
		db.get(req.params.id)
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

function validateBody() {
  return (req, res, next) => {
    if(req.body && req.body.name && req.body.description){
      next()
    }else{
      res.status(400).json({ message: "missing project data" })
    }
  }
}

module.exports = router;