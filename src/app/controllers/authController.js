import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json' assert {type: 'json'}
import mailer from '../../modules/mailer.js'

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

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email });
    if(!user)
      return res.status(400).send({error:"User not found"})

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })

    console.log(token, now)
    
    mailer.sendMail({
      to: email,
      from: "tino477@gmail.com",
      template: 'auth/forgot_password',
      context: { token }
    }, (error) => {
      if(error){
        return res.status(400).send({error:"Cannot send forgot password email"})
        console.log('error===>> sendMail==>', error);
      }
      return res.send("Token enviado para seu email...")
    })

  } catch (error) {
    console.log("error", error)
    res.status(400).send({error: "Error on forgot password"})
  }
})

router.post('/resetPassword', async (req, res) => {
  const { email, password,token } = req.body

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires')

    if(!user)
      return res.status(400).send({ error: 'User not found' })
    
    if(token !== user.passwordResetToken)
      return res.status(400).send({error: 'Invalid token'})

    const now = new Date()

    if(now > user.passwordResetExpires)
      return res.status(400).send({error: 'token expired, generate new token'})

    user.password = password

    await user.save()

    res.send()

  }catch (error) {
    console.log({"error": error.message})
    res.status(400).send({error: "Error cannot reset password"})
  }
})

export default app => app.use('/api/auth', router)