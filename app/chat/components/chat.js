'use client';
import { useState, useEffect, useRef } from "react";
import Message from "./message/main";
import ReplyMessage from "./message/reply";
import InputMessage from "./message/input";
import { generateUid } from "@/app/utils/functions.mjs";

export default function Chat({ name }) {
  const [ questions, setQuestions ] = useState([]);
  const [ lock, setLock ] = useState(true);
  const [ loaded, setLoaded ] = useState(false);
  const uid = useRef(null);
  useEffect(() => {
    uid.current = generateUid(6);
    (async () => {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid.current,
          name
        })
      });
      if (res.ok) {
        setLock(false);
        setLoaded(true);
      }
      else alert('Error');
    })();
  }, [uid, name]);
  return (
    <div className="w-full h-full md:w-3/4 md:h-4/5 md:rounded-l-lg overflow-hidden">
      <div className="bg-teal-950 w-full h-full flex flex-col overflow-y-auto">
        <div className="bg-teal-700 text-teal-100 p-2 pl-4 md:pl-9 break-words">
          {`与<${name}>的对话`}
        </div>
        {loaded || <ReplyMessage res={{text: `正在请求创建进程，请稍等...`}} />}
        {questions.map((prompt, i) => (
          <Message uid={uid.current} prompt={prompt} setLock={setLock} key={i} />
        ))}
        {lock || <InputMessage callback={(q) => {setQuestions([...questions, q])}} />}
      </div>
    </div>
  )
}