import express from 'express';
import Order from '../models/Order.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({
        ok: true, user: req.userId
    })
})

export default app => app.use('/orders', router)