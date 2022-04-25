import React, {useState} from 'react';
import './App.scss';
import {Col, Nav, Row} from 'react-bootstrap';
import {UploadClass} from './components/class/Upload.class';
import ListLowRes from "./components/hooks/list.lowres";

function App() {

    const [isUpload, setIsUpload] = useState<boolean>(false);

  return (
    <div className="App">
      <header>
          <Nav>
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
          </Nav>
      </header>
      <main>
        <Row>

        </Row>
        <Row>
            <Col className="mx-3">
                <UploadClass upload={setIsUpload} />
            </Col>
            <Col className="mx-3">
                <ListLowRes isUpload={isUpload} setIsUpload={setIsUpload} />
            </Col>
        </Row>
      </main>
    </div>
  );
}

export default App;
