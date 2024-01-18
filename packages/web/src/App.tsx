import { useContext } from 'react'
import RoutesContainer from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { UserAuthContext } from './context/AuthContext'

function App() {
  const { user, logOut } = useContext(UserAuthContext)

  const logOutFn = async () => {
    try {
      await logOut()
      window.location.href = '/'
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="relative">
      {user && (
        <div className="absolute right-0 top-0 flex items-center gap-2">
          <p className="text-white">{user.displayName}</p>
          <button onClick={logOutFn} className="bg-gray-600 px-3 py-2">
            Logout
          </button>
        </div>
      )}
      <BrowserRouter>
        <RoutesContainer />
      </BrowserRouter>
    </div>
  )
}

export default App
