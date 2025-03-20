import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/dbConfig';

import shortUrlRoutes from './routes/shortUrlRoutes';

dotenv.config();
connectDb();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use('/api/', shortUrlRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
