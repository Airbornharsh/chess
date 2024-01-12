import { Router } from 'express'
import GameRouter from './Game'

const UserRouter = (router: Router) => {
  const user = Router()

  router.use('/user', user)

  user.get('/', (req, res) => {
    res.send('User API!')
  })

  GameRouter(user)
}

export default UserRouter
