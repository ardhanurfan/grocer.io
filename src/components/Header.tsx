import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "./Toast";
import { UserContext } from "../context/UserContext";
import { useEventListener } from "usehooks-ts";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { CartContext } from "../context/CartContext";

function Header() {
  const navigator = useNavigate();
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const [isAccount, setAccount] = useState(false);

  const documentRef = useRef<Document>(document);
  const onClickAccount = (event: Event) => {
    let cekAccount = true;
    const doc = document.getElementsByClassName("account-detail");
    for (let index = 0; index < doc.length; index++) {
      cekAccount = cekAccount && event.target != doc[index];
    }
    if (cekAccount) {
      setAccount(false);
    }
  };
  useEventListener("click", onClickAccount, documentRef);

  const handleLogOut = async () => {
    try {
      toastSuccess("Log Out Successfully");
      navigator("/login");
    } catch (error) {
      toastError("Logout Gagal");
    } finally {
    }
  };

  return (
    <div className="container mx-auto my-2">
      <div className="flex items-center justify-between">
        <img src="/logo_text.png" className="h-12" alt="Profile" />
        <div className="p-3 flex items-center gap-6">
          <Link className="relative text-4xl" to={"/cart"}>
            <FaCartShopping />
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-white font-semibold text-[10px] flex justify-center items-center">
              {cartContext?.cart.reduce((sum, item) => sum + item.qty, 0)}
            </div>
          </Link>
          <div
            className="account-detail flex cursor-pointer items-center group"
            onClick={() => setAccount(!isAccount)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${"Ramadhan"}&color=FDFDFD&background=006837`}
              className="account-detail h-12 w-12 shrink-0 rounded-full"
              alt="Profile"
            />
            <div className="account-detail ml-3 relative">
              <p className="account-detail overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold text-purple-primary group-hover:text-orange-primary text-end max-w-[150px]">
                {userContext!.user?.fullname}
              </p>
              {userContext!.user?.premium && (
                <div className="account-detail flex items-center text-white bg-yellow-600 py-1/2 px-2 text-[12px] rounded-full max-w-fit">
                  <MdOutlineWorkspacePremium />
                  Premium
                </div>
              )}
              {isAccount && (
                <div className="absolute w-[200px] bg-white shadow-lg right-0 top-0 translate-y-[56px] rounded-lg">
                  <div
                    onClick={() => navigator("/rack")}
                    className="cursor-pointer py-3 px-4 text-[16px] font-bold text-dark hover:bg-primary hover:text-white rounded-t-lg"
                  >
                    My Rack
                  </div>
                  <div
                    onClick={() => navigator("/history")}
                    className="cursor-pointer py-3 px-4 text-[16px] font-bold text-dark hover:bg-primary hover:text-white"
                  >
                    History
                  </div>
                  <div
                    onClick={handleLogOut}
                    className="cursor-pointer py-3 px-4 text-[16px] font-bold text-red-500 hover:bg-red-500 hover:text-white rounded-b-lg"
                  >
                    Keluar
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
