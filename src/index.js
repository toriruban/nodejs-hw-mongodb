import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;


const bootstrap = async () => {
    await initMongoConnection();
    setupServer(PORT);
};
bootstrap();




