
import multer from 'multer';

// Use memory storage to store files in memory temporarily
const storage = multer.memoryStorage();

// Set up multer with file size limit and allowed file types (images only)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error("Only image files (jpg, jpeg, png) are allowed!"), false);
    }
    cb(null, true);  // Accept the file
  }
});

// Export a middleware for single file upload
export const singleUpload = upload.single('file');  // 'file' is the field name for file in the form



