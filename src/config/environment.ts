import 'dotenv/config'
export default {
  PORT  : process.env.PORT || 4000,
  DB_URL: process.env.DB_URL || 'mongodb+srv://turiy:turiy@turiy.yeu32.mongodb.net/favs-assestment?retryWrites=true&w=majority',
  TOKEN_SECRET: process.env.TOKEN_SECRET || "favs-assestment"
}