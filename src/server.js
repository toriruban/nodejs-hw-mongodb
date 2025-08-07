import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts } from './services/contacts';

export const setupServer = () => {
    const app = express();

      app.use(cors({ origin:'*' }));
      app.use(express.json());
      app.use(pino());

      app.use((req, res) => {
        res.status(404).json({
            message:'Not found',
        })
      });
      
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })


      app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
          res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
          });
      });  
}
