import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/api";
import Header from "../components/Header";
import Button from "../components/Button";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigator = useNavigate();

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
        Products
      </h1>
      <div className="w-full">
        <div className="w-full grid grid-cols-4 justify-items-center gap-6 my-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
