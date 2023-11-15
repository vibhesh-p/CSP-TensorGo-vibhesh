import express from 'express';
import googleAuthRouter from './routes/googleAuth.js';
import ServiceRouter from './routes/serviceRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', googleAuthRouter);
app.use('/api/submit-request', ServiceRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});