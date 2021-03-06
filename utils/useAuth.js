import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { login, logout } from '../services/auth'

export const useAuth = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user, shallowEqual);
  const setLogin = (value) => {
    const payload = {
      uid: value.uid,
      fullname: value.displayName,
      email: value.email,
      phone: value.phoneNumber,
      photo: value.photoURL,
      token: value.accessToken
    }
    dispatch(login(payload))
    if (router.pathname === '/') {
      router.push('/admin')
    }
  }
  const setLogout = () => {
    signOut(getAuth())
    dispatch(logout())
    if (router.pathname !== '/') {
      router.push('/')
    }
  }
  return {
    user,
    auth: getAuth(),
    login: setLogin,
    logout: setLogout,
    authCheck: () => {
      if (!user) {
        onAuthStateChanged(getAuth(), (authUser) => {
          if (authUser) {
            setLogin(authUser)
          } else {
            setLogout()
          }
        });
      } else {
        if (router.pathname === '/') {
          router.push('/admin')
        }
      }
    }
  };
};