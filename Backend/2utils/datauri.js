import path from 'path';
import DataUriParser from 'data-uri-to-buffer';  // Default import from CommonJS module

// Converts file buffer to Data URI
const getDataUri = (file) => {
  if (!file || !file.buffer) {
    console.error("Error: File input is invalid:", file);
    throw new Error("Invalid file input");
  }

  const extName = path.extname(file.originalname).toString(); // Get file extension
  const dataUri = new DataUriParser(); // Initialize the parser here
  return dataUri.format(extName, file.buffer); // Return Data URI with the correct extension
};

export default getDataUri;
