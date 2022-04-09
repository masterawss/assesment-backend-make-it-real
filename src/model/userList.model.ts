import { model, Schema, Model, Document, Types } from 'mongoose';
import { IFav } from './fav.model';
// import FavModel from './fav.model'
// import UserModel from './user.model'
interface IUserList extends Document {
  id?: string;
  user: Types.ObjectId;
  name: string
  favs: Array<string>;
}

const UserListSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  favs: [{ type: Schema.Types.ObjectId, ref: "Fav" }]
});

const UserList: Model<IUserList> = model('UserList', UserListSchema);

export default UserList