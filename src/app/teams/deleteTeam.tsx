import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Team = {
  team_id: number
  team_name: string
  team_country: string
  team_initials: string | null
  createdAt: Date
}

const DeleteTeam = ({ team }: { team: Team }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (teamId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/teams/${teamId}`)
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
            tem certeza que quer deleta {team.team_name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Não
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(team.team_id)}
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

export default DeleteTeam
