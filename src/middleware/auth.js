import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json' assert {type: 'json'}

export default (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader)
    return res.status(401).send({error: 'no token available'})
    
  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({error:"Token error"})

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({error: 'token malformed'})

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return res.status(401).send({error: "Token Inválid"})
    req.userId = decoded.id
    return next()
  })
}