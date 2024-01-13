'use client'

import { Teams } from '@prisma/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// type Team = {
//   team_id: number
//   team_name: string
//   team_country: string
//   team_initials: string | null
//   createdAt: Date
// }

export const UpdateTeams = ({ team }: { team: Teams }) => {
  const [formData, setFormData] = useState({
    name: team.team_name,
    country: team.team_country,
  })

  console.log(team)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    await axios.patch(`/api/teams/${team.team_id}`, {
      team_name: formData.name,
      team_country: formData.country,
    })
    setIsLoading(false)
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          // onClick={handleModal}
          variant={'link'}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar o time {team.team_name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="name">
                Nome
              </label>
              <input
                name="name"
                id="name"
                value={formData.name}
                className="input input-bordered"
                placeholder="stake ex: 10"
                aria-label="stake"
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-control w-full">
              <label className="label font-bold" htmlFor="name">
                Nome do time
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                className="input input-bordered"
                placeholder="Nome do time"
                aria-label="Nome do time"
                onChange={handleChange}
              />
            </div> */}
            {/* <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team_country">
                País do time
              </label>
              <input
                type="text"
                name="team_country"
                id="team_country"
                value={formData.country}
                className="input input-bordered"
                placeholder="ex: BRAZIL"
                aria-label="País"
                onChange={handleChange}
              />
            </div> */}
            {/* <div className="modal-action">
              <button type="button" className="btn">
                Fechar
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Salva...
                </button>
              )}
            </div> */}
            <DialogFooter className="sm:justify-start"></DialogFooter>
          </form>
        </div>
      </DialogContent>
      {/* <div className={isOpen ? `modal modal-open` : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Atualizar{team.team_name}</h3>
        </div>
      </div> */}
    </Dialog>
  )
}
