import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Navbar';
import Navbar from 'react-bootstrap/Navbar';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import RequestForm from './screens/RequestForm';
import { useState } from 'react';
import axios from 'axios';
import Userscreen from './screens/Userscreen';

function App() {
  const [user, setUser] = useState('');

  const responseMessage = (response) => {
    const credential = response.credential;
    const clientId = response.clientId;
    const fetchData = async () => {
      try {
        const result = await axios.post('/api/auth/', {
          credential,
          clientId,
        });
        setUser(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const logOut = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <Navbar bg="dark">
            <Container className="mx-5">
              <h4 className="text-white">Customer Service Platform</h4>
            </Container>
          </Navbar>
        </div>

        <main className="mx-5 my-4">
          {user ? (
            <Routes>
              <Route path="/" element={<Userscreen user={user} />} />
              <Route path="/submitrequest" element={<RequestForm />} />
            </Routes>
          ) : (
            <div>
              <h2>Welcome</h2>

              <p className="display-6">
                Created by Vibhesh Patneedi
                <br />
                TensorGo Software - Shaping A Smarter Tomorrow
              </p>

              <h6 className="text-primary">
                Please login to submit a query or request
              </h6>
            </div>
          )}

          <div className="mt-4">
            {user ? (
              <div>
                <button
                  className="border border-2 border-secondary"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            ) : (
              <button className="border border-2 border-secondary">
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
              </button>
            )}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
