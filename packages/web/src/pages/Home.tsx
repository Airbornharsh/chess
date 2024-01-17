import { useState } from 'react'
import BoardPiece from '../components/BoardPiece'

type Board = {
  [key: string]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
  8: [string, string, string, string, string, string, string, string]
  7: [string, string, string, string, string, string, string, string]
  6: [string, string, string, string, string, string, string, string]
  5: [string, string, string, string, string, string, string, string]
  4: [string, string, string, string, string, string, string, string]
  3: [string, string, string, string, string, string, string, string]
  2: [string, string, string, string, string, string, string, string]
  1: [string, string, string, string, string, string, string, string]
}

type SelectedPiece = {
  x: number
  y: number
}

type ActivePiece = {
  x: number
  y: number
}

type PlayerColor = 'w' | 'b'

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
  }
}

const getOther = (color: PlayerColor) => {
  if (color === 'w') return 'b'
  else return 'w'
}

const Home = () => {
  const color = 'w'
  const [turn, setTurn] = useState<PlayerColor>(color)
  const [message, setMessage] = useState<string>('')
  const [board, setBoard] = useState<Board>({
    8: ['br1', 'bh1', 'bb1', 'bk1', 'bq1', 'bb2', 'bh2', 'br2'],
    7: ['bp1', 'bp2', 'bp3', 'bp4', 'bp5', 'bp6', 'bp7', 'bp8'],
    6: ['', '', '', '', '', '', '', ''],
    5: ['', '', '', '', '', '', '', ''],
    4: ['', '', '', '', '', '', '', ''],
    3: ['', '', '', '', '', '', '', ''],
    2: ['', '', '', '', '', '', '', ''],
    1: ['wr1', 'wh1', 'wb1', 'wk1', 'wq1', 'wb2', 'wh2', 'wr2'],
  })
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>()
  const [active, setActive] = useState<ActivePiece[]>([])
  const [killSuggestion, setKillSuggestion] = useState<ActivePiece[]>([])

  const TimerMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 1000)
  }

  const movePiece = (x: number, y: number) => {
    console.log('Move Piece')
    if (!selectedPiece) return
    if (
      !active.find((a) => a.x === x && a.y === y) &&
      !killSuggestion.find((a) => a.x === x && a.y === y)
    ) {
      setSelectedPiece(null)
      setActive([])
      setKillSuggestion([])
      return
    }
    const newBoard = { ...board }
    const piece = newBoard[`${selectedPiece?.x}`][selectedPiece?.y]
    if (piece.split('')[1] === 'p') onPawnMove(newBoard, piece, x, y)
    if (piece.split('')[1] === 'r') onRookMove(newBoard, piece, x, y)
    if (piece.split('')[1] === 'b') onBishopMove(newBoard, piece, x, y)
    if (piece.split('')[1] === 'q') onQueenMove(newBoard, piece, x, y)
    if (piece.split('')[1] === 'k') onKingMove(newBoard, piece, x, y)
    setBoard(newBoard)
    setSelectedPiece(null)
    setActive([])
    setKillSuggestion([])
    setTurn(turn === 'w' ? 'b' : 'w')
  }

  const setSelectedPieceFn = (x: number, y: number) => {
    console.log('Selected Piece')
    setActive([])
    setKillSuggestion([])
    if (turn !== board[`${x}`][y].split('')[0]) {
      TimerMessage('Not your turn')
      return
    }
    setSelectedPiece({ x, y })
    const piece = board[`${x}`][y]
    if (piece.split('')[1] === 'p') {
      onPawnTap(x, y)
      onPawnTapKill(x, y)
    } else if (piece.split('')[1] === 'r') {
      onRookTap(x, y)
    } else if (piece.split('')[1] === 'b') {
      onBishopTap(x, y)
    } else if (piece.split('')[1] === 'q') {
      onQueenTap(x, y)
    } else if (piece.split('')[1] === 'k') {
      onKingTap(x, y)
      onKingTapKill(x, y)
    }
  }

  const onPawnTap = (x: number, y: number) => {
    if (turn === 'w') {
      if (x == 2) {
        if (board[`${x + 1}`][y]) return
        setActive((prev) => [...prev, { x: x + 1, y }])
        if (board[`${x + 2}`][y]) return
        setActive((prev) => [...prev, { x: x + 2, y }])
      } else {
        if (board[`${x + 1}`][y]) return
        setActive((prev) => [...prev, { x: x + 1, y }])
      }
    } else {
      if (x == 7) {
        if (board[`${x - 1}`][y]) return
        setActive((prev) => [...prev, { x: x - 1, y }])
        if (board[`${x - 2}`][y]) return
        setActive((prev) => [...prev, { x: x - 2, y }])
      } else {
        if (board[`${x - 1}`][y]) return
        setActive((prev) => [...prev, { x: x - 1, y }])
      }
    }
  }

  const onPawnTapKill = (x: number, y: number) => {
    if (turn === 'w') {
      if (board[`${x + 1}`][y + 1]?.split('')[0] === 'b')
        setKillSuggestion((prev) => [...prev, { x: x + 1, y: y + 1 }])
      if (board[`${x + 1}`][y - 1]?.split('')[0] === 'b')
        setKillSuggestion((prev) => [...prev, { x: x + 1, y: y - 1 }])
    } else {
      if (board[`${x - 1}`][y + 1]?.split('')[0] === 'w')
        setKillSuggestion((prev) => [...prev, { x: x - 1, y: y + 1 }])
      if (board[`${x - 1}`][y - 1]?.split('')[0] === 'w')
        setKillSuggestion((prev) => [...prev, { x: x - 1, y: y - 1 }])
    }
  }

  const onPawnMove = (newBoard: Board, piece: string, x: number, y: number) => {
    if (!selectedPiece) return
    if (active.find((a) => a.x === x && a.y === y))
      TimerMessage(
        `Moved from ${getLocation(
          selectedPiece.x,
          selectedPiece.y,
        )} to ${getLocation(x, y)}`,
      )
    else TimerMessage(`Killed ${newBoard[`${x}`][y]}`)
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
    newBoard[`${x}`][y] = piece
  }

  const onKingTap = (x: number, y: number) => {
    if (`${x + 1}` in board && board[`${x + 1}`][y] === '')
      setActive((prev) => [...prev, { x: x + 1, y }])
    if (`${x - 1}` in board && board[`${x - 1}`][y] === '')
      setActive((prev) => [...prev, { x: x - 1, y }])
    if (board[`${x}`][y + 1] === '')
      setActive((prev) => [...prev, { x, y: y + 1 }])
    if (board[`${x}`][y - 1] === '')
      setActive((prev) => [...prev, { x, y: y - 1 }])
    if (`${x + 1}` in board && board[`${x + 1}`][y + 1] === '')
      setActive((prev) => [...prev, { x: x + 1, y: y + 1 }])
    if (`${x - 1}` in board && board[`${x - 1}`][y - 1] === '')
      setActive((prev) => [...prev, { x: x - 1, y: y - 1 }])
    if (`${x + 1}` in board && board[`${x + 1}`][y - 1] === '')
      setActive((prev) => [...prev, { x: x + 1, y: y - 1 }])
    if (`${x - 1}` in board && board[`${x - 1}`][y + 1] === '')
      setActive((prev) => [...prev, { x: x - 1, y: y + 1 }])
  }

  const onKingTapKill = (x: number, y: number) => {
    if (
      `${x + 1}` in board &&
      board[`${x + 1}`][y]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x + 1, y }])
    if (
      `${x - 1}` in board &&
      board[`${x - 1}`][y]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x - 1, y }])
    if (board[`${x}`][y + 1]?.split('')[0] === getOther(turn))
      setKillSuggestion((prev) => [...prev, { x, y: y + 1 }])
    if (board[`${x}`][y - 1]?.split('')[0] === getOther(turn))
      setKillSuggestion((prev) => [...prev, { x, y: y - 1 }])
    if (
      `${x + 1}` in board &&
      board[`${x + 1}`][y + 1]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x + 1, y: y + 1 }])
    if (
      `${x - 1}` in board &&
      board[`${x - 1}`][y - 1]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x - 1, y: y - 1 }])
    if (
      `${x + 1}` in board &&
      board[`${x + 1}`][y - 1]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x + 1, y: y - 1 }])
    if (
      `${x - 1}` in board &&
      board[`${x - 1}`][y + 1]?.split('')[0] === getOther(turn)
    )
      setKillSuggestion((prev) => [...prev, { x: x - 1, y: y + 1 }])
  }

  const onKingMove = (newBoard: Board, piece: string, x: number, y: number) => {
    if (!selectedPiece) return
    if (active.find((a) => a.x === x && a.y === y))
      TimerMessage(
        `Moved from ${getLocation(
          selectedPiece.x,
          selectedPiece.y,
        )} to ${getLocation(x, y)}`,
      )
    else TimerMessage(`Killed ${newBoard[`${x}`][y]}`)
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
    newBoard[`${x}`][y] = piece
  }

  const onQueenTap = (x: number, y: number) => {
    onRookTap(x, y)
    onBishopTap(x, y)
  }

  const onQueenMove = (
    newBoard: Board,
    piece: string,
    x: number,
    y: number,
  ) => {
    if (!selectedPiece) return
    if (active.find((a) => a.x === x && a.y === y))
      TimerMessage(
        `Moved from ${getLocation(
          selectedPiece.x,
          selectedPiece.y,
        )} to ${getLocation(x, y)}`,
      )
    else TimerMessage(`Killed ${newBoard[`${x}`][y]}`)
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
    newBoard[`${x}`][y] = piece
  }

  const onRookTap = (x: number, y: number) => {
    for (let i = x + 1; i <= 8; i++) {
      if (`${i}` in board && board[`${i}`][y] === '')
        setActive((prev) => [...prev, { x: i, y }])
      else if (
        `${i}` in board &&
        board[`${i}`][y].split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y }])
        break
      } else break
    }
    for (let i = x - 1; i >= 0; i--) {
      if (`${i}` in board && board[`${i}`][y] === '')
        setActive((prev) => [...prev, { x: i, y }])
      else if (
        `${i}` in board &&
        board[`${i}`][y].split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y }])
        break
      } else break
    }
    for (let i = y + 1; i < 8; i++) {
      console.log(`${x}${y}${i}`)
      if (board[`${x}`][i] === '') setActive((prev) => [...prev, { x, y: i }])
      else if (
        `${x}` in board &&
        board[`${x}`][i].split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x, y: i }])
        break
      } else break
    }
    for (let i = y - 1; i >= 0; i--) {
      if (board[`${x}`][i] === '') setActive((prev) => [...prev, { x, y: i }])
      else if (board[`${x}`][i].split('')[0] === getOther(turn)) {
        setKillSuggestion((prev) => [...prev, { x, y: i }])
        break
      } else break
    }
  }

  const onRookMove = (newBoard: Board, piece: string, x: number, y: number) => {
    if (!selectedPiece) return
    if (active.find((a) => a.x === x && a.y === y))
      TimerMessage(
        `Moved from ${getLocation(
          selectedPiece.x,
          selectedPiece.y,
        )} to ${getLocation(x, y)}`,
      )
    else TimerMessage(`Killed ${newBoard[`${x}`][y]}`)
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
    newBoard[`${x}`][y] = piece
  }

  const onBishopTap = (x: number, y: number) => {
    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      if (`${i}` in board && board[`${i}`][j] === '')
        setActive((prev) => [...prev, { x: i, y: j }])
      else if (
        `${i}` in board &&
        board[`${i}`][j]?.split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y: j }])
        break
      } else break
    }
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (`${i}` in board && board[`${i}`][j] === '')
        setActive((prev) => [...prev, { x: i, y: j }])
      else if (
        `${i}` in board &&
        board[`${i}`][j]?.split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y: j }])
        break
      } else break
    }
    for (let i = x + 1, j = y - 1; i <= 8 && j >= 0; i++, j--) {
      if (`${i}` in board && board[`${i}`][j] === '')
        setActive((prev) => [...prev, { x: i, y: j }])
      else if (
        `${i}` in board &&
        board[`${i}`][j]?.split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y: j }])
        break
      } else break
    }
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      if (`${i}` in board && board[`${i}`][j] === '')
        setActive((prev) => [...prev, { x: i, y: j }])
      else if (
        `${i}` in board &&
        board[`${i}`][j]?.split('')[0] === getOther(turn)
      ) {
        setKillSuggestion((prev) => [...prev, { x: i, y: j }])
        break
      } else break
    }
  }

  const onBishopMove = (
    newBoard: Board,
    piece: string,
    x: number,
    y: number,
  ) => {
    if (!selectedPiece) return
    if (active.find((a) => a.x === x && a.y === y))
      TimerMessage(
        `Moved from ${getLocation(
          selectedPiece.x,
          selectedPiece.y,
        )} to ${getLocation(x, y)}`,
      )
    else TimerMessage(`Killed ${newBoard[`${x}`][y]}`)
    newBoard[`${selectedPiece?.x}`][selectedPiece?.y] = ''
    newBoard[`${x}`][y] = piece
  }

  const checkActive = (x: number, y: number) => {
    if (active.find((a) => a.x === x && a.y === y)) return true
    return false
  }

  const checkKillSuggestion = (x: number, y: number) => {
    if (killSuggestion.find((a) => a.x === x && a.y === y)) return true
    return false
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <p>It's {turn} turn</p>
      <p>{message}</p>
      <div className="flex gap-10">
        <div>
          <p>white</p>
          <div
            className="flex border-2"
            style={{
              transform: 'rotate(-90deg)',
            }}
          >
            {Object.keys(board).map((row) => {
              return (
                <div key={`${row}`} className="flex flex-col">
                  {board[row].map((column: string, ci: number) => {
                    return (
                      <BoardPiece
                        key={`${row}${ci}`}
                        type={'w'}
                        piece={column}
                        y={ci}
                        x={parseInt(row)}
                        selectedPiece={selectedPiece || null}
                        setSelectedPieceFn={setSelectedPieceFn}
                        active={checkActive(parseInt(row), ci)}
                        killSuggestion={checkKillSuggestion(parseInt(row), ci)}
                        movePiece={movePiece}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <p>Black</p>
          <div
            className="flex border-2"
            style={{
              transform: 'rotate(90deg)',
            }}
          >
            {Object.keys(board).map((row) => {
              return (
                <div key={`${row}`} className="flex flex-col">
                  {board[row].map((column: string, ci: number) => {
                    return (
                      <BoardPiece
                        key={`${row}${ci}`}
                        type={'b'}
                        piece={column}
                        y={ci}
                        x={parseInt(row)}
                        selectedPiece={selectedPiece || null}
                        setSelectedPieceFn={setSelectedPieceFn}
                        active={checkActive(parseInt(row), ci)}
                        killSuggestion={checkKillSuggestion(parseInt(row), ci)}
                        movePiece={movePiece}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
