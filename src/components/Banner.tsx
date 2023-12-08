import { MdOutlineWorkspacePremium } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Banner = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="bg-gray-900 p-12 text-center rounded-b-3xl flex flex-col items-center bg-[url('/banner.jpg')] bg-cover bg-top">
      <h1 className="text-5xl font-extrabold text-white mb-4">
        Discover the Latest Trends in Footwear
      </h1>
      <p className="text-lg text-white">
        Explore our curated collection and find the perfect pair for every
        style.
      </p>
      <p className="text-lg text-white">
        Consult with us and improve your existing shoes.
      </p>
      <div className="flex gap-4 flex-col md:flex-row">
        {userContext?.user?.premium ? (
          <Link
            to={"/premium"}
            className="bg-white text-gray-900 px-6 py-3 mt-8 rounded-full font-bold hover:bg-opacity-80 active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
          >
            <TiShoppingCart size={28} />
            Shop Now
          </Link>
        ) : (
          <Link
            to={"/premium"}
            className="bg-white text-gray-900 px-6 py-3 mt-8 rounded-full font-bold hover:bg-opacity-80 active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
          >
            <MdOutlineWorkspacePremium size={28} />
            Let's Go Premium
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;
