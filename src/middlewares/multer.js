import multer from 'multer';
import { UPLOAD_FILES_DIR_PATH } from '../constants/path.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FILES_DIR_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });