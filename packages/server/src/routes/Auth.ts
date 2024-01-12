import { Router } from 'express'

const AuthRouter = (router: Router) => {
  const auth = Router()

  router.use('/auth', auth)

  auth.get('/', (req, res) => {
    res.send('Auth API!')
  })
}

export default AuthRouter
