import { GeneralLinks } from "@/utils/DashboardLinks";
import Link from "next/link";

export default function SidebarLinks({ collapseState }) {
  return (
    <div className="flex-1 p-5">
      {/* <!-- لو عندك محتوى طويل هنا هيعمل scroll --> */}
      <h1 className="text-[12px] text-gray-400 mb-[10px]">General</h1>
      <ul className="text-white  ">
        {GeneralLinks?.map((item) => {
          return (
            <li
              key={item.id}
              className={`flex items-center gap-2 mb-2 ${
                collapseState
                  ? "justify-center"
                  : "lg:justify-start justify-center"
              }`}
            >
              <span className=" text-gray-500 rounded-md flex justify-center items-center">
                {item?.icon}
              </span>
              {collapseState ? (
                <></>
              ) : (
                <Link href={item.url}>
                  {" "}
                  <span className="text-gray-400 text-[16px]">
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
