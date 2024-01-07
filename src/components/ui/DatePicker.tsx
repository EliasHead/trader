'use client'

import * as React from 'react'
import { format, subDays } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ListTickets } from '@/app/tickets/listTickets'
import { FilterTickets } from '../filters/filterTickets'
import { Leverage, Matches, Results, Tickets } from '@prisma/client'

type TicketsType = {
  ticketId: number;
  createdAt: Date;
  updatedAt: Date;
  odd?: number | null;
  stake?: number | null;
  resultStake: number;
  leverage?: Leverage | null;
  leverageId?: number | null;
  Matches: Matches[];
  result?: Results | null;
  // result_id?: number | null;
};

interface DatePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>
  tickets: TicketsType[]
  leverages: Leverage[]
  results: Results[]
}

export function DatePicker({ className, tickets, results, leverages }: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(Date.now()), 7) /* undefined */,
    to: new Date(Date.now()) /* undefined */,
  })

  const from = date?.from
  const to = date?.to

  return (
    <div>
      <div className={cn('ml-4 grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <FilterTickets tickets={tickets} from={from} to={to} />
      {/* <ListTickets
        tickets={tickets}
        leverages={leverages}
        results={results}
        from={from}
        to={to}
      /> */}
    </div>
  )
}
