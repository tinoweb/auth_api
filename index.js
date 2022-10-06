import express from 'express';
import bodyParser from "body-parser";
import usersRoutes from './routes/users.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

const app = express();
const PORT = 5000;
dotenv.config()
app.use(bodyParser.json());





app.use('/users', usersRoutes)

app.get('/', (req, res) => { res.send('ampere api welcome!!!') })

mongoose.connect(process.env.DB_CONECTION, () => console.log('Conectado com o banco'))

app.listen(PORT, ()=>console.log(`Sevidor rodando na porta ${PORT}`))