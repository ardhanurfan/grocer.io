import { useParams } from "react-router";
import Header from "../components/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";

function DetailProduk() {
  const params = useParams();

  const idx = params.id;

  const supabaseUrl = "https://qjalrjzippcvvctepuqc.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYWxyanppcHBjdnZjdGVwdXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjA4NTgsImV4cCI6MjAxNjkzNjg1OH0.wW-iHoAknfsRYRptAUqM4KVTzFak3TEtaPXzCSvux7Q"; // Ganti dengan API Key Supabase Anda

  const supabase = createClient(supabaseUrl, supabaseKey);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from("products").select("*").eq('id', idx).single();
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
      <div className="w-full h-full px-20 pb-10">
        <Header />
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
                Price <span className="font-normal"><FormatRupiah value = {product ? product.price : 0}/></span>
              </p>
              <p className="text-2xl font-semibold mr-6">
                Stok <span className="font-normal">{product && product.stok}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduk;
