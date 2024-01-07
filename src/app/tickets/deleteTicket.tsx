import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const router = useRouter()

  const handleDelete = async (ticketId: number) => {
    
    setIsLoading(true)
    await axios.delete(`/api/tickets/${ticketId}`)
    setIsLoading(false)
    router.refresh()
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
        <Button className="justify-start text-popover-foreground self-start px-2 w-full hover:no-underline hover:bg-background/50" variant="link">Deletar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar bilhete {ticket.ticketId}?</DialogTitle>
        </DialogHeader>
        <div className="modal-action">
          <DialogClose asChild>
            <Button variant='outline' type="button">
              Não
            </Button>
          </DialogClose>  
            {!isLoading ? (
              <Button
                type="submit"
                onClick={() => handleDelete(ticket.ticketId)}
              >
                Sim
              </Button>
            ) : (
              <Button type="button" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deletando...
              </Button>
            )}
          </div>
      </DialogContent>
    </Dialog>
  )
}
