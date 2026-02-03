'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-conguration.js';
import { dbConnection } from './db.js';


import router from '../src/contacts/contact.router.js';

const BASE_URL = '/AgendaWeb/v1';

export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  try {
    await dbConnection();

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));

    app.use(`${BASE_URL}/contacts`, router);

    app.get(`${BASE_URL}/health`, (req, res) => {
      res.status(200).json({
        status: 'ok',
        service: 'Agenda Web Admin',
        version: '1.0.0'
      });
    });

    // 🔥 Middleware global de errores
    app.use((error, req, res, next) => {
      console.error('GLOBAL ERROR:', error.message);
      res.status(400).json({
        success: false,
        message: error.message
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
    });

  } catch (error) {
    console.error('ERROR INIT SERVER:', error);
  }
};
