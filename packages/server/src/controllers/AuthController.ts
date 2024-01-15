import { RequestHandler } from 'express'
import { auth } from '../config/firebase'
import PlayerModel from '../models/playerModel'
import { Request, ParamsDictionary, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { DecodedIdToken } from 'firebase-admin/auth'

export const LoginHandler: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const authCheck = await auth.verifyIdToken(token as string)

    if (!authCheck) return res.status(401).json({ message: 'Unauthorized' })

    const playerData = await PlayerModel.findOne({ uid: authCheck.uid })

    if (!playerData) {
      const playerData = await LocalRegisterHandler(req, res, authCheck)
      return res.status(201).json(playerData)
    }

    return res.status(200).json(playerData)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

export const LocalRegisterHandler = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  authCheck: DecodedIdToken,
) => {
  try {
    const newPlayer = await PlayerModel.create({
      uid: authCheck.uid,
      email: authCheck.email,
      phoneNumber: authCheck.phone_number,
      name: authCheck.name,
      photoURL: authCheck.picture,
      avatar: '',
    })

    return newPlayer
  } catch (e: any) {
    console.log(e)
    return e
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
      phoneNumber: authCheck.phone_number,
      photoURL: authCheck.picture,
      avatar: '',
    })

    return res.status(201).json(newPlayer)
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
