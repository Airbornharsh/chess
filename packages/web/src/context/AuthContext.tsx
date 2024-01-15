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

interface UserAuthContextProps {
  user: FirebaseUser | null
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

  console.log(children)

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}
