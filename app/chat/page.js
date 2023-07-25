import Chat from "./components/chat";

export default function ChatPage({ searchParams : {uid, name} = {} }) {
  return (
    <Chat uid={uid} name={name} />
  )
}
