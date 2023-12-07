import { useParams } from "react-router";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { supabase } from "../lib/api";
import Button from "../components/Button";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function DetailProduk() {
  const params = useParams();
  const idx = params.id;

  const cartContext = useContext(CartContext);

  const navigator = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", idx)
          .single();
        if (error) {
          throw error;
        }
        setProduct(data as Product);
      } catch (error) {
        console.error("Error fetching products");
      }
    }

    fetchProducts();
  }, []);
  return (
    <>
      <div className="w-full h-full pb-10 container">
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
        <div className="w-full justify-center text-4xl font-bold">
          Detail Product
        </div>
        <div className="flex mt-10 gap-10">
          <img
            src="/terang.jpg"
            alt=""
            className="text-center max-h-80 max-w-80 rounded-lg"
          />
          <div className="w-full flex flex-col gap-5">
            <p className="text-3xl font-bold">{product && product.name}</p>
            <p className="text-2xl font-semibold">{product && product.name}</p>
            <p className="text-[16px] font-normal">
              {product && product.description}
            </p>
            <div className="w-full flex justify-between">
              <p className="text-2xl font-semibold">
                Price{" "}
                <span className="font-normal">
                  <FormatRupiah value={product ? product.price : 0} />
                </span>
              </p>
              <p className="text-2xl font-semibold mr-6">
                Stok{" "}
                <span className="font-normal">{product && product.stok}</span>
              </p>
            </div>
            {product &&
              cartContext &&
              (cartContext.cart.filter((item) => item.product.id == product.id)
                .length > 0 ? (
                <Button
                  type={"button"}
                  text="Remove from Cart"
                  color="red"
                  onClick={() => {
                    cartContext.setCart([
                      ...cartContext.cart.filter(
                        (item) => item.product.id != product.id
                      ),
                    ]);
                  }}
                />
              ) : (
                <Button
                  type={"button"}
                  text="Add to Cart"
                  onClick={() => {
                    cartContext.setCart([
                      ...cartContext.cart,
                      { product: product!, qty: 1 },
                    ]);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduk;
