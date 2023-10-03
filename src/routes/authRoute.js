const router = require("express").Router()
const jwt = require("jsonwebtoken")

const mockUser = {
  username: "user01",
  password: "P@ss123",
  email: "user01@gmail.com",
}

const ACCESS_EXPIRE_TTL = 60
const REFRESH_EXPIRE_TTL = 60 * 3

router.post('/auth', async (req, res) => {
  try{
    const {user, pass} = req.body
    if(!user || !pass) {
      return res.status(400).json({
        message: "Username or Password are required"
      })
    }

    if(user !== mockUser.username && pass !== mockUser.password) {
      return res.status(401).send();
    }

    const accessToken = jwt.sign(
      {username: user},
      process.env.ACCESS_TOKEN,
      {expiresIn: ACCESS_EXPIRE_TTL}
    )

    const refreshToken = jwt.sign(
      {username: user},
      process.env.REFRESH_TOKEN,
      {expiresIn: REFRESH_EXPIRE_TTL}
    )

    return res.json({
      username: user,
      accessToken,
      refreshToken,
    })
    
  }catch(error) {
    res.status(500).send(error)
  }
})

router.post('/auth/refresh', async (req, res) => {
  
  try{
    const refreshHeader = req.headers["authorization"]
    if(!refreshHeader) {
      return res.status(401).send("Unauthorized")
    }

    const token = refreshHeader.split(" ")[1];

    jwt.verify(token, process.env.REFRESH_TOKEN,  (err, decoded) => {

      if(err) {
        return res.status(401).send({
          "message": "Refresh token expired. Please request a new access token.",
        })
      }
      
      const accessToken = jwt.sign(
        {username: decoded.username},
        process.env.ACCESS_TOKEN,
        {expiresIn: ACCESS_EXPIRE_TTL}
      )
      return res.json({accessToken})
    })
  } catch(error) {
    return res.status(500).send(error)
  }
})

module.exports = router