import { formatRp } from "./FormatRp";

const ProductCard = ({}: {}) => {
  return (
    <div className="relative">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl ease-in-out duration-300 cursor-pointer">
        <img
          className="w-full h-60 object-cover mb-4 rounded-md"
          title={"KONTOL"}
          src={"/banner.jpg"}
        ></img>

        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-2">{"KONTOL"}</h3>
            <p className="text-blue-800 mb-2">{"KONTOL"}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-red-600 font-bold mb-2">{formatRp(10000)}</p>
            <p className="text-gray-600 mb-2">{"ROKOK"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
