'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { Teams } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const AddTeams = ({ teams }: { teams: Teams[] }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    await axios.post('/api/teams', {
      team_name: formData.name,
      team_country: formData.country,
    })
    setIsLoading(false)
    setFormData({
      name: '',
      country: '',
    })
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Button className="font-bold" size="sm" onClick={handleModal}>
        <PlusCircle />
      </Button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo time</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="nome-do-time">
                Nome do time
              </label>
              <input
                type="text"
                name="name"
                id="nome-do-time"
                value={formData.name}
                className="input input-bordered"
                placeholder="Nome do Time"
                aria-label="Nome do Time"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="country">
                País do time
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                className="input input-bordered"
                placeholder="ex: BRAZIL"
                aria-label="País"
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

export default AddTeams
