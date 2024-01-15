import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserAuthContextProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserAuthContextProvider>
    <App />
  </UserAuthContextProvider>,
)
