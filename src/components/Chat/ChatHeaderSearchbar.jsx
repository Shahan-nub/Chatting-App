import { FaBell } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";

export default function ChatHeaderSearchbar() {
  return (
    <div className="flex basis-[60%] justify-end items-center">
      <div className="flex items-center justify-evenly w-[20%] text-gray-500 sm:mx-2 ">
        <FaBell className=" cursor-pointer hover:text-white"></FaBell>
        <MdLocationPin className=" cursor-pointer hover:text-white"></MdLocationPin>
        <MdPeopleAlt className=" cursor-pointer hover:text-white"></MdPeopleAlt>
      </div>
      <div>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className="bg-dc-bg mx-2 md:mx-2 shadow-sm hidden md:flex px-2 sm:px-3 py-1 sm:py-1 outline-none rounded-md"
        />
      </div>
      <div className="ml-2 flex justify-evenly w-1/5 sm:w-[12%] md:mx-2 items-center text-gray-500">
        <IoMdSend className="cursor-pointer hover:text-white"></IoMdSend>
        <FaQuestionCircle className="cursor-pointer hover:text-white mx-[6px] lg:mx-3 "></FaQuestionCircle>
      </div>
    </div>
  );
}
