import { useContext, useEffect } from 'react'
import { MovePiece } from '../Functions/Move'
import onTap from '../Functions/Tap'
import BoardPiece from '../components/BoardPiece'
import useGameContext from '../context/GameContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { UserAuthContext } from '../context/AuthContext'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../config/firebase'

const Game = () => {
  const location = useLocation()
  const { user } = useContext(UserAuthContext)
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
  } = useGameContext()

  useEffect(() => {
    const onLoad = async () => {
      try {
        const token = await user?.getIdToken()
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/${
            location.pathname.split('/')[2]
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        console.log(res)
        setGameData(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    onLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user])

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, 'games'))

      try {
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            if (doc.id === gameData?._id) {
              console.log(doc.data())
              setBoard(doc.data().board)
              setTurn(doc.data().turn === 'white' ? 'w' : 'b')
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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <p>It's {turn} turn</p>
      <p>{message}</p>
      <div className="flex gap-10">
        {type === 'w' ? (
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
                          turn={turn}
                          piece={column}
                          y={ci}
                          x={parseInt(row)}
                          selectedPiece={selectedPiece || null}
                          setSelectedPieceFn={setSelectedPieceFn}
                          active={checkActive(parseInt(row), ci)}
                          killSuggestion={checkKillSuggestion(
                            parseInt(row),
                            ci,
                          )}
                          movePiece={() => {
                            MovePiece(
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
          </div>
        ) : (
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
                          turn={turn}
                          piece={column}
                          y={ci}
                          x={parseInt(row)}
                          selectedPiece={selectedPiece || null}
                          setSelectedPieceFn={setSelectedPieceFn}
                          active={checkActive(parseInt(row), ci)}
                          killSuggestion={checkKillSuggestion(
                            parseInt(row),
                            ci,
                          )}
                          movePiece={() => {
                            MovePiece(
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
          </div>
        )}
      </div>
    </div>
  )
}

export default Game
