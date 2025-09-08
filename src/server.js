import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = (port) => {
    const app = express();
      app.set("json spaces", 2);
      app.use(cors({ origin:'*' }));
      app.use(express.json());
      app.use(pino());
      app.use(cookieParser()); 
      app.use('/uploads', express.static(UPLOAD_DIR));
      app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
      });
      app.use(router);
      app.use(notFoundHandler);
      app.use(errorHandler);
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
      });

}

