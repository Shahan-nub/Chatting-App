"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { selectChannelId } from "@/lib/features/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import db from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { selectMessage, setMessageInfo } from "@/lib/features/messageSlice";

export default function Chat() {
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
      onSnapshot(
        query(messageRef, orderBy("timestamp", "asc")),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
          // console.log(messages);
        }
      );
    }
  }, [newMessageFromStore && activeChannelId]);

  // AUTO SCROLL

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="lg:w-4/5 w-full max-h-screen h-screen min-h-screen flex flex-col justify-betwe">
      {/* <div className="flex flex-col justify-between h-full max-h-screen w-full"> */}
        <ChatHeader></ChatHeader>
        <div className="overflow-scroll basis-[75%] no-scrollbar">
          {messages &&
            messages.map((messageInfo) => {
              return (
                <Message
                  key={messageInfo.timestamp}
                  messageInfo={messageInfo}
                ></Message>
              );
            })}
          <div ref={messagesEndRef}></div>
        </div>
        <ChatInput handleMessageUpdate={onMessageUpdate}></ChatInput>
      {/* </div> */}
    </div>
  );
}
