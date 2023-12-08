import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../lib/api";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigator = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          throw error;
        }
        setProducts(data as Product[]);
        setFiltered(data as Product[]);
      } catch (error) {
        console.error("Error fetching products");
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter(
        (val: Product) =>
          val.name.toLowerCase().includes(search.toLowerCase()) ||
          val.jenis.toLowerCase().includes(search.toLowerCase()) ||
          val.price.toString().includes(search.toLowerCase()) ||
          val.stok.toString().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <>
      <div className="min-h-screen overflow-auto">
        <Header />
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-2 border border-gray-300 rounded-l-md text-gray-800 rounded-lg focus:outline-primary"
              onChange={(val) => setSearch(val.target.value)}
            />
            <button className="absolute right-0 top-0 h-full bg-primary text-white p-4 rounded-r-md focus:outline-none flex justify-center items-center hover:bg-opacity-80 active:bg-opacity-50">
              <FaSearch />
            </button>
          </div>
        </div>
        <Banner />

        {/* Featured Products Section */}
        <section className="container mx-auto my-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold ">Featured Products</h2>
            <Button
              type={"button"}
              text="See All"
              onClick={() => navigator("/list-product")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {filtered.map((product: Product, index) => (
              <div key={index} className="flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold mb-6">Our Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* {brands.map((brand, index) => (
              <BrandCard
                key={index}
                brand={brand}
                onDelete={(id) => {
                  setShowHapusBrand(true);
                  setBrandId(id);
                }}
              />
            ))} */}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
