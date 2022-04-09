import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import environment from '../config/environment'
// import { IUserInfoRequest } from '../types/auth.types'

export const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, environment.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'Token no es válido'})
    }
}