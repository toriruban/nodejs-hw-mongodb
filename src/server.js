import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

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
}
