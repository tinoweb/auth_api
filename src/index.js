import express from 'express';
import bodyParser from "body-parser";
import usersRoutes from './routes/users.js'
import * as dotenv from 'dotenv'
import Users from './app/models/Users.js'
import authController from './app/controllers/authController.js'
import productController from './app/controllers/productController.js';

const app = express();
const PORT = 5000;

dotenv.config()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}))

authController(app);
productController(app);


app.use('/users', usersRoutes)

app.get('/', (req, res) => { res.send('ampere api welcome!!!') })


app.listen(PORT, () =>console.log(`Sevidor rodando na porta ${PORT}`))