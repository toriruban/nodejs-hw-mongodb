import fs from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors';

import { UPLOAD_FILES_DIR_PATH } from '../constants/path.js';
import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  try {
    const newPath = path.join(UPLOAD_FILES_DIR_PATH, file.filename);
    await fs.rename(file.path, newPath);

    const rel = `/uploads/${file.filename}`;
    const base = getEnvVar(ENV_VARS.BACKEND_DOMAIN); 
    return base ? `${base.replace(/\/$/, '')}${rel}` : rel;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to save file to local');
  }
};
