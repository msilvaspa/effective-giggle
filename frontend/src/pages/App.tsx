import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";
import { Col, Container, Row } from 'react-bootstrap';
import useSocket from '../hooks/useSocket';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Table from '../components/Table';
import './App.css';


type Grid = {
  grid: Array<string[]>;
  code: string;
}


function App() {
  const [character, setCharacter] = useState<string>('');
  const { lastMessage, connect, disconnect, isConnected } = useSocket<Grid>('ws://localhost:3000/grid');

  const handleConnection = () => {
    console.log('passou aq');

    if (isConnected) {
      disconnect();
      return;
    }
    connect();
  }

  return (
    <Container>
      <Row>
        <Col>
          <Input label='character' handleChange={setCharacter} />
        </Col>
        <Col>
          <FaRegClock />
        </Col>
        <Col>
          <Button title={isConnected ? 'STOP' : 'GENERATE 2D GRID'} handleClick={handleConnection} />
        </Col>
      </Row>
      {lastMessage ? <Table head={null} rows={lastMessage.grid} /> : null}
      <Row>
        {isConnected ? 'live' : 'offline'}
      </Row>
      <Row>{
        lastMessage?.code ?
          <Button title={`YOUR CODE: ${lastMessage?.code}`} handleClick={console.log} />
          : null
      }
      </Row>
    </Container>
  );
}

export default App;
