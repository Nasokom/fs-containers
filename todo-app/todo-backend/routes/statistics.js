const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (_, res) => {
  const added_todos = await redis.get('added_todos') || 0
  const statistics = {added_todos:Number(added_todos)}
  res.send(statistics);
});

module.exports = router;
