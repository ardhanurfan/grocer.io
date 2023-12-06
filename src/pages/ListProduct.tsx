import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/api";

function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          throw error;
        }
        setProducts(data as Product[]);
      } catch (error) {
        console.error("Error fetching products");
      }
    }

    fetchProducts();
  }, []);
  return (
    <div className="w-full flex flex-col pb-10 bg-background min-h-screen pt-[120PX] px-4 xl:px-28 gap-12 items-center">
      <h1 className="text-[24px] md:text-[36px] xl:text-[64px] font-bold text-purple-primary text-center">
        PRODUCTS
      </h1>
      <div className="w-full">
        <div className="w-full grid grid-cols-4 justify-items-center gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
