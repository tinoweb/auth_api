import express from 'express';

const router = express.Router();

const users = [
    {
      name: 'John',
      email: 'john@example.com',
      password: 'password**',
      cellphone: '111253-4256',
      cpnj: '12345678',
      status: 'active'
    },
    {
      name: 'Maria',
      email: 'maria@example.com',
      password: 'password**',
      cellphone: '111253-4256',
      cpnj: '12345678',
      status: 'active'
    }
  ]

router.get('/', (req, res) => {
    res.send(users)
})
router.get('/novo', (req, res) => {
    res.send("users novo")
})

export default router