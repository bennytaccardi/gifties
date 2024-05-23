"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CommandList } from "cmdk";

let frameworks = [
  { value: "bricolage", label: "bricolage" },
  { value: "hobbistica", label: "hobbistica" },
  { value: "dadday", label: "festa del papà" },
  { value: "mumday", label: "festa della mamma" },
  { value: "girlbirthday", label: "compleanno ragazza" },
];

interface Tag {
  label: string;
  value: string;
}

interface TagsProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function Tags({ selectedTags, onTagsChange }: TagsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {"Select tag..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search tag..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      const selectedFramework = frameworks.find(
                        (elem) => elem.value === currentValue
                      );
                      if (
                        selectedFramework &&
                        !selectedTags.includes(selectedFramework)
                      ) {
                        onTagsChange([...selectedTags, selectedFramework]);
                        frameworks = frameworks.filter(
                          (framework) => framework.value !== currentValue
                        );
                      }
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="space-x-2 space-y-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.value}
            className="w-min truncate"
            onClick={() => {
              const newTags = selectedTags.filter(
                (selectedTag) => selectedTag.value !== tag.value
              );
              onTagsChange(newTags);
            }}
          >
            {tag.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
