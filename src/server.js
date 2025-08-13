import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouters from './routers/contacts.js'

export const setupServer = (port) => {
    const app = express();
      app.set("json spaces", 2);
      app.use(cors({ origin:'*' }));
      app.use(express.json());
      app.use(pino());
      app.use('/contacts', contactsRouters);
      app.use((req, res) => {
        res.status(404).json({ message: 'Not found' });
      });
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
      });
}

