"use client";
import { FaCirclePlus } from "react-icons/fa6";
import { BsBagDashFill } from "react-icons/bs";
import { MdOutlineGif } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "@/lib/features/channelSlice";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { selectUser } from "@/lib/features/userSlice";
import db, { storage } from "@/firebase";
import { selectMenu } from "@/lib/features/menuSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TbLoader2 } from "react-icons/tb";
import dynamic from "next/dynamic";
import heic2any from "heic2any";



const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export default function ChatInput({ handleMessageUpdate }) {
  const activeUser = useSelector(selectUser);
  const activeChannelId = useSelector(selectChannelId);
  const activeChannel = useSelector(selectChannelName);
  const [chatInput,setChatInput] = useState("");

  const menuState = useSelector(selectMenu);

  const newMessage = useRef();

  const handleFormSubmit = () => {
    if (activeChannelId) {
      const messageRef = collection(
        db,
        "channels",
        activeChannelId,
        "messages"
      );
      let msg = newMessage.current.value;
      if (msg) {
        try {
          const NewMSG = {
            message: msg,
            // uploadedFile:imageUrl,
            timestamp: new Date(),
            tsString: new Date().toLocaleTimeString(),
            user: activeUser,
          };
          setDoc(doc(messageRef), NewMSG);
          setChatInput("")
        } catch (error) {
          console.log("error while adding channel: ", error);
        }
      }
    }
    newMessage.current.value = null;
    handleMessageUpdate();
  };

  // FILE UPLOAD

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef();

  const handleImageChange = async (event) => {
    setFileLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.includes(".heic") || file.name.includes(".HEIC")) {
        // alert("heic file type is not supported on web, please use a different format.")
        const convertedImage = await heic2any({ blob: file, toType: "image/jpeg" });
        setImage(convertedImage);
      } else {
        setImage(file);
        console.log(file);
      }
      setFileLoading(false);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (image) {
        setIsUploading(true);

        const storageRef = ref(storage, `images/${image.name}`);
        try {
          const snapshot = await uploadBytes(storageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          console.log(url);
          setImageUrl(url);
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setIsUploading(false);
        }
      }
    };

    uploadImage();
  }, [image]);

  const handleUpload = async () => {
    if (image) {
      try {
        const messageRef = collection(
          db,
          "channels",
          activeChannelId,
          "messages"
        );

        await addDoc(messageRef, {
          uploadedFile: imageUrl,
          timestamp: new Date(),
          tsString: new Date().toLocaleTimeString(),
          user: activeUser,
        });

        console.log("Image URL saved in Firestore:", imageUrl);
        handleMessageUpdate();
        setIsUploading(false);
        // fileRef.current.value = null;
        setTimeout(() => {
          if (imageUrl) {
            setImage(null);
            setImageUrl(null);
          }
        }, 2000);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected");
    }
  };

  // EMOJI 
  const [showEmoji, setShowEmoji] = useState(false)
  const onEmojiClick = (emojiObject) => {
    setChatInput((pre) => pre+emojiObject.emoji);
  }
  return (
    <>
      <div
        onClick={() =>
          !activeChannel && alert("please select a channel before typing!")
        }
        className={`lg:w-[78%] w-[98%] backdrop-blur-xl fixed bottom-0 right-[1%] mx-auto my-1 md:my-3 rounded-lg shadow-lg bg-color-2 flex items-center py-1 lg:py-2 px-2 lg:px-4 justify-between
        ${menuState ? "hidden lg:flex" : "visible"}
        `}
      >
        <div className="flex flex-1 items-center">
          <form
            name="message-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleFormSubmit();

              // message-form.reset();
            }}
            className="w-[94%] flex items-center relative"
          >
            <FaCirclePlus className="text-slate-200 cursor-pointer hover:text-white text-base lg:text-xl"></FaCirclePlus>
            <input
              ref={fileRef}
              type="file"
              className={`w-[5%] lg:w-[4%] opacity-0 absolute`}
              disabled={!activeChannel}
              onChange={(e) => {
                handleImageChange(e);
                // const file = e.target.files?.[0];
              }}
            ></input>

            <input
              ref={newMessage}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={!activeChannel}
              type="text"
              className="w-full bg-transparent outline-none lg:mx-2 mx-1 py-2 px-2 lg:px-3"
              placeholder={`Message ${
                activeChannel ? "#" + activeChannel : ""
              }`}
            />
          </form>
        </div>

        {/* LOADER  */}
        <div className="flex flex-col items-center justify-center gap-3 w-full absolute -top-40">
          {fileLoading && (
            <p className="text-4xl text-white right-0 font-bold z-10">
              Loading file<TbLoader2 className="animate-spin"></TbLoader2>
            </p>
          )}
          {isUploading && (
            <p className="text-4xl text-white font-bold z-10 scale-110 transition-all duration-500 bg-color-1 rounded-md shadow-lg border-color-3 flex items-center justify-center w-max py-6 px-4">
              {/* Loading Image&nbsp; */}
              <TbLoader2 className="animate-spin"></TbLoader2>
            </p>
          )}
        </div>

        <div className="flex items-center">
          <FaFileUpload
            onClick={handleUpload}
            className={` mx-1 md:mx-2 text-base lg:text-lg cursor-pointer  ${
              imageUrl
                ? "text-blue-400 scale-105 animate-bounce font-bold"
                : "text-slate-200 hover:text-white"
            }`}
          ></FaFileUpload>
          <MdOutlineGif className="text-slate-200 mx-1 md:mx-2 text-lg lg:text-3xl cursor-pointer hover:text-white"></MdOutlineGif>
          <FaSmile onClick={() => setShowEmoji(!showEmoji)} className="text-slate-200 mx-1 md:mx-2 text-base lg:text-lg cursor-pointer hover:text-white"></FaSmile>
          {showEmoji && (
            <div className="absolute bottom-0 left-[10%]">
              <Picker onEmojiClick={onEmojiClick}></Picker>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
