import { useState } from "react";
import { useQuery } from 'react-query';
import { Container, InputGroup, FormControl, Button, Row, Alert } from 'react-bootstrap';
import Head from 'next/head'

export default function Home() {
  
  const [url, setUrl] = useState<string>('');
  const [show, setShow] = useState(true);

  async function getAnswers() {
    try {
      const res = await fetch('/api/answers?url=' + url, {
       method:'GET',})
     .then(response => response.json());

     return res;
    }
    catch { }
  }

  function makeAlert() {
    if(url==""){
     setShow(true);
    }
  }

  function AlertDismissible() {
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>The URL filed is empty!</Alert.Heading>
          <p>
            Paste the quiz link and have instant answers!
          </p>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              OK!
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  const { data } = useQuery([url], getAnswers)
  return (
    <Container>
      <Head>
        <title>Easy Quizizz</title>
      </Head>
      <div style={{height: 30}}></div>
      <AlertDismissible />
      <div style={{height: 30}}></div>
      <InputGroup className="mb-3">
          <FormControl
            name = "url"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste the quiz url here!"
            aria-label="Paste the quiz url here!"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button onClick={()=> {getAnswers(); makeAlert();}} type="button" variant="outline-secondary">Get answers❤️</Button>
          </InputGroup.Append>
        </InputGroup>

      {data && data.data.map(function(d, idx){
         return (
          <Alert key={idx.key} variant="primary">
          <h4>Question: {d.question}</h4>
          <h5>Answer: {d.answer}</h5>
          </Alert>)
       })}
    </Container>
  );
}
