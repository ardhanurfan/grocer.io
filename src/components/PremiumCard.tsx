import { Link } from "react-router-dom";
import { formatRp } from "./FormatRp";
import { FaCheck } from "react-icons/fa";

const PremiumCard = ({
  title,
  price,
  duration,
}: {
  title: string;
  price: number;
  duration: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl ease-in-out duration-300 cursor-pointer border border-third w-full">
      <div>
        <h3 className=" text-3xl font-bold mb-2">{title}</h3>
        <p className=" text-xl font-bold mb-2">{formatRp(price)}</p>
      </div>
      <div className=" pt-5">
        <div className="flex gap-4 items-center ">
          <FaCheck />
          <p className=" text-base">Duration: {duration} month</p>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <Link
          to={"/"}
          className=" bg-primary text-white px-6 py-3 mt-8 rounded-full font-bold hover:bg-opacity-80 active:bg-opacity-50 transition-all duration-300 flex gap-2 justify-center items-center"
        >
          Choose
        </Link>
      </div>
    </div>
  );
};

export default PremiumCard;
