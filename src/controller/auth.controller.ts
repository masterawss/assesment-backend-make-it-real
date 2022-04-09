
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import { schemaLogin } from '../service/user/signIn/validation';
import { schemaRegister } from '../service/user/signUp/validation';
import jwt from 'jsonwebtoken'
import env from '../config/environment'
import { IUserInfoRequest } from '../types/auth.types';
class AuthController {
	user = new UserModel();  
	
	signIn = async (request: Request, response: Response) => {
		// validaciones
        const { error } = await schemaLogin.validate(request.body);
        if (error) return response.status(400).json({ error })
        
        const user = await UserModel.findOne({ email: request.body.email });
        if (!user) return response.status(400).json({ error: 'Usuario no encontrado' });
    
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (!validPassword) return response.status(400).json({ error: 'contraseña no válida' })
        
        // create token
        const token = jwt.sign({
            name: user.email,
            id: user._id
        }, env.TOKEN_SECRET)
        
        response
        .header('auth-token', token)
        .json({
            token
        })
	}

	signUp = async (request: Request, response: Response) => {
		// validate user
        const { error } = await schemaRegister.validate(request.body)
        if (error)
            return response.status(400).json({error})

        const isEmailExist = await UserModel.findOne({ email: request.body.email });
        if (isEmailExist)
            return response.status(400).json({error: 'Email ya registrado'})

        // hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(request.body.password, salt);

        const user = new UserModel({
            email: request.body.email,
            password: password
        });
        try {
            const savedUser = await user.save();
            response.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            response.status(400).json({error})
        }
	}

    getUser = (request: any, response: Response) => {
        response.json({ 
            user: request.user
        })
    }
}
 
export default AuthController;