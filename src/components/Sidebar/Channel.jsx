import { setMenu } from "@/lib/features/menuSlice";
import { selectChannelName, setChannelInfo } from "@/lib/features/channelSlice";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function Channel({id,channelName}) {
  const activeChannel = useSelector(selectChannelName);

  const dispatch = useDispatch();
  const handleChannelChange = () => {
    dispatch(setChannelInfo({
      channelId:id,
      channelName:channelName
    }))
    dispatch(setMenu())
  }
  return (
    <div onClick={handleChannelChange}
    className={`group flex items-center text-nowrap text-color-1 font-medium text-sm sm:text-base hover:bg-[#5b5f65] sm:pl-4 pl-3 pr-2 sm:py-2 cursor-pointer py-1 hover:text-white transition-all duration-150
    ${channelName===activeChannel && "bg-[rgb(57_56_61)] text-color-3 font-semibold"}
    `}>
        # {channelName}
        {/* <MdDelete onClick={handleDeleteChannel}
        className="hidden group-hover:block text-color-1 hover:text-red-400"></MdDelete> */}
    </div>
  )
}
