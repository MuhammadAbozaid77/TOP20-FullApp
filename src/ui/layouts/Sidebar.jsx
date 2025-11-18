import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar({ collapseState }) {
  return (
    <div
      className={`bg-teal900  backdrop-blur-xl  
                     transition ease-in-out duration-300 flex flex-col relative z-10 
                     max-h-screen overflow-auto ${
                       collapseState ? "w-[80px]" : "lg:w-[280px] w-[80px]"
                     }`}
    >
      <div className="flex justify-center items-center px-5 border-b border-teal-800 h-[100px] ">
        <Logo collapseState={collapseState} />
      </div>
      <SidebarLinks collapseState={collapseState} />
    </div>
  );
}
