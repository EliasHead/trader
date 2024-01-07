import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash } from '@phosphor-icons/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type TicketType = {
  ticketId: number
  result?: {
    result_id: number
    result_name: String
  } | null
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
    <Dialog>
       <DialogTrigger asChild>
        <Button className="justify-start text-popover-foreground self-start px-2 w-full hover:no-underline hover:bg-background/50" variant="link">Deletar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar bilhete {ticket.ticketId}</DialogTitle>
        </DialogHeader>
      </DialogContent>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
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
    </Dialog>
  )
}
