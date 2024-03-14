import { FaCirclePlus } from "react-icons/fa6";
import { BsBagDashFill } from "react-icons/bs";
import { MdOutlineGif } from "react-icons/md";
import { FaSmile } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "@/lib/features/channelSlice";
import { useRef } from "react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { selectUser } from "@/lib/features/userSlice";
import db from "@/firebase";
import { Firestore } from "firebase/firestore";

export default function ChatInput({handleMessageUpdate}) {
  const activeUser = useSelector(selectUser);
  const activeChannelId = useSelector(selectChannelId);
  const activeChannel = useSelector(selectChannelName);

  const newMessage = useRef();
  
  const handleFormSubmit = () => {
    if (activeChannelId) {
      const messageRef = collection(db, "channels", activeChannelId, "messages");
      let msg = newMessage.current.value;
      if (msg) {
        try {
          const NewMSG = {
            message: msg,
            timestamp:new Date(),
            tsString:new Date().toLocaleTimeString(),
            // timestamp: serverTimestamp(),
            // .toDate().toLocaleSting('en-US', {
            //   weekday: 'long',
            //   year: 'numeric',
            //   month: 'long',
            //   day: 'numeric',
            //   hour: 'numeric', // Use 'numeric' for 24-hour clock
            //   minute: '2-digit',
            //   // hour12: true // **Not applicable to timestamps**
            // }),
            user: activeUser,
          };
          setDoc(doc(messageRef), NewMSG);
        } catch (error) {
          console.log("error while adding channel: ", error);
        }
      }
    }
    newMessage.current.value=null;
    handleMessageUpdate()
  };

  return (
    <div
      onClick={() =>
        !activeChannel && alert("please select a channel before typing!")
      }
      className="w-[97%] mx-auto my-1 md:my-3 rounded-lg shadow-lg bg-color-2 flex items-center py-1 lg:py-2 px-2 lg:px-4 justify-between"
    >
      <div className="flex flex-1 items-center">
        <FaCirclePlus className="text-slate-200 cursor-pointer hover:text-white text-base lg:text-xl"></FaCirclePlus>
        <form
          name="message-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleFormSubmit();
            // message-form.reset();
          }}
          className="w-[94%]"
        >
          <input
            ref={newMessage}
            disabled={!activeChannel}
            type="text"
            className="w-full bg-transparent outline-none lg:mx-2 mx-1 py-2 px-2 lg:px-3"
            placeholder={`Message ${activeChannel ? "#" + activeChannel : ""}`}
          />
        </form>
      </div>
      <div className="flex items-center">
        <BsBagDashFill className="text-slate-200 mx-1 md:mx-2 text-base lg:text-lg cursor-pointer hover:text-white"></BsBagDashFill>
        <MdOutlineGif className="text-slate-200 mx-1 md:mx-2 text-lg lg:text-3xl cursor-pointer hover:text-white"></MdOutlineGif>
        <FaSmile className="text-slate-200 mx-1 md:mx-2 text-base lg:text-lg cursor-pointer hover:text-white"></FaSmile>
      </div>
    </div>
  );
}
