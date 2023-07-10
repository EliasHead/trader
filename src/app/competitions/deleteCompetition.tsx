import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Competition = {
  competition_id: number
  competition_name: string
  season_name: string
  createdAt: Date | null
}

const DeleteCompetition = ({ competition }: { competition: Competition }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (competitionId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/competitions/${competitionId}`)
    setIsLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button className="btn-error btn-sm btn" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? 'modal-open modal' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            tem certeza que quer deleta {competition.competition_name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Não
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(competition.competition_id)}
                className="btn-primary btn"
              >
                Sim
              </button>
            ) : (
              <button type="button" className="loading btn">
                Deletando...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteCompetition
