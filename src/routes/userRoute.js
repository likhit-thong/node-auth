const router = require("express").Router()

router.route('/users')
  .get((req, res) => {
    res.json({message: "GET all user"})
  })
  .post((req, res) => {
    res.json({message: "POST created user!!"})
  })

module.exports = router