import { FcGoogle } from 'react-icons/fc'
import { auth } from '../config/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'

const Auth = () => {
  const onGoogleLogin = async () => {
    try {
      const gooleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, gooleProvider)

      const token = await userCredential.user?.getIdToken()

      const res = await axios.post(
        `${import.meta.env.VITE_APP_BAKCEND_API_URL}auth/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      console.log('finally')
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
      <div className="text-2xl">
        Welcome to <span className="text-7xl font-bold">Chess</span>
      </div>
      <span
        className="flex cursor-pointer items-center gap-2 rounded bg-white px-3 py-2 hover:shadow-md hover:shadow-gray-500"
        onClick={onGoogleLogin}
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-lg text-black">Sign in with Google</span>
      </span>
    </div>
  )
}

export default Auth
