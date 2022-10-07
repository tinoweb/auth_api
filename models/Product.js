import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    nome: { type:String, required:true },
    sku: { type:String },
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
  }, 
  {collection: 'products'}
)

const model = new mongoose.model("ProductSchema", ProductSchema)

export default model