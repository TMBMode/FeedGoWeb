import { useEffect, useState } from "react";
import ReplyMessage from "./reply";
import Detail from "./detail";

const loadingRes = {
  text: '...'
};

export default function Message({ uid, prompt, setLock }) {
  const [res, setRes] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    setLock(true);
    (async () => {
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'complete',
          uid: uid,
          text: prompt
        })
      });
      setRes(
        await res.json()
      );
      setLock(false);
    })();
  }, [uid, prompt, setLock]);
  return (
    <div className="text-teal-100 flex flex-col">
      <div className="bg-teal-900 p-2">
        <div onClick={res && (() => setShowDetail(!showDetail))} className="inline-block align-top">
          <div className={`select-none transition duration-500 ${showDetail ? 'rotate-90' : ''}`}>
            {'>'}
          </div>
        </div>
        <div className="inline-block pr-4"></div>
        <div className="inline-block whitespace-pre-wrap w-[82%] md:w-[95%] break-words">
          {prompt}
        </div>
        {(res && showDetail) && <Detail res={res} />}
      </div>
      <ReplyMessage res={res ?? loadingRes} />
    </div>
  )
}