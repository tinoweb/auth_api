import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  code:{
    type: String,
    required: true
  },
  description: {
    type: 'string',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const model = new mongoose.model("OrderSchema", OrderSchema)

export default model