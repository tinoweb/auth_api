import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { 
      type:String, 
      required:true 
    },
    sku: { 
      type:String 
    },
    utilization:{
      type:String
    },
    construction:{
      type:String
    }, 
    measure:{ // medida
      type:String
    },
    thickness: { // espessura
      type:String
    },
    colors: {
      type:String
    },
    applicable_standard: {
      type:String
    },
    designacao_norma:{
      type:String
    },
    standard_designation: {
      type:String
    },
    image: {
      type:String
    },
    certificate: {
      type:String
    },
  }, 
  {collection: 'products'}
)

const model = new mongoose.model("ProductSchema", ProductSchema)

export default model