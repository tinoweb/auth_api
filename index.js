import express from 'express';
import bodyParser from "body-parser";
import usersRoutes from './routes/users.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import Users from './models/Users.js'
import bcrypt from 'bcryptjs'


const app = express();
const PORT = 5000;
dotenv.config()
app.use(bodyParser.json());



app.use('/users', usersRoutes)

app.get('/', (req, res) => { res.send('ampere api welcome!!!') })

app.post('/api/register', async (req, res) => {

	const {username, password, cellphone, cnpj, email} = req.body

	// console.log( await bcrypt.hash(password, 10))

	
	try {
		const respData = await Users.create({
			name: username, 
			email,
			password,
			cellphone,
			cnpj
		})
		console.log("User created successfully", respData)
	} catch (error) {
		console.log(error)
		res.json({status: 'error'})
	}

	res.send({status: 'ok'});
	console.log(req.body)
})


// mongoose.connect(process.env.LOCAL_DB_CONECTION, {}, () => console.log('Conectado com o banco'))
mongoose.connect('mongodb://127.0.0.1:27017/ampere-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => console.log('Conectado com o banco'))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, () =>console.log(`Sevidor rodando na porta ${PORT}`))