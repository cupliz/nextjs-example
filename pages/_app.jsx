// import axios from "axios";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import * as firebase from "firebase/app";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { store } from "../services/store";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     toast.error(error.response?.data?.message || error.message);
//   }
// );

const MyApp = ({ Component, pageProps }) => {
  const FIREBASE_PK = process.env.NEXT_PUBLIC_FIREBASE_PK;
  const firebaseConfig = FIREBASE_PK ? JSON.parse(FIREBASE_PK) : "";
  firebase.initializeApp(firebaseConfig);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
