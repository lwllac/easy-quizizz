import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from 'next'
import { useQuery } from 'react-query';

export default function Home() {
  
  const [url, setUrl] = useState<string>('');

  let answers;
  async function getAnswers() {
    try {
      console.log({url});
      const res = await fetch('/api/GetAnswers', {
       method:'POST',
       body: JSON.stringify({url}),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(response => response.json())
     .then(data => answers = data);
     //console.log(res);
 
     return res;
    }
    catch {
      
    }
    
  }

  function makeAlert() {
    if(url==""){
      alert("The url field is empty.")
    }
  }

  const { data } = useQuery([url], getAnswers)
  return (
    <div>
      <form>
        <input type="text" name="url" placeholder="Paste the quiz url here" onChange={(e) => setUrl(e.target.value)} />
        <br />
        <input type="button" value="Get Answers" onClick={()=> {getAnswers(); makeAlert();}} />
      </form>
      {data && data.data.map(function(d, idx){
         return (<li key={idx}>
           {d.question}
           <br />
           {d.answer}
           </li>)
       })}
    </div>
  );
}
