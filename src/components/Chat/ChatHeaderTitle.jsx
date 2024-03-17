import { selectMenu, setMenu } from "@/lib/features/menuSlice";
import { selectChannelName } from "@/lib/features/channelSlice"
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"

export default function ChatHeaderTitle() {
  const activeChannel = useSelector(selectChannelName);
  const menuState= useSelector(selectMenu);
  const dispatch=useDispatch();
  return (
    <>
    <div className="flex text-slate-200  items-center text-nowrap basis-[60%] sm:basis-[40%] md:ml-2 text-lg md:text-2xl font-semibold font-sans lg:pl-0 pl-7">
      <MdMenu className={`mr-4 text-xl lg:hidden`}
      onClick={() => {dispatch(setMenu());
      console.log(menuState)
      }}
      ></MdMenu>
      <span className="text-color-1 text-base md:text-2xl text-nowrap lg:text-3xl mr-1 md:mr-2">#</span> {activeChannel? activeChannel : "Text Channels"}
    </div>
    </>
  )
}
