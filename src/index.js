import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    try{
        await initMongoConnection();
        setupServer(PORT);
    } catch (err) {
        throw err;
    }
    
};
bootstrap();




