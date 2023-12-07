import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { formatRp } from "../components/FormatRp";
import { useContext } from "react";
import Textfield from "../components/TextField";
import { CartContext } from "../context/CartContext";

function Cart() {
  const navigator = useNavigate();
  const cartContext = useContext(CartContext);

  return (
    <div className="w-full container">
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
        Your Cart
      </h1>
      <div className="flex flex-col justify-center gap-5 px-64 py-10">
        {cartContext?.cart.map((product: CartItem, idx: number) => {
          return (
            <div
              key={idx}
              className="w-full bg-white shadow-lg rounded-lg p-3 flex justify-between"
            >
              <div className="flex gap-6">
                <img
                  className="w-32 h-32 object-cover rounded-md"
                  title={product.product.name}
                  src={"/banner.jpg"}
                ></img>
                <div className="flex flex-col justify-center gap-2">
                  <h3 className="text-lg font-bold">{product.product.name}</h3>
                  <p className="text-blue-800">{product.product.jenis}</p>
                  <p className="text-red-600 font-bold">
                    {formatRp(product.product.price)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-4">
                <div className="flex items-center gap-6">
                  <Button
                    type={"button"}
                    icon={<IoMdAdd />}
                    onClick={() => {
                      cartContext.cart[idx].qty++;
                      cartContext.setCart([...cartContext.cart]);
                    }}
                  />
                  <p className="text-gray-800 font-medium">{product.qty}</p>
                  <Button
                    type={"button"}
                    icon={<IoMdRemove />}
                    color="red"
                    onClick={() => {
                      if (cartContext.cart[idx].qty <= 1) {
                        cartContext.cart.splice(idx, 1);
                        cartContext.setCart([...cartContext.cart]);
                      } else {
                        cartContext.cart[idx].qty--;
                        cartContext.setCart([...cartContext.cart]);
                      }
                    }}
                  />
                </div>
                <p className="text-blue-900 font-bold text-xl">
                  {formatRp(product.product.price * product.qty)}
                </p>
              </div>
            </div>
          );
        })}
        <div className="w-full bg-white shadow-lg rounded-lg p-3">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-bold">Total Order</h3>
            <p className="text-blue-950 text-2xl font-bold">
              {formatRp(
                cartContext!.cart.reduce(
                  (sum, item) => sum + item.qty * item.product.price,
                  0
                )
              )}
            </p>
          </div>
          <form>
            <Textfield required label={"Shipping Address"} />
            <div className="flex justify-center">
              <Button type={"submit"} text="Order Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
