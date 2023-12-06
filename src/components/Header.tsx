import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "./Toast";
import { UserContext } from "../context/UserContext";
import { useEventListener } from "usehooks-ts";

function Header() {
  const navigator = useNavigate();
  const { user } = useContext(UserContext);
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

  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("token_vshoes");
      toastSuccess("Log Out Successfully");
      navigator("/login");
    } catch (error) {
      toastError("Logout Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-2">
      <div className="flex items-center justify-between">
        <img src="/logo_text.png" className="h-12" alt="Profile" />
        <div className="p-3 flex items-center gap-4">
          <div
            className="account-detail hamburger flex cursor-pointer items-center group"
            onClick={() => setAccount(!isAccount)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${"Ramadhan"}&color=FDFDFD&background=006837`}
              className="account-detail hamburger h-12 w-12 shrink-0 rounded-full"
              alt="Profile"
            />
            <div className="account-detail hamburger ml-3 relative">
              <p className="hamburger account-detail overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold text-purple-primary group-hover:text-orange-primary text-end max-w-[150px]">
                {"Ramadhan Sanantaa"}
              </p>
              {isAccount && (
                <div className="absolute w-[200px] bg-white shadow-lg right-0 top-0 translate-y-[48px] rounded-lg">
                  <div
                    onClick={() => navigator("/history")}
                    className="cursor-pointer py-3 px-4 text-[16px] font-bold text-dark hover:bg-primary hover:text-white rounded-t-lg"
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
