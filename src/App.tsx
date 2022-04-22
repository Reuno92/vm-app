import React from 'react';
import './App.scss';
import {Col, Nav, Row} from "react-bootstrap";
import {UploadClass} from "./components/Upload.class";

function App() {
  return (
    <div className="App">
      <header>
          <Nav>
            <Nav.Item>
                <Nav.Link className="" href="/home">Home</Nav.Link>
            </Nav.Item>
          </Nav>
      </header>
      <main>
        <Row>

        </Row>
        <Row>
            <Col className="mx-3">
                <UploadClass />
            </Col>
            <Col>

            </Col>
        </Row>
      </main>
    </div>
  );
}

export default App;
