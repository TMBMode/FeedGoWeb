'use client';
import { useState, useEffect } from "react";
import Message from "./message/main";
import InputMessage from "./message/input";

export default function Chat({ uid, name }) {
  const [ questions, setQuestions ] = useState([]);
  const [ lock, setLock ] = useState(true);
  useEffect(() => {
    (async () => {
      window.history.replaceState(null, '', 'ヾ(≧▽≦*)o');
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'create',
          uid,
          name
        })
      });
      if (res.ok) setLock(false);
      else alert('Error');
    })();
  }, [uid, name]);
  return (
    <div className="w-full h-full md:w-3/4 md:h-4/5 md:rounded-l-lg overflow-hidden">
      <div className="bg-teal-950 w-full h-full flex flex-col overflow-y-auto">
        {questions.map((prompt, i) => (
          <Message uid={uid} prompt={prompt} setLock={setLock} key={i} />
        ))}
        {lock || <InputMessage callback={(q) => {setQuestions([...questions, q])}} />}
      </div>
    </div>
  )
}