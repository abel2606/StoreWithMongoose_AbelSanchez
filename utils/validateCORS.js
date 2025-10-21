import cors from 'cors';

//Obtener las urls permitidas desde el archivo env

const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

//Configurar nuestro middleware de manejod e CORS

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Cors no incluido'));
        }

    },
    credentials: true,
    optionsSuccesStatus: 200
};

export default cors(corsOptions)