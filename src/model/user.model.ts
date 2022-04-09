import { model, Schema, Model, Document } from 'mongoose';
import UserList from './userList.model'

interface IUser extends Document {
  email   : string
  password: string
}

const UserSchema: Schema = new Schema({
  email   : { type: String, required: true },
  password: { type: String, required: true },
  list    : [ { type: Schema.Types.ObjectId, ref: 'UserList'} ]
});

const User: Model<IUser> = model('User', UserSchema);

export default User