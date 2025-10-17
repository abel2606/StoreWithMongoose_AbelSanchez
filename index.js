import express from 'express';
import { AppError, globlaErrorHandler} from './utils/appError.js';
import morgan from 'morgan';

const app = express();
//Middleware para analizar los datos del cuerpo de las solicitudes en formato JSON
app.use(express.json());

//Configurar el middleware de morgan para el registro de solicitudes en consola
app.use(morgan('combined'));

//Middleware para exponer mis rutas y puedan ser accedidas


app.use((req,res,next)=>{
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
});

app.use(globlaErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})