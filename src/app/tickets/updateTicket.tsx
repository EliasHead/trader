'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Pencil } from '@phosphor-icons/react'

type TicketType = {
  ticketId: number
  result: string | null
}

// TODO: melhorar json
const results = [
  { label: 'progress', value: 1 },
  { label: 'green', value: 2 },
  { label: 'red', value: 3 },
  { label: 'draw', value: 4 },
]

export const UpdateTicket = ({ ticket }: { ticket: TicketType }) => {
  const [formData, setFormData] = useState({
    result: ticket.result,
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

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    await axios.patch(`/api/tickets/${ticket.ticketId}`, {
      result: formData.result,
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
            Atualizar o ticket {ticket.ticketId}
          </h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="result">
                Selecione o resultado
              </label>
              <select
                name="result"
                id="result"
                value={formData.result!}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o time</option>
                {results.map((result) => {
                  return (
                    <option key={result.value} value={result.label}>
                      {result.label}
                    </option>
                  )
                })}
              </select>
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
