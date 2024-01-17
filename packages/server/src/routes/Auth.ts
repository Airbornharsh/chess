import { LoginHandler, RegisterHandler } from '../controllers/AuthController'
import { Router } from 'express'

const AuthRouter = (router: Router) => {
  const auth = Router()

  router.use('/auth', auth)

  auth.get('/', (req, res) => {
    res.send('Auth API!')
  })
  auth.post('/login', LoginHandler)
  auth.post('/register', RegisterHandler)
}

export default AuthRouter
