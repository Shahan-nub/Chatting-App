import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCall } from "react-icons/io";

export default function Icons() {
  return (
    <div className="flex flex-col text-color-1 font-bold text-xl h-full justify-between">
      <IoIosInformationCircleOutline className="hover:text-white cursor-pointer mb-1 md:mb-2"></IoIosInformationCircleOutline>
      <IoIosCall className=" hover:text-white cursor-pointer mt-1 md:my-2"/>
    </div>
  )
}
