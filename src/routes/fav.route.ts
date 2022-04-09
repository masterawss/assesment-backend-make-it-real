import * as express from 'express';
import UserListController from '../controller/userList.controller';
import {isAuthenticated} from '../middleware/validateToken'

const userListRoutes = express.Router();
const controller = new UserListController();

userListRoutes.get  ('/api/favs',     isAuthenticated, controller.getAll);
userListRoutes.get  ('/api/favs/:id', isAuthenticated, controller.getOne);
userListRoutes.post ('/api/favs',     isAuthenticated, controller.store);
userListRoutes.put  ('/api/favs',     isAuthenticated, controller.update);
userListRoutes.delete('/api/favs/:id',    isAuthenticated, controller.delete);

export default userListRoutes;