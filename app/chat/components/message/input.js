import { useState, useEffect } from "react";

const handleInput = (e, callback) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (e.ctrlKey) return e.currentTarget.textContent += '\n';
    e.currentTarget.textContent.length && callback?.(e.currentTarget.textContent);
  }
}
export default function InputMessage({ callback }) {
  const [ hydrated, setHydrated ] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, [])
  return (
    <div className="text-teal-100 flex flex-col">
      <div className="bg-teal-900 p-2">
        <div className="inline-block align-top">
          <div className="select-none">
            {'>'}
          </div>
        </div>
        <div className="inline-block pr-4"></div>
        <div
          contentEditable={hydrated}
          className="inline-block whitespace-pre-wrap w-[95%] break-words focus:outline-none"
          onKeyDown={(e) => handleInput(e, callback)}
        ></div>
      </div>
    </div>
  )
}