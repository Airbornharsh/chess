import { auth } from '../config/firebase'
import { NextFunction, RequestHandler } from 'express'

export const AuthMiddleware: RequestHandler = (
  req,
  res,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  const authCheck = auth.verifyIdToken(token as string)

  if (!authCheck) return res.status(401).json({ message: 'Unauthorized' })

  res.locals.player = authCheck

  next()
}
