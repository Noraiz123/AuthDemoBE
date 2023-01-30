import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send(`Hey it's working !!`);
});

app.use('/api/user', authRoute);

const CONNECTION_URL = process.env.DB_CONNECT;
const PORT = process.env.PORT || 4050;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
