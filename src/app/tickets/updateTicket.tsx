'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Pencil } from '@phosphor-icons/react'
import { Leverage, Matches, Results } from '@prisma/client'

type TicketType = {
  ticketId: number
  createdAt: Date
  updatedAt: Date
  odd?: number | null
  stake?: number | null
  resultStake: number
  leverage?: Leverage | null
  leverageId?: number | null
  Matches: Matches[]
  result?: Results | null
  // result_id?: number | null;
}

type LeverageType = {
  leverageId: number
  goal: string | null
  result: string | null
  createdAt: Date
}

// type TicketType = {
//   ticketId: number
//   result_id: number | null
//   odd: number | null
//   stake: number | null
//   resultStake: number
//   leverageId: number | null
// }

type TicketsProps = {
  ticket: TicketType
  leverages: LeverageType[]
  results: Results[]
}

// TODO: melhorar json
// const results = [
//   { label: 'progress', value: 1 },
//   { label: 'green', value: 2 },
//   { label: 'red', value: 3 },
//   { label: 'draw', value: 4 },
// ]

export const UpdateTicket = ({ ticket, leverages, results }: TicketsProps) => {
  const [formData, setFormData] = useState({
    result: ticket.result?.result_id,
    odd: ticket.odd,
    stake: ticket.stake,
    resultStake: ticket.resultStake,
    leverage: ticket.leverageId,
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
      result_id: formData.result,
      odd: formData.odd,
      stake: formData.stake,
      resultStake:
        formData.result === 2
          ? (formData.odd! - 1).toFixed(2)
          : formData.result === 3
            ? -1
            : 0,
      leverageId: formData.leverage,
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
              <label className="label font-bold" htmlFor="stake">
                Stake
              </label>
              <input
                type="number"
                name="stake"
                id="stake"
                min="0"
                step=".01"
                value={formData.stake!}
                className="input input-bordered"
                placeholder="stake ex: 10"
                aria-label="stake"
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="odd">
                Odd
              </label>
              <input
                type="number"
                name="odd"
                id="odd"
                min="0"
                step=".01"
                value={formData.odd!}
                className="input input-bordered"
                placeholder="odd ex: 1.75"
                aria-label="odd?"
                onChange={handleChange}
              />
            </div>
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
                <option>Escolha o resultado</option>
                {results.map((result) => {
                  return (
                    <option key={result.result_id} value={result.result_id}>
                      {result.result_name}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="leverage">
                Selecione a alavancagem
              </label>
              <select
                name="leverage"
                id="leverage"
                value={formData.leverage!}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha a alavancagem</option>
                {leverages.map((leverage) => {
                  return (
                    <option
                      key={leverage.leverageId}
                      value={leverage.leverageId}
                    >
                      {leverage.leverageId}
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
