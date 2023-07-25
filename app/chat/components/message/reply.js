
export default function ReplyMessage({ res }) {
  return (
    <div className="bg-teal-800 text-teal-100 p-2 pl-4 md:pl-9 break-words">
      <div>
        {res.text}
      </div>
    </div>
  )
}