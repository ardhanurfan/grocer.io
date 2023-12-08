import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/api";

export default function Rack() {
  const [products, setProducts] = useState<any[]>([]);
  const navigator = useNavigate();
  const now = new Date();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("orderItems")
          .select("id,products(id,name)")
        if (error) {
          throw error;
        }
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products");
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <div className="w-full container items-center">
        <Header />
        <div className="my-6">
          <Button
            type={"button"}
            text="Back"
            color="secondary"
            icon={<IoChevronBackCircleOutline />}
            onClick={() => navigator("/")}
          />
        </div>
        <h1 className="text-[40px] font-bold text-purple-primary text-center">
          Your Rack
        </h1>
        <div className="w-full">
          <div className="w-full grid grid-cols-4 justify-items-center gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
