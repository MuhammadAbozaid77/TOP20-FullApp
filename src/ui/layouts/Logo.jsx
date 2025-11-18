export default function Logo({ collapseState }) {
  return (
    <div className="text-white  flex justify-center items-center">
      {collapseState ? (
        <h1 className="lg:hidden block text-[40px] font-bold text-white ">
          Z
        </h1>
      ) : (
        <h1 className="lg:block hidden text-[40px] font-bold text-white ">
          Admin
        </h1>
      )}
    </div>
  );
}
