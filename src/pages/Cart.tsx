import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { formatRp } from "../components/FormatRp";
import { useContext, useEffect, useState } from "react";
import Textfield from "../components/TextField";
import { CartContext } from "../context/CartContext";
import { supabase } from "../lib/api";
import { toastError, toastSuccess } from "../components/Toast";
import { randNumber } from "../components/RandomNumber";
import Modal from "../components/Modal";

function Cart() {
  const navigator = useNavigate();
  const cartContext = useContext(CartContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [expedition, setExpedition] = useState<
    { layanan: string; price: number; estimate: string }[]
  >([]);
  const [expeditionSelected, setExpeditionSelected] = useState<{
    layanan: string;
    price: number;
    estimate: string;
  }>();

  useEffect(() => {
    const getExpedition = () => {
      var superjet = randNumber(30, 50);
      var jagoan = randNumber(20, superjet);
      var santuyDikit = randNumber(10, jagoan);
      setExpedition([
        {
          layanan: "Super Jet",
          price: superjet * 1000,
          estimate: "15-25 menit",
        },
        { layanan: "Jagoan", price: jagoan * 1000, estimate: "25-60 menit" },
        {
          layanan: "Santuy Dikit",
          price: santuyDikit * 1000,
          estimate: "60-120 menit",
        },
      ]);
    };
    getExpedition();
  }, []);

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!expeditionSelected) {
        throw "Please select expedition";
      }
      const { error: errOrder, data: dataOrder } = await supabase
        .from("orders")
        .upsert({
          user_id: 1,
          total_price:
            cartContext!.cart.reduce(
              (sum, item) => sum + item.qty * item.product.price,
              0
            ) + expeditionSelected.price,
          address: address,
          shipping_price: expeditionSelected.price,
        })
        .select();

      if (errOrder) {
        throw `Error update room data: ${errOrder.message}`;
      } else {
        var orderId = dataOrder[0].id;
        const expiredDate = new Date();
        expiredDate.setDate(new Date().getDate() + randNumber(3, 7)); // expired antara 3 sampai 7 hari

        const { error: errItem } = await supabase.from("orderItems").upsert(
          cartContext?.cart.map((cartItem: CartItem) => {
            return {
              product_id: cartItem.product.id,
              amount: cartItem.qty,
              total_price: cartItem.product.price * cartItem.qty,
              order_id: orderId,
              expired_date: expiredDate.toISOString(),
            };
          })
        );

        if (errItem) {
          throw `Error update room data: ${errItem.message}`;
        } else {
          toastSuccess("Order Successfully");
          setShowSuccessPopUp(true);
          setExpeditionSelected(undefined);
          setExpedition([]);
          setAddress("");
          cartContext?.setCart([]);
        }
      }
    } catch (error) {
      toastError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={showSuccessPopUp}
        onClose={() => setShowSuccessPopUp(false)}
      >
        <div className="w-full flex flex-col justify-center items-center text-green-primary gap-2 text-primary">
          <FaCheckCircle size={80} />
          <p className="text-[36px] text-dark font-bold mt-4">Order Succees!</p>
          <p className="text-[24px] text-dark font-semibold mb-6">
            We will process your order immediately 🏍️
          </p>
          <Button
            type={"button"}
            text="Back to Home"
            onClick={() => navigator("/")}
          />
        </div>
      </Modal>

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
        {cartContext!.cart.length > 0 ? (
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
                      <h3 className="text-lg font-bold">
                        {product.product.name}
                      </h3>
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
                      <p className="text-gray-800 font-medium">{product.qty}</p>
                      <Button
                        type={"button"}
                        icon={<IoMdAdd />}
                        onClick={() => {
                          cartContext.cart[idx].qty++;
                          cartContext.setCart([...cartContext.cart]);
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
              <form onSubmit={(e) => handleOrder(e)}>
                <Textfield
                  required
                  label={"Shipping Address"}
                  onChange={(val) => setAddress(val.target.value)}
                />
                {address.length > 5 && (
                  <>
                    <p className="text-gray-800 text-sm font-bold mb-2">
                      Expedition Services
                    </p>
                    <div className="flex flex-col gap-3">
                      {expedition.map(
                        (
                          val: {
                            layanan: string;
                            price: number;
                            estimate: string;
                          },
                          idx: number
                        ) => (
                          <div
                            key={idx}
                            onClick={() => setExpeditionSelected(val)}
                            className={`${
                              expeditionSelected == val
                                ? "bg-gray-200"
                                : "bg-white"
                            } p-4 rounded-md shadow-md flex justify-between items-center cursor-pointer`}
                          >
                            <div>
                              <h3 className="text-xl text-dark font-bold">
                                {val.layanan}
                              </h3>
                              <h3 className="text-blue-900 font-medium mt-2">
                                {val.estimate}
                              </h3>
                            </div>
                            <h3 className="text-xl text-red-600 font-bold">
                              {formatRp(val.price)}
                            </h3>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
                <div className="flex justify-between my-6 px-4">
                  <h3 className="text-lg font-bold">Total Order</h3>
                  <p className="text-dark text-2xl font-bold">
                    {expeditionSelected
                      ? formatRp(
                          cartContext!.cart.reduce(
                            (sum, item) => sum + item.qty * item.product.price,
                            0
                          ) + expeditionSelected.price
                        )
                      : formatRp(
                          cartContext!.cart.reduce(
                            (sum, item) => sum + item.qty * item.product.price,
                            0
                          )
                        )}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    type={"submit"}
                    text="Order Now"
                    isLoading={isLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mt-20 gap-6">
              <div className="text-xl text-third">
                Your Cart is Empty! Let's Shopping
              </div>
              <Button
                type={"button"}
                text="Shop Now"
                onClick={() => navigator("/list-product")}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
