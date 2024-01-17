import { MovePiece } from '../Functions/Move'
import onTap from '../Functions/Tap'
import BoardPiece from '../components/BoardPiece'
import useGameContext from '../context/GameContext'

const Home = () => {
  const {
    turn,
    setTurn,
    message,
    moves,
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

  //Move piece

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
                        killSuggestion={checkKillSuggestion(parseInt(row), ci)}
                        movePiece={() => {
                          MovePiece(
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
        <div>
          {moves.map((move, i) => {
            return <p key={i}>{move}</p>
          })}
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
      </div>
    </div>
  )
}

export default Home
