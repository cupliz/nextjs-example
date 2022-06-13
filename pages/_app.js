import axios from 'axios'
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app'
import { store } from '../services/store';
import '../styles/globals.css'

const FIREBASE_PK = process.env.NEXT_PUBLIC_FIREBASE_PK
const firebaseConfig = JSON.parse(FIREBASE_PK)
firebase.initializeApp(firebaseConfig)

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || error.message)
  }
)

const MyApp = ({ Component, pageProps }) => {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
