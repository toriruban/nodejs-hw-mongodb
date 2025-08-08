import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = (port) => {
    const app = express();
      app.set("json spaces", 2);
      app.use(cors({ origin:'*' }));
      app.use(express.json());
      app.use(pino());

      app.get('/contacts', async (req, res, next) => {
        try{
          const contacts = await getAllContacts();
          res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
          });
        } catch (err) {
          next(err);
        } 
      });  

      app.get('/contacts/:contactId', async(req, res, next) => {
        try{
          const { contactId } = req.params;
          const contact = await getContactById(contactId);
          if(!contact) {
            return res.status(404).json({ message:'Contact not found'});
          }
          res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
          });
        } catch (err) {
          next(err);
        }
      });

      app.use((req, res) => {
        res.status(404).json({ message: 'Not found' });
      });

      app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
      });
}

