import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default RoutesContainer
