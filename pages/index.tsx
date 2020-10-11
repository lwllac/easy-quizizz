import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from 'next'
import { useQuery } from 'react-query';
import { Container, InputGroup, FormControl, Button, Row, Alert } from 'react-bootstrap';

export default function Home() {
  
  const [url, setUrl] = useState<string>('');

  async function getAnswers() {
    try {
      const res = await fetch('/api/GetAnswers', {
       method:'POST',
       body: JSON.stringify({url}),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(response => response.json());

     return res;
    }
    catch { }
  }

  function makeAlert() {
    if(url==""){
      alert("The url field is empty.")
    }
  }

  const { data } = useQuery([url], getAnswers)
  return (
    <Container>
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
