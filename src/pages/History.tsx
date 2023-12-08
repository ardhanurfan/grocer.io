import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import moment from "moment";

export default function History() {
  const [products, setProducts] = useState<any[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("orderItems")
          .select("*,products(*)").order('created_at', { ascending: false });
        if (error) {
          throw error;
        }
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
          Your History
        </h1>
        <div className="w-full">
          <div className="w-full grid grid-cols-4 justify-items-center gap-6 my-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product.products}
                expiredDate={moment(product.products.created_at).format(
                  "DD MMM YYYY"
                )}
                amount={product.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
