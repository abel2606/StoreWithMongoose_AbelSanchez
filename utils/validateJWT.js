import jwt from 'jsonwebtoken';
import { AppError } from './appError.js';

const validateJWT = (req,res, next)=>{
    //Obtener el token desde la petición (headers)
    const token = req.header('Authorization');
    if(!token){
        next(new AppError('No se proporciono un token', 500));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        next(new AppError('El token no es valido',500));
    }
}

export default validateJWT;