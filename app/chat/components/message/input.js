import { useState, useEffect, useCallback } from "react";

export default function InputMessage({ callback, children, canEdit = true }) {
  const [ hydrated, setHydrated ] = useState(false);
  const handleInput = useCallback((e) => {
    if (e.key === 'Enter' && canEdit) {
      e.preventDefault();
      if (e.ctrlKey) return e.currentTarget.textContent += '\n';
      e.currentTarget.textContent.length && callback?.(e.currentTarget.textContent);
    }
  }, [callback, canEdit]);
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
          contentEditable={hydrated && canEdit}
          className="inline-block whitespace-pre-wrap w-[95%] break-words focus:outline-none"
          onKeyDown={(e) => handleInput(e)}
        >{children}</div>
      </div>
    </div>
  )
}