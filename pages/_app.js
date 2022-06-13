import { Provider } from 'react-redux';
import { store } from '../services/store';
import '../styles/globals.css'
import * as firebase from 'firebase/app'

const FIREBASE_PK = process.env.NEXT_PUBLIC_FIREBASE_PK
const firebaseConfig = JSON.parse(FIREBASE_PK)
firebase.initializeApp(firebaseConfig)

const MyApp = ({ Component, pageProps }) => {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
