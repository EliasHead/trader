'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Pencil } from '@phosphor-icons/react'

type Team = {
  team_id: number
  team_name: string
  team_country: string
  team_initials: string | null
  createdAt: Date
}

const UpdateTeams = ({ team }: { team: Team }) => {
  const [formData, setFormData] = useState({
    name: team.team_name,
    country: team.team_country,
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        <Pencil size={24} />
      </button>
      <div className={isOpen ? `modal modal-open` : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Atualizar{team.team_name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team_name">
                Nome do time
              </label>
              <input
                type="text"
                name="name"
                id="team_name"
                value={formData.name}
                className="input input-bordered"
                placeholder="Nome do time"
                aria-label="Nome do time"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team_country">
                País do time
              </label>
              <input
                type="text"
                name="country"
                id="team_country"
                value={formData.country}
                className="input input-bordered"
                placeholder="ex: BRAZIL"
                aria-label="País"
                onChange={handleChange}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateTeams
