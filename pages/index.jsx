import { useEffect } from "react";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Layout from "../components/layout";
import { handleError } from "../utils/helper";
import { useAuth } from "../utils/useAuth";

export default function Home() {
  const { authCheck, login } = useAuth();
  const loginEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    try {
      console.log(email, pass);
      // const provider = new GoogleAuthProvider()
      // const result = await signInWithPopup(getAuth(), provider)
      // login(result.user)
    } catch (error) {
      return handleError(error);
    }
  };
  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      login(result.user);
    } catch (error) {
      return handleError(error);
    }
  };
  const loginFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      console.log("login facebook", result.user);
      login(result.user);
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <Layout className="home-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 text-white space-y-10 md:pr-40">
          <div className="text-2xl leading-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="text-lg leading-8">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary
          </div>
          <div className="text-lg leading-8">
            There are many variations of passages of Lorem Ipsum:
            <ul className="list-disc pl-5">
              <li>
                The first line of Lorem Ipsum, Lorem ipsum dolor sit amet
              </li>
              <li>The standard chunk of Lorem Ipsum used since the 1500s</li>
            </ul>
          </div>
        </div>
        <div className="col-span-1 drop-shadow-lg bg-white rounded p-4 md:p-10 mt-10 md:mt-0 space-y-5 border border-gray-200">
          <form className="space-y-5" onSubmit={loginEmail}>
            <div className="text-gray-500 text-center text-lg tracking-wide">
              Join <b>STRBookingPortal</b> now
            </div>
            <input
              type="text"
              name="email"
              className="bg-gray-100 border-0 rounded w-full"
              placeholder="Email *"
            />
            <input
              type="password"
              name="pass"
              className="bg-gray-100 border-0 rounded w-full"
              placeholder="Password *"
            />
            <button className="w-full bg-blue-600 rounded-lg py-3 text-white">
              Login
            </button>
          </form>
          <button
            className="w-full bg-red-500 rounded-lg py-3 text-white flex items-center justify-center"
            onClick={loginGoogle}
          >
            <IoLogoGoogle /> &nbsp; Google
          </button>
          <button
            className="w-full bg-blue-800 rounded-lg py-3 text-white flex items-center justify-center"
            onClick={loginFacebook}
          >
            <IoLogoFacebook /> &nbsp; Facebook
          </button>
        </div>
      </div>
    </Layout>
  );
}
