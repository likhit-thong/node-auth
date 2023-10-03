
const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  if(!authHeader) return res.status(401).send()
  
  //console.log(authHeader)
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    (err, decoded) => {
      if(err) return res.status(401).send()
      req.user = decoded.username
      next()
    }
  )
}

module.exports = {
  verifyJWT
}