import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
    nome: String,
	sku: String,
	utilizacao: String,
	construcao: String,
	medida: String,
	espesura: String,
	cores: String,
	norma_aplicavel: String,
	designacao_norma: String,
	temperatura_max: String,
    imagem: String,
	certificado: String,
})