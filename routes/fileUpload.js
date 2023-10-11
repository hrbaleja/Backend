const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Create an upload route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imagePath = `${req.file.filename}`;
  res.json({ imagePath });
});

router.get('/get-image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../public/uploads', filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).json({ error: 'Image not found' });
    } else {
      // Set the response content type based on the file extension
      const fileExtension = path.extname(imagePath).substring(1); // Remove the leading dot
      const contentType = `image/${fileExtension}`;
      res.contentType(contentType);

      // Send the image data as the response
      res.send(data);
    }
  });
});

module.exports = router;
