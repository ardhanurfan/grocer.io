import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Textfield from "../components/TextField";
import { supabase } from "../lib/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Premium() {
  const navigator = useNavigate();
  const userContext = useContext(UserContext);
  async function setPremium() {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { premium: true },
      });

      if (error) {
        toast("Error");
      }
      if (data.user) {
        userContext?.setUser({
          id: data.user.id,
          fullname: data.user.user_metadata?.fullname || "",
          email: data.user.email || "",
          password: "",
          premium: data.user.user_metadata?.premium || false,
        });
      }
      toast("Welcome to Premium Club", { position: toast.POSITION.TOP_CENTER });
      navigator("/");
    } catch (error) {
      toast("Error");
    }
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-44 pt-16">
        <h1 className="font-extrabold text-5xl text-primary">Set Your Plan</h1>
        <div className="w-full pt-12">
          <Textfield label="Nama Penerima" />
          <Textfield label="Alamat Pengantaran" />
          <Textfield label="Jadwal Pengiriman" />
          <Textfield label="Nomor Handphone" />
          <Textfield label="Produk" />
          <div className=" flex gap-3">
            <Button
              type="submit"
              color="primary"
              text="Set Plan"
              onClick={() => {
                setPremium();
              }}
            />
            <Button
              type="submit"
              color="red"
              text="Cancel"
              onClick={() => navigator("/")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Premium;
