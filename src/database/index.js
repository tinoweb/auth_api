import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

mongoose.connect('mongodb://127.0.0.1:27017/ampere-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => console.log('Conectado com o banco'))


mongoose.Promise = global.Promise;

export default mongoose
