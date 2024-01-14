import { RequestHandler } from 'express'
import { auth } from '../config/firebase'
import PlayerModel from '../models/playerModel'

export const LoginHandler: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const authCheck = await auth.verifyIdToken(token as string)

    if (!authCheck) return res.status(401).json({ message: 'Unauthorized' })

    const playerData = await PlayerModel.findOne({ uid: authCheck.uid })

    if (!playerData) {
      return res.status(404).json({ message: 'Player not found' })
    }

    return res.status(200).json(playerData)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

export const RegisterHandler: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const authCheck = await auth.verifyIdToken(token as string)

    if (!authCheck) return res.status(401).json({ message: 'Unauthorized' })

    const playerData = await PlayerModel.findOne({ uid: authCheck.uid })

    if (playerData) {
      return res.status(409).json({ message: 'Player already exists' })
    }

    const newPlayer = await PlayerModel.create({
      uid: authCheck.uid,
      email: authCheck.email,
      name: authCheck.name,
      photoURL: authCheck.picture,
      avatar: '',
    })

    return res.status(201).json(newPlayer)
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
