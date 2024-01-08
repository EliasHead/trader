'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Competition, Leverage, Results, Teams } from "@prisma/client"
import { PowerRankingType } from "@/app/fairlines/types"
import { DATA_POSITION } from "./add-power-ranking"

type EditPowerRankingProps = {
  powerRinking: PowerRankingType
}

export function EditPowerRanking({powerRinking}: EditPowerRankingProps) {
  const [formData, setFormData] = useState({
    position: powerRinking.position,
    team: powerRinking.team.team_id,
    competition: powerRinking.competition?.competition_id,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [teams, setTeams] = useState<Teams[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data)
        // setLoading(false)
      })
      fetch('/api/competitions')
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data)
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
    await axios.patch(`/api/power-rankings/${powerRinking.powerRankingId}`, {
      position: formData.position,
      teamId: formData.team,
      competitionId: formData.competition,
    })
    setIsLoading(false)
    setOpen(!open)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="justify-start text-popover-foreground self-start px-2 w-full hover:no-underline hover:bg-background/50" variant="link">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar bilhete {powerRinking.powerRankingId}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="position">
                Posição
              </label>
              <select
                name="position"
                id="position"
                value={formData.position}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha à posição</option>
                {DATA_POSITION.map((position) => {
                  return (
                    <option key={position.positionId} value={position.positionId}>
                      {position.positionName}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team">
                Time
              </label>
              <select
                name="leverage"
                id="leverage"
                value={formData.team}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha a alavancagem</option>
                {teams.map((team) => {
                  return (
                    <option
                      key={team.team_id}
                      value={team.team_id}
                    >
                      {team.team_name}
                    </option>
                  )
                })}
              </select>
            </div>
            
            <div className="form-control w-full">
              <label className="label font-bold" htmlFor="team">
                Campeonato
              </label>
              <select
                name="leverage"
                id="leverage"
                value={formData.competition}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option>Escolha o time</option>
                {competitions.map((competition) => {
                  return (
                    <option
                      key={competition.competition_id}
                      value={competition.competition_id}
                    >
                      {competition.competition_name}
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
                  <Button type="submit">
                    Save
                  </Button>
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
            
            <DialogFooter className="sm:justify-start">
            
          </DialogFooter>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
