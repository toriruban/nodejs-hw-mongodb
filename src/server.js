import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts';

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

      app.get('/contacts/:contactId', async(req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if(!contact) {
          res.status(404).json({
            message:'Contact not found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
	        message: `Successfully found contact with id ${contactId}!`,
	        data: contact,
        });
      });
}
