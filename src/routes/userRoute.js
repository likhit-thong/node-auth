const router = require("express").Router()

router.route('/users')
  .get((req, res) => {
    // res.setHeader( "Strict-Transport-Security", "max-age=5184000; includeSubDomains; preload" )
    //res.header("Strict-Transport-Security", "max-age=5184000; includeSubDomains; preload")
    res.json({message: "GET all user"})
    // res
    //   .setHeader( "Strict-Transport-Security", "max-age=5184000; includeSubDomains; preload")
    //   .json({message: "GET all user"})

  })
  .post((req, res) => {
    res.json({message: "POST created user!!"})
  })

module.exports = router