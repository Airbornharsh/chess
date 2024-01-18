import { createContext, useContext, useState } from 'react'
import {
  ActivePiece,
  Board,
  GameData,
  PlayerColor,
  SelectedPiece,
} from '../types/type'
import { UserAuthContext } from './AuthContext'
import axios from 'axios'

interface GameContextProps {
  gameData: GameData | null
  setGameData: (gameData: GameData) => void
  moveUpdate: (from: string, to: string) => Promise<boolean>
  type: PlayerColor | null
  setType: (color: PlayerColor) => void
  turn: PlayerColor
  setTurn: (color: PlayerColor) => void
  message: string
  setMessage: (message: string) => void
  moves: string[]
  setMoves: (moves: string) => void
  board: Board
  setBoard: (board: Board) => void
  selectedPiece: SelectedPiece | null
  setSelectedPiece: (piece: SelectedPiece | null) => void
  active: ActivePiece[]
  setActive: (active: ActivePiece) => void
  killSuggestion: ActivePiece[]
  setKillSuggestion: (killSuggestion: ActivePiece) => void
  getOther: (color: PlayerColor) => PlayerColor
  empty: () => void
  getLocation: (x: number, y: number) => string
  timerMessage: (message: string) => void
  reset: () => void
}

export const GameContext = createContext<GameContextProps>(null!)

interface GameContextProviderProps {
  children: React.ReactNode
}

export const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const { user, userData } = useContext(UserAuthContext)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [type, setType] = useState<PlayerColor | null>(null)
  const [turn, setTurn] = useState<PlayerColor>('w')
  const [message, setMessage] = useState<string>('')
  const [moves, setMoves] = useState<string[]>([])
  const [board, setBoard] = useState<Board>({
    8: ['br1', 'bh1', 'bb1', 'bk1', 'bq1', 'bb2', 'bh2', 'br2'],
    7: ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8'],
    6: ['', '', '', '', '', '', '', ''],
    5: ['', '', '', '', '', '', '', ''],
    4: ['', '', '', '', '', '', '', ''],
    3: ['', '', '', '', '', '', '', ''],
    2: ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8'],
    1: ['wr1', 'wh1', 'wb1', 'wk1', 'wq1', 'wb2', 'wh2', 'wr2'],
  })
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>()
  const [active, setActive] = useState<ActivePiece[]>([])
  const [killSuggestion, setKillSuggestion] = useState<ActivePiece[]>([])

  const setGameDataFn = (gameData: GameData) => {
    setType(gameData?.whitePlayer === userData?._id ? 'w' : 'b')
    setGameData(gameData)
  }

  const moveUpdate = async (from: string, to: string) => {
    try {
      const token = await user?.getIdToken()
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/move`,
        {
          board,
          from,
          to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(res)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const setTypeFn = (color: PlayerColor) => {
    setType(color)
  }

  const getOther = (color: PlayerColor) => {
    if (color === 'w') return 'b'
    else return 'w'
  }

  const setTurnFn = (color: PlayerColor) => {
    setTurn(color)
  }

  const setMessageFn = (message: string) => {
    setMessage(message)
  }

  const setMovesFn = (moves: string) => {
    setMoves((prev) => [...prev, moves])
  }

  const setBoardFn = (board: Board) => {
    setBoard(board)
  }

  const setSelectedPieceFn = (piece: SelectedPiece | null) => {
    setSelectedPiece(piece)
  }

  const setActiveFn = (active: ActivePiece) => {
    setActive((prev) => [...prev, active])
  }

  const setKillSuggestionFn = (killSuggestion: ActivePiece) => {
    setKillSuggestion((prev) => [...prev, killSuggestion])
  }

  const empty = () => {
    setActive([])
    setSelectedPiece(null)
    setKillSuggestion([])
  }

  const getLocation = (x: number, y: number) => {
    if (y === 0) {
      return `a${x}`
    } else if (y === 1) {
      return `b${x}`
    } else if (y === 2) {
      return `c${x}`
    } else if (y === 3) {
      return `d${x}`
    } else if (y === 4) {
      return `e${x}`
    } else if (y === 5) {
      return `f${x}`
    } else if (y === 6) {
      return `g${x}`
    } else if (y === 7) {
      return `h${x}`
    } else {
      return ''
    }
  }

  const timerMessage = (message: string) => {
    setMessage(message)
    setMovesFn(message)
    setTimeout(() => {
      setMessage('')
    }, 1000)
  }

  const reset = () => {}

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGameData: setGameDataFn,
        moveUpdate,
        type,
        setType: setTypeFn,
        turn,
        setTurn: setTurnFn,
        message,
        setMessage: setMessageFn,
        moves,
        setMoves: setMovesFn,
        board,
        setBoard: setBoardFn,
        selectedPiece: selectedPiece!,
        setSelectedPiece: setSelectedPieceFn,
        active,
        setActive: setActiveFn,
        killSuggestion,
        setKillSuggestion: setKillSuggestionFn,
        getOther,
        empty,
        getLocation,
        timerMessage,
        reset: reset,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGameContext = () => {
  return useContext(GameContext)
}

export default useGameContext
