import Icons from "./Icons";
import Tower from "./Tower";
import Vc_Connected from "./Vc_Connected";

export default function VC() {
  return (
    <div className=" flex flex-nowrap justify-between items-center  border-y py-1 text-green-400  lg:px-6 sm:px-4 px-2 border-color-1">

      {/* TOWER  */}
        <Tower></Tower>

      {/* VC CONNECTED  */}
        <Vc_Connected></Vc_Connected>

      {/* ICONS  */}
      <Icons></Icons>
    </div>
  )
}
