import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserAuthContextProvider } from './context/AuthContext.tsx'
import { GameContextProvider } from './context/GameContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserAuthContextProvider>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </UserAuthContextProvider>,
)
