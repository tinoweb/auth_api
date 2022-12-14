import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv'
import authController from './app/controllers/authController.js'
import orderController from './app/controllers/orderController.js';
import productController from './app/controllers/productController.js';
import authAdminController from './app/controllers/authAdminController.js';

const app = express();
const PORT = 5000;
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

authController(app);
authAdminController(app);
productController(app);
orderController(app);



app.get('/', (req, res) => { res.send('ampere api welcome!!!') })

app.listen(PORT, () =>console.log(`Sevidor rodando na porta ${PORT}`))