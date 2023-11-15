import React from 'react'
import Row from 'react-bootstrap/Row';
import RequestForm from './RequestForm';

export default function Userscreen(props) {
  const user = props.user;
  return (
    <>
      <Row>
          <p className="display-6">Hello, {user.name}</p>
          <h4 className="text-body">{user.email}</h4>

          <RequestForm user = {user}></RequestForm>
      </Row>
    </>
  );
}