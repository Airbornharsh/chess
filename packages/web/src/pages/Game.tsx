import { useContext, useEffect, useState } from 'react'
import { MovePiece } from '../Functions/Move'
import onTap from '../Functions/Tap'
import BoardPiece from '../components/BoardPiece'
import useGameContext from '../context/GameContext'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { UserAuthContext } from '../context/AuthContext'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../config/firebase'
import Check from '../Functions/Check'

const Game = () => {
  const location = useLocation()
  const Navigate = useNavigate()
  const { user, userData } = useContext(UserAuthContext)
  const {
    gameData,
    setGameData,
    moveUpdate,
    type,
    turn,
    setTurn,
    message,
    board,
    setBoard,
    selectedPiece,
    setSelectedPiece,
    active,
    setActive,
    killSuggestion,
    setKillSuggestion,
    getOther,
    getLocation,
    empty,
    timerMessage,
    reset,
    isFull,
    setIsFull,
    setCheck,
    setCheckMate,
  } = useGameContext()
  const [opponent, setOpponent] = useState<string>('')

  useEffect(() => {
    const onLoad = async () => {
      try {
        const token = await user?.getIdToken()
        const res = await axios.post(
          `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/join`,
          {
            inviteCode: location.search.split('?')[1].split('=')[1],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setGameData(res.data)
      } catch (e) {
        Navigate('/')
        console.log(e)
      }
    }

    onLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, user])

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, 'games'))

      try {
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            if (doc.id === gameData?._id) {
              const data = doc.data()
              setBoard(data.board)
              setTurn(data.turn === 'white' ? 'w' : 'b')
              if (data.whitePlayer === userData?._id) {
                setOpponent(data.blackPlayerName)
              } else {
                setOpponent(data.whitePlayerName)
              }
              if (data.whitePlayer !== '' && data.blackPlayer !== '')
                setIsFull(true)
              const res = Check(type, board)
              if (res.check && !res.checkMate) {
                timerMessage('Check', false)
                setCheck(true)
              } else {
                timerMessage('', true)
                setCheck(false)
              }
              if (res.checkMate) {
                timerMessage('CheckMate', false)
                setCheckMate(true)
              } else {
                timerMessage('', true)
                setCheckMate(false)
              }
            }
          })
        })

        return () => unsubscribe()
      } catch (e) {
        console.log(e)
      }
    }

    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData?._id])

  const setSelectedPieceFn = (x: number, y: number) => {
    empty()
    if (turn !== board[`${x}`][y]?.split('')[0]) {
      timerMessage('Not your turn')
      return
    }
    setSelectedPiece({ x, y })
    onTap(turn, board, setActive, setKillSuggestion, getOther, x, y)
  }

  const checkActive = (x: number, y: number) => {
    if (active.find((a) => a.x === x && a.y === y)) return true
    return false
  }

  const checkKillSuggestion = (x: number, y: number) => {
    if (killSuggestion.find((a) => a.x === x && a.y === y)) return true
    return false
  }

  const cancelGame = async () => {
    try {
      const token = await user?.getIdToken()
      await axios.post(
        `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/cancel`,
        {
          inviteCode: gameData?.inviteCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      reset()
      Navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <p>{turn === 'w' ? 'White' : 'Black'} turn</p>
      <p>{message}</p>
      {!isFull && (
        <div className="flex items-center justify-center gap-3">
          <p>Invite Code:{gameData?.inviteCode}</p>
          <Link
            className="bg-gray-600 px-3 py-2"
            to={`whatsapp://send?text=${encodeURIComponent(
              `https://chess.harshkeshri.com/game?invitecode=${gameData?.inviteCode}`,
            )}`}
          >
            Send
          </Link>
        </div>
      )}
      <div className="flex flex-col items-center gap-2">
        {/* <p>{type === 'w' ? 'White' : 'Black'}</p> */}
        <p>{opponent}</p>
        <div
          className="flex border-2"
          style={{
            transform: type === 'w' ? 'rotate(-90deg)' : 'rotate(90deg)',
          }}
        >
          {Object.keys(board).map((row) => {
            return (
              <div key={`${row}`} className="flex flex-col">
                {board[row].map((column: string, ci: number) => {
                  return (
                    <BoardPiece
                      key={`${row}${ci}`}
                      type={type!}
                      turn={turn}
                      piece={column}
                      y={ci}
                      x={parseInt(row)}
                      selectedPiece={selectedPiece || null}
                      setSelectedPieceFn={setSelectedPieceFn}
                      active={checkActive(parseInt(row), ci)}
                      killSuggestion={checkKillSuggestion(parseInt(row), ci)}
                      movePiece={() => {
                        MovePiece(
                          type!,
                          moveUpdate,
                          turn,
                          setTurn,
                          board,
                          setBoard,
                          selectedPiece,
                          active,
                          killSuggestion,
                          empty,
                          getLocation,
                          timerMessage,
                          parseInt(row),
                          ci,
                        )
                      }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
        <p>ME</p>
        <button
          className="mt-6 w-20 bg-gray-600 px-3 py-2"
          onClick={cancelGame}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Game
