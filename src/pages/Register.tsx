import { Link, useNavigate } from "react-router-dom";
import Textfield from "../components/TextField";
import { useState } from "react";
import { toastError, toastSuccess } from "../components/Toast";
import Button from "../components/Button";
import { supabase } from "../lib/api";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigator = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
            fullname: fullName,
            premium: false 
        }
      } 
    });
    console.log(data)
    setIsLoading(false);

    if (data) {
      // Cookies.set("token_grocerio", data.session.access_token);
      toastSuccess("Sign up successfully");
      navigator("/");
    }

    if (error) {
      toastError(error.message);
    } else if (!data && !error) {
      toastError("An email has been sent to you for verification!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-[url('/background_login.jpg')] bg-cover bg-center">
        <form
          onSubmit={(e) => handleRegister(e)}
          className="w-full max-w-md bg-white rounded-lg p-6 bg-opacity-80 backdrop-blur-sm"
        >
          <h2 className="text-gray-800 text-4xl mb-6 font-bold">
            Sign up to continue <br />
            your journey
          </h2>
          <div className="mb-4">
            <Textfield
              label={"Full Name"}
              type="normal"
              onChange={(val) => setFullName(val.target.value)}
            />
          </div>
          <div className="mb-4">
            <Textfield
              label={"Email"}
              type="normal"
              onChange={(val) => setEmail(val.target.value)}
            />
          </div>
          <div className="mb-6">
            <Textfield
              label={"Password"}
              type="password"
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Button type={"submit"} isLoading={isLoading} color="primary" text="Sign In"/>
            <p
              className="inline-block align-baseline font-bold text-sm text-gray-800"
            >
              Already have an account? <Link to="/login" className="inline-block align-baseline font-bold text-sm text-gray-800 hover:text-secondary transition-all duration-300">Back to login</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="md:w-1/2 bg-[#FFEDE1] p-8 flex justify-center items-center relative">
        <img
          src="/login_image.svg"
          alt="Illustration"
          className="md:max-w-md xl:max-w-xl absolute bottom-12 right-64"
        />
      </div>
      <hr className="border-2 bottom-12 w-full absolute border-primary"/>
    </div>
  );
};

export default Register;