import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailProduk from "./pages/DetailProduk";
import ListProduct from "./pages/ListProduct";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartContext";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const ProtectedRoute = () => {
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <CartProvider>
      {/* <Navbar /> */}
      <Outlet />
    </CartProvider>
  );
};

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Dummy title="kontol" />} />
      <Route path="*" element={<Dummy title={"Not Found"} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailProduk />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

function Dummy({ title }: { title: string }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      {title}
    </div>
  );
}
