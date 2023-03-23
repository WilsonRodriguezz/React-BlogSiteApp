import express from 'express';
//import routes
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

//import cookie-parser
import cookieParser from 'cookie-parser';

//import multer
import multer from 'multer';

//import database
import { db } from './db.js';

//Creating express server
const app = express();

app.use(express.json());
app.use(cookieParser());
//upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

//use post router
app.use('/api/posts', postRoutes);
//use authentication router
app.use('/api/auth', authRoutes);
//use user router
app.use('/api/user', userRoutes);

//Connecting to port 8800 for the Backend
app.listen(8800, () => {
  console.log('Connected!');
});

db.connect((err) => {
  if (!err) console.log('database connected..');
  else
    console.log(
      'db not connected \n Error : ' + JSON.stringify(err, undefined, 2)
    );
});
