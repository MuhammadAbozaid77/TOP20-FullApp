import {
  Bell,
  CircleUserRound,
  Laugh,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import CollapsedButton from "./CollapsedButton";
import LogoutButton from "../shared/LogoutButton";

export default function AppHeader({ setcollapseState }) {
  return (
    <div className="h-[100px] border-b ">
      <div className="flex justify-between items-center h-full px-[25px]">
        <div className="flex justify-between items-center gap-5">
          <CollapsedButton setcollapseState={setcollapseState} />
          <div className="flex items-center gap-2">
            <span className="text-teal600 text-[24px] font-bold ">Welcome</span>
            <Laugh size={28} strokeWidth={2} className="text-teal600" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <Settings
              size={28}
              strokeWidth={1}
              className="text-teal600 cursor-pointer hover:bg-teal-600 hover:text-white rounded-md p-1 transition-all duration-200"
            />
            <Bell
              size={28}
              strokeWidth={1}
              className="text-teal600 cursor-pointer hover:bg-teal-600 hover:text-white rounded-md p-1 transition-all duration-200"
            />
            <CircleUserRound
              size={28}
              strokeWidth={1}
              className="text-teal600 cursor-pointer hover:bg-teal-600 hover:text-white rounded-md p-1 transition-all duration-200"
            />
            <LogoutButton />
          </div>
          <div className="bg-[#EAE8E8] flex justify-between items-center px-2 ml-4 rounded-md shadow-sm ">
            <Search size={28} strokeWidth={1} className="text-teal-600" />
            <input
              className=" p-2 text-teal-800  w-[200px] bg-[#EAE8E8] focus:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
