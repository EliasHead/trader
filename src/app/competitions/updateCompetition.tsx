/* eslint-disable react/jsx-no-comment-textnodes */
'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Pencil } from '@phosphor-icons/react'

type Competition = {
  competition_id: number
  competition_name: string
  season_name: string
  createdAt: Date | null
}

const UpdateCompetition = ({ competition }: { competition: Competition }) => {
  const [formData, setFormData] = useState({
    name: competition.competition_name,
    season: competition.season_name,
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
    await axios.patch(`/api/competitions/${competition.competition_id}`, {
      competition_name: formData.name,
      season_name: formData.season,
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
          <h3 className="text-lg font-bold">
            Atualizar{competition.competition_name}
          </h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="nome-do-campeonato">
                Nome do Campeonato
              </label>
              <input
                type="text"
                name="name"
                id="nome-do-campeonato"
                value={formData.name}
                className="input input-bordered"
                placeholder="Nome do Campeonato"
                aria-label="Nome do Campeonato"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="season">
                Temporada
              </label>
              <input
                type="text"
                name="season"
                id="season"
                value={formData.season}
                className="input input-bordered"
                placeholder="Temporada ex: 2023"
                aria-label="Temporada"
                onChange={handleChange}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCompetition
