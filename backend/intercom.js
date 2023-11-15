import axios from 'axios';

const INTERCOM_API_KEY =
  'dG9rOjI0ZWI0NWU5XzQxZTdfNGIxNF84ZTQ4XzNmYjg2MDU0YjhhZToxOjA='; 
const INTERCOM_API_BASE_URL = 'https://api.intercom.io';

const intercomClient = axios.create({
  baseURL: INTERCOM_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${INTERCOM_API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

intercomClient.conversations = {
  create: async (data) => {
    try {
      const response = await intercomClient.post('/leads', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default intercomClient;