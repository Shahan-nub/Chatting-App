"use client";

import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { selectChannelId } from "@/lib/features/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import db from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { selectMessage, setMessageInfo } from "@/lib/features/messageSlice";

export default function Chat({menuState}) {
  const dispatch = useDispatch();
  const newMessageFromStore = useSelector(selectMessage);

  const [messages, setMessages] = useState([]);

  const onMessageUpdate = () => {
    console.log("new msg added");
    dispatch(setMessageInfo());
  };

  const activeChannelId = useSelector(selectChannelId);

  useEffect(() => {
    if (activeChannelId) {
      const messageRef = collection(
        db,
        "channels",
        activeChannelId,
        "messages"
      );
      onSnapshot(query(messageRef,orderBy("timestamp","desc")), (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
        console.log(messages);
      });
    }
  }, [newMessageFromStore && activeChannelId]);

  return (
    <div className="lg:w-4/5 w-full max-h-screen min-h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <ChatHeader></ChatHeader>
        <div className="overflow-scroll lg:h-[58%] sm:h-[60%] h-[78%]  no-scrollbar">
        {messages &&
          messages.map((messageInfo) => {
            return <Message key={messageInfo.timestamp} messageInfo={messageInfo}></Message>;
          })}
        </div>
      </div>
      <ChatInput menuState={menuState} handleMessageUpdate={onMessageUpdate}></ChatInput>
    </div>
  );
}
