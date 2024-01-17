import { RequestHandler } from 'express'
import GameModel from '../models/gameModel'
import PlayerModel from '../models/playerModel'
import GameStateModel from '../models/gameStateModel'
import { firestore } from '../config/firebase'

export const CreateGameHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({ player1: userData._id })

    if (gameData)
      return res.status(409).json({ message: 'Game already exists' })

    let inviteCode

    while (true) {
      inviteCode = Math.ceil(Math.random() * 1000000).toString()

      if (inviteCode.length !== 6) continue

      const checkGameExists = await GameModel.findOne({ inviteCode })

      if (checkGameExists)
        return res.status(409).json({ message: 'Game already exists' })
      else break
    }

    const newGame = await GameModel.create({
      players: userData._id,
      whitePlayer: userData._id,
      status: 'waiting',
      inviteCode,
      gameStates: [],
      moves: [],
      latestGameStateIndex: 0,
    })

    const gameState = await GameStateModel.create({
      index: 0,
      gameId: newGame._id,
      board: {
        8: ['br1', 'bh1', 'bb1', 'bk1', 'bq1', 'bb2', 'bh2', 'br2'],
        7: ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8'],
        6: ['', '', '', '', '', '', '', ''],
        5: ['', '', '', '', '', '', '', ''],
        4: ['', '', '', '', '', '', '', ''],
        3: ['', '', '', '', '', '', '', ''],
        2: ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8'],
        1: ['wr1', 'wh1', 'wb1', 'wk1', 'wq1', 'wb2', 'wh2', 'wr2'],
      },
    })

    await GameModel.findByIdAndUpdate(newGame._id, {
      $push: { gameStates: gameState._id },
    })

    await PlayerModel.findByIdAndUpdate(userData._id, {
      $push: { games: newGame._id },
    })

    await firestore
      .collection('games')
      .doc(newGame._id.toString())
      .create({
        players: [userData._id.toString()],
        whitePlayer: userData._id.toString(),
        blackPlayer: '',
        inviteCode,
        board: JSON.parse(JSON.stringify(gameState.board)),
        createdAt: newGame.createdAt,
        turn: 'white',
      })

    return res.status(201).json(newGame)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const JoinGameHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({
      inviteCode: req.body.inviteCode,
    })

    if (!gameData) return res.status(404).json({ message: 'Game not found' })

    if (gameData.players.includes(userData._id)) {
      return res.status(409).json({ gameData })
    }

    await GameModel.findByIdAndUpdate(gameData._id, {
      $push: { players: userData._id },
      blackPlayer: userData._id,
    })

    await PlayerModel.findByIdAndUpdate(userData._id, {
      $push: { games: gameData._id },
    })

    const docRef = firestore.collection('games').doc(gameData._id.toString())

    const doc = await docRef.get()

    await docRef.update({
      players: [...doc.data()?.players, userData._id.toString()],
      blackPlayer: userData._id.toString(),
    })

    return res.status(200).json(gameData)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const GetGameHandler: RequestHandler = async (req, res) => {
  try {
    const { inviteCode } = req.params

    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({
      inviteCode,
      $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
    })

    if (!gameData) return res.status(404).json({ message: 'Game not found' })

    return res.status(200).json(gameData)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const MovePieceHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({
      $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
    })

    if (!gameData) return res.status(404).json({ message: 'Game not found' })

    await GameStateModel.create({
      index: gameData.latestGameStateIndex + 1,
      gameId: gameData._id,
      board: req.body.board,
    })

    gameData.latestGameStateIndex += 1

    await gameData.save()

    const docRef = firestore.collection('games').doc(gameData._id.toString())

    const doc = await docRef.get()

    await docRef.update({
      board: req.body.board,
      turn: doc.data()?.turn === 'white' ? 'black' : 'white',
    })

    res.status(200).json({
      message: 'success',
    })
  } catch (e) {
    console.log(e)
  }
}

export const ExistsGameHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({
      $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
    })

    if (!gameData) return res.status(404).json({ message: 'Not Found' })

    return res.status(200).json(gameData)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}
