import mongoose from '../database/index.js';
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
	{
    name: {
      type: String, 
      required: true, 
      unique: true
    },
    email: {
      type: String, 
      unique:true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    cellphone: {
      type: String, 
      required: true
    },
    cnpj: {
      type: String, 
      required: true
    },
    status: {
      type: Boolean, 
      default: true
    },
    createdAt: {
      type: Date, 
      default: Date.now
    }
  },
  {collection: 'users'}
)

UserSchema.pre('save', async function(next){
  const hash =  await bcrypt.hash(this.password, 10)
  this.password = hash;
  next()
})

const model = mongoose.model('UserSchema', UserSchema)


export default model || mongoose.model("UserSchema", UserSchema);

