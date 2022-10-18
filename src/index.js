import express from 'express';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
import authController from './app/controllers/authController.js'
import orderController from './app/controllers/orderController.js';
import productController from './app/controllers/productController.js';
// import Users from './app/models/Users.js'
// import usersRoutes from './routes/users.js'

const app = express();
const PORT = 5000;
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

authController(app);
productController(app);
orderController(app);

// app.use('/users', usersRoutes)
app.get('/', (req, res) => { res.send('ampere api welcome!!!') })

app.listen(PORT, () =>console.log(`Sevidor rodando na porta ${PORT}`))