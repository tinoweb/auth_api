import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cellphone: {type: String, required: true},
    cnpj: {type: String, required: true},
    status: {type: Boolean, default: true}
  },
  {collection: 'users'}
)

const model = mongoose.model('UserSchema', UserSchema)


export default model || mongoose.model("UserSchema", UserSchema);

