import express from 'express';
import Admin from '../models/Admin.js';
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
    if(await Admin.findOne({email}))
      return res.status(400).send({error: "admin already exists"});

      const admin = await Admin.create(req.body)
      admin.password = undefined
      return res.send({
        admin,
        token: generateToken({id: admin.id})
      });
  } catch (error) {
      console.log(error)
      return res.status(400).send({error: 'Registration Failed'})
  }
})

router.post('/login', async (req, resp) => {
  const { email, password } = req.body
  
  const admin = await Admin.findOne({ email }).select('+password')
  
  if(!admin) 
    return resp.status(400).send({error:"User not found"})

  if(!await bcrypt.compare(password, admin.password))
    return resp.status(400).send({error:"Inválid Password"})

  admin.password = undefined

  resp.send({
    admin, 
    token: generateToken({id: admin.id})
  })
})

router.get('/me', async (req, res) => {
  
  try{
    const authHeader = req.headers.authorization
    if(!authHeader)
      return res.status(401).send({error: 'no token available'})
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, authConfig.secret);
      console.log('Decod===>>', decoded);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    var adminId = decoded.id;

    Admin.findOne({_id: adminId}).then(function(user){
        return res.status(200).send({'Admin':user});
    });
      
  }catch(error){
    console.log('error===>>', error);
    return res.status(500).send({'error':error});
  }
  
})

// router.post('/forgotPassword', async (req, res) => {
//   const { email } = req.body
//   try {
//     const user = await User.findOne({ email });
//     if(!user)
//       return res.status(400).send({error:"User not found"})

//     const token = crypto.randomBytes(20).toString('hex');
//     const now = new Date();
//     now.setHours(now.getHours() + 1)

//     await User.findByIdAndUpdate(user.id, {
//       '$set': {
//         passwordResetToken: token,
//         passwordResetExpires: now
//       }
//     })

//     console.log(token, now)
    
//     mailer.sendMail({
//       to: email,
//       from: "tino477@gmail.com",
//       template: 'auth/forgot_password',
//       context: { token }
//     }, (error) => {
//       if(error){
//         return res.status(400).send({error:"Cannot send forgot password email"})
//         console.log('error===>> sendMail==>', error);
//       }
//       return res.send("Token enviado para seu email...")
//     })

//   } catch (error) {
//     console.log("error", error)
//     res.status(400).send({error: "Error on forgot password"})
//   }
// })

// router.post('/resetPassword', async (req, res) => {
//   const { email, password,token } = req.body

//   try {
//     const user = await User.findOne({ email })
//       .select('+passwordResetToken passwordResetExpires')

//     if(!user)
//       return res.status(400).send({ error: 'User not found' })
    
//     if(token !== user.passwordResetToken)
//       return res.status(400).send({error: 'Invalid token'})

//     const now = new Date()

//     if(now > user.passwordResetExpires)
//       return res.status(400).send({error: 'token expired, generate new token'})

//     user.password = password

//     await user.save()

//     res.send()

//   }catch (error) {
//     console.log({"error": error.message})
//     res.status(400).send({error: "Error cannot reset password"})
//   }
// })

export default app => app.use('/api/auth-admin', router)