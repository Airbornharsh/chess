import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UserAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useGameContext from '../context/GameContext'

const Home = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false)
  const [inviteCode, setInviteCode] = useState('')
  const { user } = useContext(UserAuthContext)
  const { setGameData } = useGameContext()
  const Navigate = useNavigate()

  useEffect(() => {
    const onLoad = async () => {
      try {
        const token = await user?.getIdToken()

        const res = await axios.get(
          `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/exists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        console.log(res)
        setGameData(res.data)
        Navigate(`/game?invitecode=${res.data.inviteCode}`)
      } catch (e) {
        console.log(e)
      }
    }

    onLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const createGame = async () => {
    try {
      const token = await user?.getIdToken()
      console.log(token)
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(res)
      setGameData(res.data)
      Navigate(`/game?invitecode=${res.data.inviteCode}`)
    } catch (e) {
      console.log(e)
    }
  }

  const joinGame = async () => {
    try {
      if (inviteCode.length !== 6) return

      const token = await user?.getIdToken()

      const res = await axios.post(
        `${import.meta.env.VITE_APP_BAKCEND_API_URL}user/game/join`,
        {
          inviteCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(res)
      setGameData(res.data)
      Navigate(`/game?invitecode=${inviteCode}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex  h-screen w-screen items-center justify-center gap-4">
      {isJoining ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <input
            type="text"
            className="flex h-10 w-20 items-center justify-center px-2 text-black"
            value={inviteCode}
            onChange={(e) => {
              if (e.target.value) setInviteCode(e.target.value)
              else setInviteCode('')
            }}
          />
          <button className="w-20 bg-gray-600 px-3 py-2" onClick={joinGame}>
            Join
          </button>
        </div>
      ) : (
        <>
          <button className="w-20 bg-gray-600 px-3 py-2" onClick={createGame}>
            Create
          </button>
          <button
            className="w-20 bg-gray-600 px-3 py-2"
            onClick={() => setIsJoining(true)}
          >
            Join
          </button>
        </>
      )}
    </div>
  )
}

export default Home
