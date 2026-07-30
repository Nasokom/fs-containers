const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {  
  
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const cachedCounted = Number(await redis.get("added_todos")) || 0
  await redis.set("added_todos",cachedCounted+1)
 
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await Todo.findByIdAndDelete(req.todo._id)
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if(req.todo) return res.send(req.todo)
    return res.send(404)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if(req.todo) {
    req.todo.done = req.body.done 
    req.todo.text = req.body.text 
    return res.send(await req.todo.save())
  }
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
