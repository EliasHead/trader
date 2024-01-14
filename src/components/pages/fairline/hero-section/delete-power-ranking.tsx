import { PowerRankingType } from '@/app/fairlines/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const DeletePowerRanking = ({
  powerRanking,
}: {
  powerRanking: PowerRankingType
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const handleDelete = async (powerRankingId: number) => {
    setIsLoading(true)
    await axios.delete(`/api/power-rankings/${powerRankingId}`)
    setIsLoading(false)
    router.refresh()
    setOpen(!open)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          Deletar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Deletar power ranking {powerRanking.powerRankingId}?
          </DialogTitle>
        </DialogHeader>
        <div className="modal-action">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Não
            </Button>
          </DialogClose>
          {!isLoading ? (
            <Button
              type="submit"
              onClick={() => handleDelete(powerRanking.powerRankingId)}
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
