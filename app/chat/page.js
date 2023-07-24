import Chat from "./components/chat";

export default function ChatPage({ searchParams : {uid, name, chunkSize} = {} }) {
  return (
    <Chat uid={uid} name={name} chunkSize={chunkSize} />
  )
}
