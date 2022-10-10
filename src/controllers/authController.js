import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json' assert {type: 'json'}

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const {email} = req.body;
  try {
    if(await User.findOne({email}))
      return res.status(400).send({error: "User already exists"});
      const user = await User.create(req.body)

      user.password = undefined
      
      return res.send({
        user,
        token: generateToken({id: user.id})
      });
  } catch (error) {
      console.log(error)
      return res.status(400).send({error: 'Registration Failed'})
  }
})

router.post('/authenticate', async (req, resp) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email }).select('+password')
  
  if(!user) 
    return resp.status(400).send({error:"User not found"})

  if(!await bcrypt.compare(password, user.password))
    return resp.status(400).send({error:"Inválid Password"})

  user.password = undefined

  resp.send({
    user, 
    token: generateToken({id: user.id})
  })
})

export default app => app.use('/auth', router)