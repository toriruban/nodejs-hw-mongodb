import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_FILES_DIR_PATH, UPLOAD_FILES_DIR_PATH } from './constants/path.js';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_FILES_DIR_PATH);
    await createDirIfNotExists(UPLOAD_FILES_DIR_PATH);
    setupServer(PORT);
};
bootstrap();

