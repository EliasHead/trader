'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { Competition } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
// import MyComponent from '@/components/multiSelect'
import Select, { MultiValue } from 'react-select'
// import Competitions from './page'

const AddCompetitions = ({ competitions }: { competitions: Competition[] }) => {
  const [formData, setFormData] = useState({
    name: '',
    season: '',
    teste: '',
  })

  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleChange2 = async (
    event: MultiValue<{ label: string; value: number }>,
  ) => {
    // const { name, value } = event.target
    const label = event.map((e) => e.label)
    const value = label.toString()
    setFormData((prevState) => ({ ...prevState, teste: value }))
    // setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    // await axios.post('/api/competitions', {
    //   competition_name: formData.name,
    //   season_name: formData.season,
    // })
    console.log(formData.teste)
    setIsLoading(false)
    setFormData({
      name: '',
      season: '',
      teste: '',
    })
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button className="btn bg-blue-500 text-white" onClick={handleModal}>
        Adicionar novo campeonato
      </button>
      <div className={isOpen ? 'modal-open modal' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo Campeonato</h3>
          <form onSubmit={handleSubmit}>
            {/* <MyComponent /> */}
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="nome-do-campeonato">
                multi
              </label>
              <Select onChange={handleChange2} isMulti options={options} />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="nome-do-campeonato">
                Nome do Campeonato
              </label>
              <input
                type="text"
                name="name"
                id="nome-do-campeonato"
                value={formData.name}
                className="input-bordered input"
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
                className="input-bordered input"
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
                <button type="submit" className="btn-primary btn">
                  Save
                </button>
              ) : (
                <button type="button" className="loading btn">
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

export default AddCompetitions
