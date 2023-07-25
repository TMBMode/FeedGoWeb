import { useRef } from "react";
import { generateUid } from "./utils/functions.mjs";
import Config from "./components/config";

const uid = useRef(generateUid(6));

export default function Index() {
  return (
    <Config uid={uid.current} />
  )
}