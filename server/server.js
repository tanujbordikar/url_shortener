import express from 'express';
import shortUrlRoute from './routes/shortUrl.js';
import mongoose from 'mongoose';
import cors from 'cors';

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/', shortUrlRoute);
mongoose.connect("mongodb://localhost:27017/urlshortener");

app.listen(port, () => {
  console.log("Server running on port "+ port);
});