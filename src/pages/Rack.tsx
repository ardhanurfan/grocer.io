import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import GaugeComponent from "react-gauge-component";

export default function Rack() {
  const [products, setProducts] = useState<any[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("orderItems")
          .select("*,products(*)");
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
        <div className="flex justify-center bg-white rounded-lg shadow-md py-3 mt-6">
          <div className="w-full items-center flex flex-col text-dark">
            <GaugeComponent
              type="semicircle"
              pointer={{
                color: "#FF9053",
                length: 0.8,
                width: 15,
              }}
              arc={{
                gradient: true,
                colorArray: ["#33BDFE", "#F8EFE2"],
                width: 0.3,
                padding: 0.003,
              }}
              labels={{
                valueLabel: { formatTextValue: () => " " },
                tickLabels: {
                  type: "outer",
                  defaultTickValueConfig: {
                    formatTextValue: (value) => value + "%",
                    style: { fontSize: 8 },
                  },
                  ticks: [{ value: 25 }, { value: 50 }, { value: 75 }],
                },
              }}
              value={70}
              minValue={0}
              maxValue={100}
            />
            <h2 className="text-xl text-dark">Average Kelembaban</h2>
            <h2 className="text-[40px] text-dark font-bold">{70 + "%"}</h2>
          </div>
          <div className="w-full items-center flex flex-col text-dark">
            <GaugeComponent
              type="semicircle"
              pointer={{
                color: "#FF9053",
                length: 0.8,
                width: 15,
              }}
              arc={{
                gradient: true,
                colorArray: ["#33BDFE", "#F8EFE2"],
                width: 0.3,
                padding: 0.003,
              }}
              labels={{
                valueLabel: { formatTextValue: () => " " },
                tickLabels: {
                  type: "outer",
                  defaultTickValueConfig: {
                    formatTextValue: (value) => value + "ºC",
                    style: { fontSize: 8 },
                  },
                  ticks: [{ value: 25 }, { value: 50 }, { value: 75 }],
                },
              }}
              value={20}
              minValue={0}
              maxValue={100}
            />
            <h2 className="text-xl text-dark">Average Suhu</h2>
            <h2 className="text-[40px] text-dark font-bold">{20 + "°C"}</h2>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full grid grid-cols-4 justify-items-center gap-6 my-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product.products}
                expiredDate={product.expired_date}
                amount={product.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
