import React, {useState} from 'react';
import './App.scss';
import {Col, Nav, Row} from 'react-bootstrap';
import {UploadClass} from './components/class/Upload.class';
import ListLowRes from "./components/hooks/list.lowres";
import PlayerLowRes from "./components/hooks/player/player.lowres";

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
        <Row className="mx-3">
            <Col lg={3}>
                <UploadClass upload={setIsUpload} />
                <ListLowRes isUpload={isUpload} setIsUpload={setIsUpload} />
            </Col>
            <Col lg={9}>
                <PlayerLowRes />
            </Col>
        </Row>
      </main>
    </div>
  );
}

export default App;
