import express from 'express';
import axios from 'axios';

const ServiceRouter = express.Router();

ServiceRouter.post('/', async (req, res) => {
  try {
    const intercomApiKey =
      'dG9rOmFkM2NlYTNhXzljYjBfNDljMF9hZTk2XzUzMTg0ZjdjYjAzMDoxOjA=';

    const response = await axios.post(
      'https://api.intercom.io/conversations',
      {
        from: {
          type: 'user',
          id: req.body.email,
        },
        body: req.body.comments,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Intercom-Version': '2.10',
          Authorization: `Bearer ${intercomApiKey}`,
        },
      }
    );

    console.log('Response from Intercom:', response.data);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form to Intercom:', error.message);
    if (error.response) {
      console.error('Intercom API Response:', error.response.data);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default ServiceRouter;