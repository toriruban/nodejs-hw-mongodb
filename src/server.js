import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = (port) => {
    const app = express();
      app.set("json spaces", 2);
      app.use(cors({ origin:'*' }));
      app.use(express.json());
      app.use(pino());
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

