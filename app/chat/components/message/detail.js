
export default function Detail({ res }) {
  return (
    <div className="bg-white/10 w-fit md:w-3/4 p-1 md:p-4 text-sm">
      <div className="flex flex-row items-center">
        <div className="md:text-xl pr-1 md:pr-4">💾</div>
        <table className="w-full">
          <tbody className="w-full">
            {res?.sources?.map((source, i) => (
              <tr key={i} className="bg-gray-700/30 even:bg-gray-800/30 ">
                <td className="pl-2 break-words">{source.text}</td>
                <td className="w-1/5 text-right pr-2 overflow-x-auto">{source.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-row items-center">
        <div className="text-xl pr-4">🤫</div>
        <div className="p-1 bg-gray-700/30 break-words">
          {res.summarize}
        </div>
      </div>
    </div>
  )
}