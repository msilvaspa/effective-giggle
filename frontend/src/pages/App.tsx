import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Table from '../components/Table';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Grid = {
  grid: Array<string[]>;
  code: string;
}


function App() {
  const [character, setCharacter] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { data } = useQuery<Grid>(
    ['grid'],
    async () => {
      const res = await axios.get('http://localhost:3000/grid')
      return res.data
    },
    {
      enabled: isEnabled,
      refetchInterval: 1000,
    },
  )

  const handleConnection = () => {
    if (isEnabled) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);
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
          <Button title={isEnabled ? 'STOP' : 'GENERATE 2D GRID'} handleClick={handleConnection} />
        </Col>
      </Row>
      {data ? <Table head={null} rows={data.grid} /> : null}
      <Row>
        {isEnabled ? 'live' : 'offline'}
      </Row>
      <Row>{
        data?.code ?
          <Button title={`YOUR CODE: ${data?.code}`} handleClick={console.log} />
          : null
      }
      </Row>
    </Container>
  );
}

export default App;
