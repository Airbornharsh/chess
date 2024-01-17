import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { UserAuthContext } from './context/AuthContext'
import { useContext } from 'react'
import Game from './pages/Game'

const RoutesContainer = () => {
  const AuthCtx = useContext(UserAuthContext)
  return (
    <Routes>
      {AuthCtx.user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/game/:inviteCode" element={<Game />} />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default RoutesContainer
