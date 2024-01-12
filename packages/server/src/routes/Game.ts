import { Router } from 'express'

const GameRouter = (router: Router) => {
  const game = Router()

  router.use('/game', game)

  game.get('/', (req, res) => {
    res.send('Game API!')
  })
}

export default GameRouter
