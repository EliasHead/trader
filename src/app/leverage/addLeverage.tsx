'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export const AddLeverage = () => {
  const [formData, setFormData] = useState({
    goal: '',
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    await axios.post('/api/leverages', {
      goal: formData.goal,
    })
    setIsLoading(false)
    setFormData({
      goal: '',
    })
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex items-center">
      <button
        className="btn m-auto whitespace-nowrap rounded-lg border-none bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleModal}
      >
        Adicionar Alavancagem
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adicionar novo Alavacagem</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="goal">
                Objetivo
              </label>
              <input
                type="text"
                name="goal"
                id="goal"
                value={formData.goal}
                className="input input-bordered"
                placeholder="meta ex: 01 stake de 10"
                aria-label="meta"
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
