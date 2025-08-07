import dotenv from 'dotenv';
import { setupServer } from './server.js';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
setupServer(PORT);

