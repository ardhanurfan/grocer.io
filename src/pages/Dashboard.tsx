import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Dashboard() {
  return (
    <>
      <div className="bg-gray-100 text-gray-800 min-h-screen overflow-auto">
        <Header
          onSearch={function (x: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Banner />
        {/* Featured Products Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold ">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* {filtered.map((shoes: Product, index) => (
              <div key={index} className="flex-shrink-0">
                <ProductCard
                  onSelect={(product) => {
                    setSelected(product);
                    setShowDetail(true);
                  }}
                  product={shoes}
                  onDelete={(id) => {
                    setShowHapusProduct(true);
                    setProductId(id);
                  }}
                  onAdd={(id) => {
                    setShowAddVarian(true);
                    setProductId(id);
                  }}
                />
              </div>
            ))} */}
          </div>
        </section>

        {/* Brands Section */}
        <section className="container mx-auto my-12">
          <h2 className="text-4xl font-bold ">Brands</h2>
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
