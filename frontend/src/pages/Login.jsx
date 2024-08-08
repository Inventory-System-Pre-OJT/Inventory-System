import { GiMedicines } from "react-icons/gi";
import { TextField } from "../components";  // Changed from "../src/components"
import { Form, Formik } from "formik";
import { Links } from "../components";  // Changed from "../src/components"
import { GoDotFill } from "react-icons/go";
import { LoginSchema } from "../schema";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authUser.js";

export const Login = () => {
  const getYear = new Date();
  const { login } = useAuthStore();

  const loginHandler = async () => {
    const success = await login(values);
  }

  return (
    <section className="grid grid-rows-[50px_1fr] md:grid-rows-1 md:grid-cols-2 dark:bg-slate-800 w-full h-full gap-5 p-5 md:p-0 text-center">
      <div className=" bg-transparent md:bg-secondary  md:order-1 flex justify-center md:items-center relative ">
        <div>
          <GiMedicines className=" text-6xl md:text-[10rem] text-accent" />
        </div>
        <div className="blurred p-5 absolute top-[2rem] left-28 right-28 bottom-[0%] md:top-[50%] md:bottom-[30%] md:left-0 md:right-0  "></div>
      </div>
      
      <div className="mt-3 md:mt-0 self-start  flex flex-col justify-between p-0 md:p-5 h-full ">
        
      <div className=" opacity-0 md:opacity-100 flex flex-row items-center gap-1">
          <GoDotFill className=" text-accent text-md dark:text-green-500"/>
          <p className="  self-start font-semibold text-[0.8rem] dark:text-slate-400">
            Eurasia Research Pharma Corp
          </p>
        </div>
        <div className="text-center w-full md:w-[80%] m-auto flex flex-col justify-start md:justify-around  h-full gap-16 md:gap-0 md:h-[30rem] ">
          <div>
            <h1 className=" text-3xl font-medium dark:text-slate-500 mb-1">Welcome Eurasia Inventory</h1>
            <p className=" text-gray-600 dark:text-slate-500 text-[1.1rem]">
              Welcome back! Please enter your details.
            </p>
          </div>
          <Formik initialValues={{
            email: '',
            password : ''
          }} onSubmit={loginHandler} validationSchema={LoginSchema}>
            <Form className="flex flex-col gap-3 text-start ">
              <TextField
                type="text"
                label="Email"
                name="email"
                placeholder="example@email.com"
              />
              <TextField
                type="text"
                label="Password"
                name="password"
                placeholder="*********"
              />
              <Links
                to="forgetpass"
                name="Forget Password"
                style="self-end text-[0.8rem] text-accent font-semibold border-b-[1px] border-gray-400 "
              />
              <button type="submit" className="dark:bg-green-500 bg-accent p-2 text-white rounded-md font-bold">
                Login
              </button>
            </Form>
          </Formik>
          <p className="dark:text-slate-500">
            Don’t have an account?
            <Links
              to="sign-up"
              name=" Sign Up"
              style=" text-accent dark:text-slate-400 font-bold border-b-[1px] border-gray-400  "
            />{" "}
          </p>
        </div>
        <p className=" self-center md:self-start font-medium text-[0.8rem] dark:text-slate-500">© {getYear.getFullYear()} , Eurasia Resarch Pharma Corp</p>
      </div>
    </section>
  );
};

