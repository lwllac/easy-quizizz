import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  
  const [url, setUrl] = useState<string>('');

  let answers;
  async function getAnswers() {
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
    console.log(answers)
    console.log(answers.data[0])
  }

  return (
    <div>
      <form>
        <input type="text" name="url" placeholder="Paste the quiz url here" onChange={(e) => setUrl(e.target.value)} />
        <br />
        <input type="button" value="Get Answers" onClick={getAnswers} />
      </form>
    </div>
  );
}
