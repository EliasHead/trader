import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type TicketType = {
  ticketId: number
  result?: string | null
}

export const DeleteTicket = ({ ticket }: { ticket: TicketType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDelete = async (ticketId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/tickets/${ticketId}`)
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
            deletar o bilhete {ticket.ticketId}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Não
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(ticket.ticketId)}
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
