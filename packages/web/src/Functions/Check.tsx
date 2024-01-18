import { Board, CheckPieces, PlayerColor } from '../types/type'

const Check = (
  type: PlayerColor | null,
  board: Board,
  // getOther: (color: PlayerColor) => PlayerColor,
) => {
  const checkPieces: CheckPieces = {
    p: [],
    r: [],
    h: [],
    b: [],
    q: [],
    k: [],
  }
  let check = false
  let checkMate = false
  const kingLocation: { x?: number; y?: number } = {}
  const kill: { x: number; y: number }[] = []

  const checkAndPush = (x: number, y: number) => {
    if (kill.find((k) => k.x === x && k.y === y)) {
      return
    } else {
      if (x < 1 || x > 8 || y < 0 || y > 7) return
      kill.push({ x, y })
    }
  }

  const pawnKill = (
    kingLocation: { x?: number; y?: number },
    x: number,
    y: number,
  ) => {
    if (type === 'b') {
      checkAndPush(x + 1, y + 1)
      if (kingLocation.x === x + 1 && kingLocation.y === y + 1) {
        return true
      }
      checkAndPush(x + 1, y - 1)
      if (kingLocation.x === x + 1 && kingLocation.y === y - 1) {
        return true
      }
    } else {
      checkAndPush(x - 1, y + 1)
      if (kingLocation.x === x - 1 && kingLocation.y === y + 1) {
        return true
      }
      checkAndPush(x - 1, y - 1)
      if (kingLocation.x === x - 1 && kingLocation.y === y - 1) {
        return true
      }
    }
    return false
  }

  const rookKill = (
    kingLocation: { x?: number; y?: number },
    x: number,
    y: number,
  ) => {
    for (let i = x + 1; i <= 8; i++) {
      if (board[`${i}`][y] !== '') {
        if (board[`${i}`][y][0] === type) {
          checkAndPush(i, y)
          if (kingLocation.x === i && kingLocation.y === y) {
            return true
          }
          break
        }
        break
      }
    }
    for (let i = x - 1; i >= 1; i--) {
      if (board[`${i}`][y] !== '') {
        if (board[`${i}`][y][0] === type) {
          checkAndPush(i, y)
          if (kingLocation.x === i && kingLocation.y === y) {
            return true
          }
          break
        }
        break
      }
    }
    for (let i = y + 1; i <= 7; i++) {
      if (board[`${x}`][i] !== '') {
        if (board[`${x}`][i][0] === type) {
          checkAndPush(x, i)
          if (kingLocation.x === x && kingLocation.y === i) {
            return true
          }
          break
        }
        break
      }
    }
    for (let i = y - 1; i >= 0; i--) {
      if (board[`${x}`][i] !== '') {
        if (board[`${x}`][i][0] === type) {
          checkAndPush(x, i)
          if (kingLocation.x === x && kingLocation.y === i) {
            return true
          }
        }
        break
      }
    }
    return false
  }

  const onBishopKill = (
    kingLocation: { x?: number; y?: number },
    x: number,
    y: number,
  ) => {
    let i = x + 1
    let j = y + 1
    while (i <= 8 && j <= 7) {
      if (board[`${i}`][j] !== '') {
        if (board[`${i}`][j][0] === type) {
          checkAndPush(i, j)
          if (kingLocation.x === i && kingLocation.y === j) {
            return true
          }
          break
        }
        break
      }
      i++
      j++
    }
    i = x - 1
    j = y - 1
    while (i >= 1 && j >= 0) {
      if (board[`${i}`][j] !== '') {
        if (board[`${i}`][j][0] === type) {
          checkAndPush(i, j)
          if (kingLocation.x === i && kingLocation.y === j) {
            return true
          }
          break
        }
        break
      }
      i--
      j--
    }
    i = x + 1
    j = y - 1
    while (i <= 8 && j >= 0) {
      if (board[`${i}`][j] !== '') {
        if (board[`${i}`][j][0] === type) {
          checkAndPush(i, j)
          if (kingLocation.x === i && kingLocation.y === j) {
            return true
          }
          break
        }
        break
      }
      i++
      j--
    }
    i = x - 1
    j = y + 1
    while (i >= 1 && j <= 7) {
      if (board[`${i}`][j] !== '') {
        if (board[`${i}`][j][0] === type) {
          checkAndPush(i, j)
          if (kingLocation.x === i && kingLocation.y === j) {
            return true
          }
          break
        }
        break
      }
      i--
      j++
    }
    return false
  }

  const knightKill = (
    kingLocation: { x?: number; y?: number },
    x: number,
    y: number,
  ) => {
    checkAndPush(x + 2, y + 1)
    if (kingLocation.x === x + 2 && kingLocation.y === y + 1) {
      return true
    }
    checkAndPush(x + 2, y - 1)
    if (kingLocation.x === x + 2 && kingLocation.y === y - 1) {
      return true
    }
    checkAndPush(x - 2, y + 1)
    if (kingLocation.x === x - 2 && kingLocation.y === y + 1) {
      return true
    }
    checkAndPush(x - 2, y - 1)
    if (kingLocation.x === x - 2 && kingLocation.y === y - 1) {
      return true
    }
    checkAndPush(x + 1, y + 2)
    if (kingLocation.x === x + 1 && kingLocation.y === y + 2) {
      return true
    }
    checkAndPush(x + 1, y - 2)
    if (kingLocation.x === x + 1 && kingLocation.y === y - 2) {
      return true
    }
    checkAndPush(x - 1, y + 2)
    if (kingLocation.x === x - 1 && kingLocation.y === y + 2) {
      return true
    }
    checkAndPush(x - 1, y - 2)
    if (kingLocation.x === x - 1 && kingLocation.y === y - 2) {
      return true
    }
    return false
  }

  const kingKill = (
    kingLocation: { x?: number; y?: number },
    x: number,
    y: number,
  ) => {
    checkAndPush(x + 1, y + 1)
    if (kingLocation.x === x + 1 && kingLocation.y === y + 1) {
      return true
    }
    checkAndPush(x + 1, y - 1)
    if (kingLocation.x === x + 1 && kingLocation.y === y - 1) {
      return true
    }
    checkAndPush(x - 1, y + 1)
    if (kingLocation.x === x - 1 && kingLocation.y === y + 1) {
      return true
    }
    checkAndPush(x - 1, y - 1)
    if (kingLocation.x === x - 1 && kingLocation.y === y - 1) {
      return true
    }
    checkAndPush(x + 1, y)
    if (kingLocation.x === x + 1 && kingLocation.y === y) {
      return true
    }
    checkAndPush(x - 1, y)
    if (kingLocation.x === x - 1 && kingLocation.y === y) {
      return true
    }
    checkAndPush(x, y + 1)
    if (kingLocation.x === x && kingLocation.y === y + 1) {
      return true
    }
    checkAndPush(x, y - 1)
    if (kingLocation.x === x && kingLocation.y === y - 1) {
      return true
    }
    return false
  }

  Object.keys(board).forEach((row: string) => {
    board[row].forEach((piece: string, j) => {
      if (piece && piece[0] !== type) {
        checkPieces[piece[1]].push(piece + row + j.toString())
      }
      if (piece && piece[0] === type) {
        if (piece[1] === 'k') {
          kingLocation.x = parseInt(row)
          kingLocation.y = j
        }
      }
    })
  })

  checkPieces.p.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (pawnKill(kingLocation, x, y)) check = true
  })

  checkPieces.r.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (rookKill(kingLocation, x, y)) check = true
  })

  checkPieces.b.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (onBishopKill(kingLocation, x, y)) check = true
  })

  checkPieces.q.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (rookKill(kingLocation, x, y) || onBishopKill(kingLocation, x, y))
      check = true
  })

  checkPieces.h.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (knightKill(kingLocation, x, y)) check = true
  })

  checkPieces.k.forEach((piece) => {
    if (check) return
    const x = parseInt(piece[3])
    const y = parseInt(piece[4])

    if (kingKill(kingLocation, x, y)) check = true
  })

  const kingMoves = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ]
  let kingCheckCount = 0
  const tempKingx = kingLocation.x
  const tempKingy = kingLocation.y

  kingMoves.forEach((move) => {
    if (check) return
    const x = tempKingx! + move.x
    const y = tempKingy! + move.y
    if (x < 1 || x > 8 || y < 0 || y > 7) return
    if (board[`${x}`][y] !== '') {
      if (board[`${x}`][y][0] === type) {
        return
      }
    }

    const kingLocation = { x, y }
    let tempCheck = false
    checkPieces.p.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (pawnKill(kingLocation, x, y)) tempCheck = true
    })

    checkPieces.r.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (rookKill(kingLocation, x, y)) tempCheck = true
    })

    checkPieces.b.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (onBishopKill(kingLocation, x, y)) tempCheck = true
    })

    checkPieces.q.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (rookKill(kingLocation, x, y) || onBishopKill(kingLocation, x, y))
        tempCheck = true
    })

    checkPieces.h.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (knightKill(kingLocation, x, y)) tempCheck = true
    })

    checkPieces.k.forEach((piece) => {
      const x = parseInt(piece[3])
      const y = parseInt(piece[4])

      if (kingKill(kingLocation, x, y)) tempCheck = true
    })

    if (tempCheck) kingCheckCount++
  })

  if (kingCheckCount === 8) checkMate = true

  console.log(check, checkMate)

  return {
    check,
    checkMate,
  }
}

export default Check
