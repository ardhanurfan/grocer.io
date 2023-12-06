import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "./Toast";
import { UserContext } from "../context/UserContext";

function Header({ onSearch }: { onSearch: (x: string) => void }) {
  const navigator = useNavigate();
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("token_vshoes");
      toastSuccess("Log Out Successfully");
      navigator("/login");
    } catch (error) {
      toastError("Logout Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-6 md:my-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.fullname}&color=FFFFFF&background=6d7482`}
            className="h-12 w-12 shrink-0 rounded-full"
            alt="Profile"
          />
          <p className="ml-3 w-[130px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold text-purple-primary xl:group-hover:text-orange-primary">
            {user?.fullname}
          </p>
        </div>
        <div className="relative w-full max-w-md hidden lg:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border border-gray-300 rounded-l-md text-gray-800 rounded-lg focus:outline-gray-900"
            onChange={(val) => onSearch(val.target.value)}
          />
          <div className="absolute right-0 top-0 h-full bg-gray-900 text-white p-4 rounded-r-md focus:outline-none flex justify-center items-center">
            <FaSearch />
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full font-bold active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
        >
          <>
            <div className="text-2xl">
              <IoIosLogOut />
            </div>
            <p className="hidden md:block">Log Out</p>
          </>
        </button>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md mt-6 lg:hidden">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 border border-gray-300 rounded-l-md text-gray-800 rounded-lg focus:outline-gray-900"
            onChange={(val) => onSearch(val.target.value)}
          />
          <button className="absolute right-0 top-0 h-full bg-gray-900 text-white p-4 rounded-r-md focus:outline-none flex justify-center items-center hover:bg-opacity-80 active:bg-opacity-50">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
