import { useNavigate } from "react-router-dom";
import { formatRp } from "./FormatRp";

const ProductCard = ({
  product,
  expiredDate,
  amount,
}: {
  product: Product;
  expiredDate?: string;
  amount?: number;
}) => {
  const navigator = useNavigate();
  return (
    <div
      onClick={() => {
        expiredDate ? "" : navigator(`/detail/${product.id}`);
      }}
      className="relative"
    >
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl ease-in-out duration-300 cursor-pointer">
        <img
          className="w-full h-60 object-cover mb-4 rounded-md"
          title={product.name}
          src={"/banner.jpg"}
        ></img>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-blue-800 mb-2">{product.jenis}</p>
          </div>
          <div className="flex justify-between items-center">
            {expiredDate ? (
              <p className="text-red-600 font-bold mb-2">
                {expiredDate.toString()}
              </p>
            ) : (
              <p className="text-red-600 font-bold mb-2">
                {formatRp(product.price)}
              </p>
            )}
            <p className="text-gray-600 mb-2">
              {amount ? (
                <p className="">Quantity: {amount}</p>
              ) : (
                <p className="">Stok: {product.stok}</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
