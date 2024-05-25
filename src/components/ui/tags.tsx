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
import { cn } from "@/lib/utils";

let frameworks = [
  { value: "bricolage", label: "bricolage" },
  { value: "hobbistica", label: "hobbistica" },
  { value: "dadday", label: "festa del papà" },
  { value: "mumday", label: "festa della mamma" },
  { value: "girlbirthday", label: "compleanno ragazza" },
];

export interface Tag {
  value: string;
  label: string;
}

interface TagsProps {
  currentTags: Tag[];
  onTagsChange: (value: Tag[]) => void;
  frameworks: Tag[];
}

const Tags = React.forwardRef<HTMLDivElement, TagsProps>(
  ({ currentTags, onTagsChange, frameworks }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div ref={ref} className="flex flex-col space-y-2">
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
                        if (selectedFramework) {
                          onTagsChange([...currentTags, selectedFramework]);
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
          {currentTags &&
            currentTags.map((tag) => (
              <Badge
                key={tag!.value}
                className="w-min truncate"
                onClick={() => {
                  const newTags = currentTags.filter(
                    (selectedTag) => selectedTag!.value !== tag!.value
                  );
                  onTagsChange(newTags);
                }}
              >
                {tag!.label}
              </Badge>
            ))}
        </div>
      </div>
    );
  }
);

Tags.displayName = "Tags";

export { Tags };
