const express = require('express');
const user = require('./userDb');

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  user.add(req.body)
    .then(response => {
      return res.status(201).json(res)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  post.add({ text: req.body.text, user_id: req.user.id })
  .then(response => {
    return res.status(201).json(res)
  })
  .catch(next)
});

router.get('/', (req, res, next) => {
  user.get(req.body)
    .then(response => {
      return res.status(201).json(response)
    })
    .catch(next)
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)

});

router.get('/:id/posts', (req, res, next) => {
  user.findById(req.user.id)
  .then(response => {
    if (response) {
				res.status(200).json(response)
			} else {
				res.status(404).json({
					message: "Not found",
				})}
  })
  .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  user.remove(req.user.id)
  .then(() => {
    res.status(200).json({ message: 'EXTERMINATE!' })
  })
  .catch(next)
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  user.update(req.user.id, req.body)
  .then(() => {
    res.status(200).json({ message: 'CREATION!' })
  })
  .catch(next)
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    user.getById(req.params.id)
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(400).json({ message: "User Not Valid! Must EXTERMINATE!" })
          }
        })
        .catch(error => {
          next(error)
        })
  }

}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "You are missing user data" })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "You are missing user data" })
    }
    next()
  }
}

module.exports = router;
