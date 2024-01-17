import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import axios from 'axios'
import { Userdata } from '../types/type'

interface UserAuthContextProps {
  user: FirebaseUser | null
  userData: Userdata | null
  logIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  googleSignIn: () => Promise<UserCredential>
}

export const UserAuthContext = createContext<UserAuthContextProps>(null!)

interface UserAuthContextProviderProps {
  children: React.ReactNode
}

export const UserAuthContextProvider: React.FC<
  UserAuthContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<Userdata | null>(null)

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
    return
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
    return
  }

  const logOut = async () => {
    await signOut(auth)
  }

  const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return await signInWithPopup(auth, googleAuthProvider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const token = await currentUser?.getIdToken()
        const userRes = await axios.post(
          `${import.meta.env.VITE_APP_BAKCEND_API_URL}auth/login`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setUserData(userRes.data)
        setUser(currentUser)
      } catch (e) {
        console.log(e)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserAuthContext.Provider
      value={{ user, userData, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}
