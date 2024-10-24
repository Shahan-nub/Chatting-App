import ChatHeaderSearchbar from "./ChatHeaderSearchbar";
import ChatHeaderTitle from "./ChatHeaderTitle";

export default function ChatHeader() {
  return (
    <div className="flex items-center px-3 md:px-4 py-2 md:py-3 justify-between border-b border-color-1 basis-[10%] max-lg:basis-[7%]">
      <ChatHeaderTitle></ChatHeaderTitle>
      <ChatHeaderSearchbar></ChatHeaderSearchbar>
      
    </div>
  )
}
