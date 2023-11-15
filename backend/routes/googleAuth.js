import { OAuth2Client } from 'google-auth-library';
import express from 'express';

const googleAuthRouter = express.Router();

googleAuthRouter.post('/', async (req, res) => {
  try {
    const dataObject = req.body;
    const client = new OAuth2Client(dataObject.client_id);
    const ticket = await client.verifyIdToken({
      idToken: dataObject.credential,
      audience: dataObject.client_id,
    });

    const payload = ticket.getPayload();
    res.send(payload);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default googleAuthRouter;
