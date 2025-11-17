import Image from "next/image";
import adminImage from "../../public/admin.png";
import storeImage from "../../public/store.png";
import usersImage from "../../public/users.png";
import Link from "next/link";
export default function Home() {
  // #D97757
  //#E2B09F

  const roles = [
    {
      title: "Admin",
      imagePath: adminImage,
      linkPath: "/admin/dashboard",
    },
    {
      title: "Store",
      imagePath: storeImage,
      linkPath: "/store/dashboard",
    },
    {
      title: "User",
      imagePath: usersImage,
      linkPath: "/user/dashboard",
    },
  ];
  return (
    <div className="min-h-screen bg-mainBackground flex justify-center items-center flex-col">
      <h1 className="text-[50px] text-teal700 font-semibold">Hello !</h1>
      <h1 className="mb-5 text-[30px] text-textPrimary font-semibold">
        Select Your Role
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {roles?.map((el) => {
          return (
            <Link key={el.title} href={el.linkPath}>
              <div className="w-full md:w-[250px] shadow rounded-lg overflow-hidden bg-white border-[2px] border-teal-800 cursor-pointer transform transition-transform duration-300 hover:scale-110">
                {/* الصورة ثابتة الحجم على كل الشاشات الصغيرة، و250px على md/lg */}
                <div className="h-[250px] p-5 overflow-hidden">
                  <Image
                    alt=""
                    src={el.imagePath}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="h-[50px] text-[20px] font-semibold bg-teal800 text-white/90 flex justify-center items-center">
                  {el.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
