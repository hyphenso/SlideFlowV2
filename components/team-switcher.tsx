"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const teams = [
  {
    id: "1",
    name: "Default Team",
    slug: "default",
  },
  {
    id: "2",
    name: "Marketing Team",
    slug: "marketing",
  },
];

export function TeamSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-full justify-between"
        >
          {selectedTeam.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup heading="Teams">
              {teams.map((team) => (
                <CommandItem
                  key={team.id}
                  onSelect={() => {
                    setSelectedTeam(team);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  {team.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTeam.id === team.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
