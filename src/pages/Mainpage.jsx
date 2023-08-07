import adminImg from "../assets/admin2.png";
import srecImg from "../assets/srec.png";
import menuBar from "../assets/menu.png";

const Mainpage = () => {
  return (
    <>
      <nav
        name="navbar"
        className="flex  justify-between p-3 bg-[#071952] sticky top-0 text-white"
      >
        <ul>
          <li>SRECIAN</li>
        </ul>
        <img src={menuBar} alt="" className="md:hidden " />
      </nav>
      <div className="bg-[#EEEDED]">
        <div className="flex flex-col justify-center items-center md:h-screen">
          <div>
            <h1 className=" sm:text-4xl  md:text-6xl  uppercase flex justify-center font-signature">
              skill fest
            </h1>
            <img src={srecImg} alt="" className=" sm:w-72 md:w-[24rem] mt-8" />
          </div>
          <div className="bg-[#0D1282] md:w-96  p-6 rounded-md md:mb-14 ">
            <h1 className="flex items-center justify-center text-2xl text-white ">
              Login <img src={adminImg} alt="" />
            </h1>
            <hr className="mt-3" />
            <div className="mt-3 space-y-6 sm:text-sm md:text-lg">
              <input
                type="text"
                placeholder="Email"
                className="w-full p-2 rounded-md  outline-violet-800"
              />
              <input
                type="text"
                placeholder="Password"
                className="w-full p-2 rounded-md  outline-violet-500 duration-75"
              />
              <button className=" flex justify-center items-start border p-2 rounded-md w-full bg-[#F0DE36] hover:bg-[#F0DE36] active:bg-[#F1C93B] hover:scale-105 duration-150">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
