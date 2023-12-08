function BrandCard({
  brand,
}: {
  brand: string;
}) {

  return (
    <div className="bg-white h-20 rounded-lg overflow-hidden shadow-md hover:shadow-xl ease-in-out duration-300 group cursor-pointer flex justify-center items-center relative">
      <p className="text-gray-700 mt-2 text-2xl font-bold group-hover:text-3xl ease-in-out duration-300">
        {brand}
      </p>
    </div>
  );
}

export default BrandCard;