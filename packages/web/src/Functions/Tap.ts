import { ActivePiece, Board, PlayerColor } from '../types/type'

const onTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  const piece = board[`${x}`][y]
  if (piece.split('')[1] === 'p') {
    onPawnTap(turn, board, setActive, x, y)
    onPawnTapKill(turn, board, setKillSuggestion, x, y)
  } else if (piece.split('')[1] === 'r') {
    onRookTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  } else if (piece.split('')[1] === 'b') {
    onBishopTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  } else if (piece.split('')[1] === 'h') {
    onKnightTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  } else if (piece.split('')[1] === 'q') {
    onQueenTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  } else if (piece.split('')[1] === 'k') {
    onKingTap(board, setActive, x, y)
    onKingTapKill(turn, board, setKillSuggestion, getOther, x, y)
  }
}

export default onTap

export const onPawnTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  x: number,
  y: number,
) => {
  if (turn === 'w') {
    if (x == 2) {
      if (board[`${x + 1}`][y]) return
      setActive({ x: x + 1, y })
      if (board[`${x + 2}`][y]) return
      setActive({ x: x + 2, y })
    } else {
      if (board[`${x + 1}`][y]) return
      setActive({ x: x + 1, y })
    }
  } else {
    if (x == 7) {
      if (board[`${x - 1}`][y]) return
      setActive({ x: x - 1, y })
      if (board[`${x - 2}`][y]) return
      setActive({ x: x - 2, y })
    } else {
      if (board[`${x - 1}`][y]) return
      setActive({ x: x - 1, y })
    }
  }
}

export const onPawnTapKill = (
  turn: PlayerColor,
  board: Board,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  x: number,
  y: number,
) => {
  if (turn === 'w') {
    if (board[`${x + 1}`][y + 1]?.split('')[0] === 'b')
      setKillSuggestion({ x: x + 1, y: y + 1 })
    if (board[`${x + 1}`][y - 1]?.split('')[0] === 'b')
      setKillSuggestion({ x: x + 1, y: y - 1 })
  } else {
    if (board[`${x - 1}`][y + 1]?.split('')[0] === 'w')
      setKillSuggestion({ x: x - 1, y: y + 1 })
    if (board[`${x - 1}`][y - 1]?.split('')[0] === 'w')
      setKillSuggestion({ x: x - 1, y: y - 1 })
  }
}

export const onKingTap = (
  board: Board,
  setActive: (active: ActivePiece) => void,
  x: number,
  y: number,
) => {
  if (`${x + 1}` in board && board[`${x + 1}`][y] === '')
    setActive({ x: x + 1, y })
  if (`${x - 1}` in board && board[`${x - 1}`][y] === '')
    setActive({ x: x - 1, y })
  if (board[`${x}`][y + 1] === '') setActive({ x, y: y + 1 })
  if (board[`${x}`][y - 1] === '') setActive({ x, y: y - 1 })
  if (`${x + 1}` in board && board[`${x + 1}`][y + 1] === '')
    setActive({ x: x + 1, y: y + 1 })
  if (`${x - 1}` in board && board[`${x - 1}`][y - 1] === '')
    setActive({ x: x - 1, y: y - 1 })
  if (`${x + 1}` in board && board[`${x + 1}`][y - 1] === '')
    setActive({ x: x + 1, y: y - 1 })
  if (`${x - 1}` in board && board[`${x - 1}`][y + 1] === '')
    setActive({ x: x - 1, y: y + 1 })
}

export const onKingTapKill = (
  turn: PlayerColor,
  board: Board,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  if (
    `${x + 1}` in board &&
    board[`${x + 1}`][y]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x + 1, y })
  if (
    `${x - 1}` in board &&
    board[`${x - 1}`][y]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x - 1, y })
  if (board[`${x}`][y + 1]?.split('')[0] === getOther(turn))
    setKillSuggestion({ x, y: y + 1 })
  if (board[`${x}`][y - 1]?.split('')[0] === getOther(turn))
    setKillSuggestion({ x, y: y - 1 })
  if (
    `${x + 1}` in board &&
    board[`${x + 1}`][y + 1]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x + 1, y: y + 1 })
  if (
    `${x - 1}` in board &&
    board[`${x - 1}`][y - 1]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x - 1, y: y - 1 })
  if (
    `${x + 1}` in board &&
    board[`${x + 1}`][y - 1]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x + 1, y: y - 1 })
  if (
    `${x - 1}` in board &&
    board[`${x - 1}`][y + 1]?.split('')[0] === getOther(turn)
  )
    setKillSuggestion({ x: x - 1, y: y + 1 })
}

export const onQueenTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  onRookTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  onBishopTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
}

export const onRookTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  for (let i = x + 1; i <= 8; i++) {
    if (`${i}` in board && board[`${i}`][y] === '') setActive({ x: i, y })
    else if (
      `${i}` in board &&
      board[`${i}`][y]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y })
      break
    } else break
  }
  for (let i = x - 1; i >= 0; i--) {
    if (`${i}` in board && board[`${i}`][y] === '') setActive({ x: i, y })
    else if (
      `${i}` in board &&
      board[`${i}`][y]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y })
      break
    } else break
  }
  for (let i = y + 1; i < 8; i++) {
    if (board[`${x}`][i] === '') setActive({ x, y: i })
    else if (
      `${x}` in board &&
      board[`${x}`][i]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x, y: i })
      break
    } else break
  }
  for (let i = y - 1; i >= 0; i--) {
    if (board[`${x}`][i] === '') setActive({ x, y: i })
    else if (board[`${x}`][i]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x, y: i })
      break
    } else break
  }
}

export const onBishopTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
    if (`${i}` in board && board[`${i}`][j] === '') setActive({ x: i, y: j })
    else if (
      `${i}` in board &&
      board[`${i}`][j]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y: j })
      break
    } else break
  }
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    if (`${i}` in board && board[`${i}`][j] === '') setActive({ x: i, y: j })
    else if (
      `${i}` in board &&
      board[`${i}`][j]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y: j })
      break
    } else break
  }
  for (let i = x + 1, j = y - 1; i <= 8 && j >= 0; i++, j--) {
    if (`${i}` in board && board[`${i}`][j] === '') setActive({ x: i, y: j })
    else if (
      `${i}` in board &&
      board[`${i}`][j]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y: j })
      break
    } else break
  }
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
    if (`${i}` in board && board[`${i}`][j] === '') setActive({ x: i, y: j })
    else if (
      `${i}` in board &&
      board[`${i}`][j]?.split('')[0] === getOther(turn)
    ) {
      setKillSuggestion({ x: i, y: j })
      break
    } else break
  }
}

export const onKnightTap = (
  turn: PlayerColor,
  board: Board,
  setActive: (active: ActivePiece) => void,
  setKillSuggestion: (killSuggestion: ActivePiece) => void,
  getOther: (color: PlayerColor) => PlayerColor,
  x: number,
  y: number,
) => {
  if (`${x + 2}` in board) {
    if (board[`${x + 2}`][y + 1] === '') {
      setActive({ x: x + 2, y: y + 1 })
    } else if (board[`${x + 2}`][y + 1]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x + 2, y: y + 1 })
    }
  }

  if (`${x + 2}` in board) {
    if (board[`${x + 2}`][y - 1] === '') {
      setActive({ x: x + 2, y: y - 1 })
    } else if (board[`${x + 2}`][y - 1]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x + 2, y: y - 1 })
    }
  }

  if (`${x - 2}` in board) {
    if (board[`${x - 2}`][y + 1] === '') {
      setActive({ x: x - 2, y: y + 1 })
    } else if (board[`${x - 2}`][y + 1]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x - 2, y: y + 1 })
    }
  }

  if (`${x - 2}` in board) {
    if (board[`${x - 2}`][y - 1] === '') {
      setActive({ x: x - 2, y: y - 1 })
    } else if (board[`${x - 2}`][y - 1]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x - 2, y: y - 1 })
    }
  }

  if (`${x + 1}` in board) {
    if (board[`${x + 1}`][y + 2] === '') {
      setActive({ x: x + 1, y: y + 2 })
    } else if (board[`${x + 1}`][y + 2]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x + 1, y: y + 2 })
    }
  }

  if (`${x + 1}` in board) {
    if (board[`${x + 1}`][y - 2] === '') {
      setActive({ x: x + 1, y: y - 2 })
    } else if (board[`${x + 1}`][y - 2]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x + 1, y: y - 2 })
    }
  }

  if (`${x - 1}` in board) {
    if (board[`${x - 1}`][y + 2] === '') {
      setActive({ x: x - 1, y: y + 2 })
    } else if (board[`${x - 1}`][y + 2]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x - 1, y: y + 2 })
    }
  }

  if (`${x - 1}` in board) {
    if (board[`${x - 1}`][y - 2] === '') {
      setActive({ x: x - 1, y: y - 2 })
    } else if (board[`${x - 1}`][y - 2]?.split('')[0] === getOther(turn)) {
      setKillSuggestion({ x: x - 1, y: y - 2 })
    }
  }
}
