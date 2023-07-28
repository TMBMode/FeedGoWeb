import Chat from "../components/chat";

export default function ChatPage({ params : {name} = {} }) {
  return (
    <Chat name={decodeURIComponent(name)} />
  )
}
