import express from 'express';
import { AppError, globlaErrorHandler} from './utils/appError.js';
import morgan from 'morgan';
import corsMiddleware from './utils/validateCORS.js';
import jwt from 'jsonwebtoken';
import productoRouter from './routers/productoRouter.js'
import ventaRouter from './routers/ventaRouter.js'
import { conectar} from './config/db.js';

import validateJWT from './utils/validateJWT.js';
conectar();
 
const app = express();
//Middleware para analizar los datos del cuerpo de las solicitudes en formato JSON
app.use(express.json());

//Configurar el middleware de morgan para el registro de solicitudes en consola
app.use(morgan('combined'));

//Middleware para exponer mis rutas y puedan ser accedidas
app.use(corsMiddleware);

app.post('/api/users/login', (req,res, next) =>{
    //No se suele hacer así , la info debe ir validada
    const {username, password} = req.body;

    if(username === 'admin' || password === 'password'){
        const payload = {
            usreId: 1,
            username: 'admin',
            role: 'admin'
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'});

        res.json({
            msg: 'Se inicio con exito',
            token
        })
    }
    else{
        next(new AppError('Usuario o contraseña invalidos'), 401);
    }
})
//puede ser a nivel de api o de ruta
//app.use(validateJWT);

app.use('/api/productos', validateJWT, productoRouter)
app.use('/api/ventas', validateJWT, ventaRouter)

//Middleware
app.use((req,res,next)=>{
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
});

app.use(globlaErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})