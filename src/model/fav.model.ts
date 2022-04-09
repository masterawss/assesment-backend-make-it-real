import { model, Schema, Model, Document, Types } from 'mongoose';
import UserList from './userList.model'
export interface IFav extends Document {
  id?         : string;
  userList    : Types.ObjectId;
  title       : string
  description : string
  link        : string
}

const FavSchema: Schema = new Schema({
  // user    : { type: Schema.Types.ObjectId, ref: "User" },
  userList    : { type: Schema.Types.ObjectId, ref: "UserList" },
  title       : { type: String, required: true },
  description : { type: String, required: true },
  link        : { type: String, required: true },
});

const Fav: Model<IFav> = model('Fav', FavSchema);

export default Fav