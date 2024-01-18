import { RequestHandler } from 'express'
import GameModel from '../models/gameModel'
import PlayerModel from '../models/playerModel'
import { firestore } from '../config/firebase'
import MoveModel from '../models/moveModel'

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
      moves: [],
      latestGameStateIndex: 0,
    })

    await PlayerModel.findByIdAndUpdate(userData._id, {
      $addToSet: { games: newGame._id },
    })

    await firestore
      .collection('games')
      .doc(newGame._id.toString())
      .create({
        players: [userData._id.toString()],
        whitePlayer: userData._id.toString(),
        whitePlayerName: userData.name,
        blackPlayer: '',
        inviteCode,
        board: JSON.parse(
          JSON.stringify({
            8: ['br1', 'bh1', 'bb1', 'bk1', 'bq1', 'bb2', 'bh2', 'br2'],
            7: ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8'],
            6: ['', '', '', '', '', '', '', ''],
            5: ['', '', '', '', '', '', '', ''],
            4: ['', '', '', '', '', '', '', ''],
            3: ['', '', '', '', '', '', '', ''],
            2: ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8'],
            1: ['wr1', 'wh1', 'wb1', 'wk1', 'wq1', 'wb2', 'wh2', 'wr2'],
          }),
        ),
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
      winner: null,
      losser: null,
    })

    if (!gameData) return res.status(404).json({ message: 'Game not found' })

    if (gameData.players.includes(userData._id)) {
      return res.status(201).json(gameData)
    }

    if (gameData.players.length === 2)
      return res.status(409).json({ message: 'Game is full' })

    await GameModel.findByIdAndUpdate(gameData._id, {
      $addToSet: { players: userData._id },
      blackPlayer: userData._id,
      blackPlayerName: userData.name,
    })

    await PlayerModel.findByIdAndUpdate(userData._id, {
      $addToSet: { games: gameData._id },
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

// export const GetGameHandler: RequestHandler = async (req, res) => {
//   try {
//     const { inviteCode } = req.params

//     const authPlayer = await res.locals.player

//     const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

//     if (!userData) return res.status(401).json({ message: 'Unauthorized' })

//     const gameData = await GameModel.findOne({
//       inviteCode,
//       $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
//       winner: null,
//       losser: null,
//     })

//     if (!gameData) return res.status(404).json({ message: 'Game not found' })

//     return res.status(200).json(gameData)
//   } catch (e: any) {
//     res.status(500).send(e.message)
//   }
// }

export const MovePieceHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const { board, from, to } = req.body

    const gameData = await GameModel.findOne({
      $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
      winner: null,
      losser: null,
    })

    if (!gameData) return res.status(404).json({ message: 'Game not found' })

    if (gameData.players.length !== 2)
      return res.status(409).json({ message: 'Not enough players' })

    const move = await MoveModel.create({
      from: from,
      to: to,
      previousMove: gameData.currentMove,
      gameId: gameData._id,
      index: gameData.latestGameStateIndex + 1,
    })

    gameData.latestGameStateIndex += 1
    gameData.currentMove = move._id
    gameData.moves.push(move._id)

    await gameData.save()

    const docRef = firestore.collection('games').doc(gameData._id.toString())

    const doc = await docRef.get()

    await docRef.update({
      board: board,
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
      winner: null,
      losser: null,
    })

    if (!gameData) return res.status(404).json({ message: 'Not Found' })

    return res.status(200).json(gameData)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

export const CancelGameHandler: RequestHandler = async (req, res) => {
  try {
    const authPlayer = await res.locals.player

    const userData = await PlayerModel.findOne({ uid: authPlayer.uid })

    if (!userData) return res.status(401).json({ message: 'Unauthorized' })

    const gameData = await GameModel.findOne({
      $or: [{ whitePlayer: userData._id }, { blackPlayer: userData._id }],
    })

    if (!gameData) return res.status(404).json({ message: 'Not Found' })

    gameData.losser = userData._id
    gameData.winner = gameData.players.filter(
      (player) => player.toString() !== userData._id.toString(),
    )[0]
    await gameData.save()

    await firestore.collection('games').doc(gameData._id.toString()).delete()

    await PlayerModel.findByIdAndUpdate(userData._id, {
      $addToSet: { loses: gameData._id },
    })

    await PlayerModel.findByIdAndUpdate(gameData.winner, {
      $addToSet: { wins: gameData._id },
    })

    return res.status(200).json({ message: 'success' })
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}
