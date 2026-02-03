// importaciones
import dotenv from 'dotenv';
import { initServer } from "./configs/app.js";

// Configuracion de variables de entorno
dotenv.config();

// Errores no capturados
process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION:', error.message);
    console.error(error.stack);
});

// Promesas rechazadas o no manejadas
process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
});


// Inicializacion del servidor
console.log('Iniciando servidor...');
initServer();