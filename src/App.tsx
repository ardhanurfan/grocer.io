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
import Premium from "./pages/Premium";
import Rack from "./pages/Rack";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProvider from "./context/UserContext";
import History from "./pages/History";
import CartProvider from "./context/CartContext";
import Cookies from "js-cookie";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const ProtectedRoute = () => {
  const token = Cookies.get("token_grocerio");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <CartProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </CartProvider>
  );
};

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Dummy title={"Not Found"} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<DetailProduk />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/rack" element={<Rack />} />
        <Route path="/history" element={<History />} />
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
