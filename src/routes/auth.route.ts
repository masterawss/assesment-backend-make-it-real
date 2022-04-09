import * as express from 'express';
import AuthController from '../controller/auth.controller';
import { isAuthenticated } from '../middleware/validateToken';

const userRoutes = express.Router();
const controller = new AuthController();

userRoutes.post('/auth/local/login', controller.signIn);
userRoutes.post('/auth/local/sign-up', controller.signUp);
userRoutes.get('/auth/get-user', isAuthenticated, controller.getUser);

// userRoutes.post('/auth/sign-in', controller.signIn);
// userRoutes.get('/auth/user', verifyToken, controller.getUser);

export default userRoutes;