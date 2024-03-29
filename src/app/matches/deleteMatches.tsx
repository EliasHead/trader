'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Trash } from '@phosphor-icons/react'
import { MatchesType } from './types'

const DeleteMatch = ({ match }: { match: MatchesType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (matchId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/matches/${matchId}`)
    setIsLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="px-3 py-2">
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        <Trash size={24} />
      </button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            tem certeza que quer deleta {match.match_id}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Não
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(match.match_id)}
                className="btn btn-primary"
              >
                Sim
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deletando...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteMatch
