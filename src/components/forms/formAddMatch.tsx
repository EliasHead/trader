import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import type { Competition, Teams } from '@prisma/client'
import { toast } from "../ui/use-toast";
import { strategies } from '@/utils/estrategies'


type roundsType = {
  round_id: number;
  round_name: string;
};
  
type MatchesProps = {
  competitions: Competition[];
  teams: Teams[];
  rounds: roundsType[];
};

const reviews = [
  { label: "race", value: 1 },
  { label: "home", value: 2 },
  { label: "way", value: 3 },
  { label: "derby", value: 4 },
  { label: "must-win", value: 5 },
  { label: "bet", value: 6 },
  { label: "-FL+", value: 7 },
  { label: "live", value: 8 },
  { label: "cycles", value: 9 },
  { label: "oscillation", value: 10 },
  { label: "+goal", value: 11 },
  { label: "-goal", value: 12 },
] as const;

const FormSchema = z.object({
  home_team: z.number({
    required_error: "Please select a home team.",
  }),
  away_team: z.number({
    required_error: "Please select a away team.",
  }),
  competition: z.number({
    required_error: "Please select a competition.",
  }),
  round: z.number({
    required_error: "Please select a round.",
  }),
  strategy: z.number({
    required_error: "Please select a round.",
  }),
  reviews: z.number({
    required_error: "Please select a reviews.",
  }),
  odd: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}


export const FormAddMatch = ({ teams, competitions, rounds }: MatchesProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="home_team"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Casa</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? teams.find((team) => team.team_id === field.value)
                            ?.team_name
                        : "Select the team"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No team found.</CommandEmpty>
                    <CommandGroup>
                      {teams.map((team) => (
                        <CommandItem
                          value={team.team_name}
                          key={team.team_id}
                          onSelect={() => {
                            form.setValue("home_team", team.team_id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              team.team_id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {team.team_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="away_team"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fora</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? teams.find((team) => team.team_id === field.value)
                            ?.team_name
                        : "Select the team"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No team found.</CommandEmpty>
                    <CommandGroup>
                      {teams.map((team) => (
                        <CommandItem
                          value={team.team_name}
                          key={team.team_id}
                          onSelect={() => {
                            form.setValue("away_team", team.team_id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              team.team_id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {team.team_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="competition"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Competição</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? competitions.find(
                            (competition) =>
                              competition.competition_id === field.value
                          )?.competition_name
                        : "Select the team"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Competição..." />
                    <CommandEmpty>No competition found.</CommandEmpty>
                    <CommandGroup>
                      {competitions.map((competition) => (
                        <CommandItem
                          value={competition.competition_name}
                          key={competition.competition_id}
                          onSelect={() => {
                            form.setValue(
                              "competition",
                              competition.competition_id
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              competition.competition_id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {competition.competition_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="round"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Rodada</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? rounds.find((round) => round.round_id === field.value)
                            ?.round_name
                        : "Select the round"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Competição..." />
                    <CommandEmpty>No competition found.</CommandEmpty>
                    <CommandGroup>
                      {rounds.map((round) => (
                        <CommandItem
                          value={round.round_name}
                          key={round.round_id}
                          onSelect={() => {
                            form.setValue("round", round.round_id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              round.round_id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {round.round_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strategy"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Estrategia</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? strategies.find(
                            (strategy) => strategy.value === field.value
                          )?.label
                        : "Select a strategy"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search strategy..." />
                    <CommandEmpty>No strategy found.</CommandEmpty>
                    <CommandGroup>
                      {strategies.map((strategy) => (
                        <CommandItem
                          value={strategy.label}
                          key={strategy.value}
                          onSelect={() => {
                            form.setValue("strategy", strategy.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              strategy.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {strategy.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviews"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Revisão</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? reviews.find((review) => review.value === field.value)
                            ?.label
                        : "Select a review"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No review found.</CommandEmpty>
                    <CommandGroup>
                      {reviews.map((review) => (
                        <CommandItem
                          value={review.label}
                          key={review.value}
                          onSelect={() => {
                            form.setValue("reviews", review.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              review.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {review.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="odd"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Odd</FormLabel>
              <FormControl>
                <Input placeholder="ex 1.50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
