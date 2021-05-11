const express = require('express');
const Todo = require('../models/Todo.model');
const router = express.Router();

router.get("/", (req, res, next) => {
  Todo.find({ user: req.user.id })
  .then(todos =>  res.status(200).json(todos))
  .catch(err => res.status(500).json(err))
})

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Todo.findOne({ _id: id, user: req.user.id  })
  .then(todo => res.status(200).json(todo))
  .catch(err => res.status(500).json(err))
})

router.post("/", async (req, res, next) => {
  const { name, description, dueDate, priority } = req.body;

  if(!name){
    return res.status(400).json({ message: "Name is required"});
  }

  try {
    const todo = await Todo.create({ name, description, dueDate, priority, user: req.user.id  });
    // const user = await User.findOneAndUpdate({ _id: req.id}, {$push: {todos: todo.id }}, {new: true});
    return res.status(200).json(todo);
  } catch(err){
    return res.status(500).json(err)
  }
  

  // .then(todo => res.status(200).json(todo))
  // .catch(err => res.status(500).json(err))
})

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Todo.findOneAndUpdate({ _id: id, user: req.user.id  }, req.body, { new: true })
  .then(todo => res.status(200).json(todo))
  .catch(err => res.status(500).json(err))
})

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Todo.findOneAndRemove({ _id: id, user: req.user.id  })
  .then(() => res.status(200).json({ message: `Todo ${id} deleted 🗑`}))
  .catch(err => res.status(500).json(err))
})


module.exports = router;