'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Leverage, Results } from '@prisma/client'

export function EditTicket({ ticket }: any) {
  const [formData, setFormData] = useState({
    result: ticket.result?.result_id,
    odd: ticket.odd,
    stake: ticket.stake,
    resultStake: ticket.resultStake,
    leverage: ticket.leverageId,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Results[]>([])
  const [leverages, setLeverages] = useState<Leverage[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/api/results')
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        // setLoading(false)
      })

    fetch('/api/leverages')
      .then((res) => res.json())
      .then((data) => {
        setLeverages(data)
        // setLoading(false)
      })
  }, [])

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
        formData.result === 'green'
          ? (formData.odd! - 1).toFixed(2)
          : formData.result === 'red'
            ? -1
            : 0,
      leverageId: formData.leverage,
    })
    setIsLoading(false)
    setOpen(!open)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start self-start px-2 text-popover-foreground hover:bg-background/50 hover:no-underline"
          variant="link"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar bilhete {ticket.ticketId}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
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
              {/* <button type="button" className="btn" onClick={handleModal}>
                Close
              </button> */}
              {!isLoading ? (
                <div className="flex items-center gap-2">
                  <Button type="submit">Save</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>

            <DialogFooter className="sm:justify-start"></DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
