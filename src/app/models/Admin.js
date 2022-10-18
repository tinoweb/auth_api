import mongoose from '../../database/index.js';
import bcrypt from 'bcryptjs'


const AdminSchema = new mongoose.Schema({
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
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
},{collection: 'admin'}
)

AdminSchema.pre('save', async function(next){
  const hash =  await bcrypt.hash(this.password, 10)
  this.password = hash;
  next()
})

const model = mongoose.model('AdminSchema', AdminSchema)

export default model || mongoose.model("AdminSchema", AdminSchema);

