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
import { useFormContext } from "react-hook-form";
import { formSchema } from "@/app/dashboard/form-schema";
import { z } from "zod";

let lookupTags = [
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

export function Tags() {
  const [open, setOpen] = React.useState(false);
  const { getValues, setValue, watch } =
    useFormContext<z.infer<typeof formSchema>>();
  const currentTags = getValues("tags");
  const tags = watch("tags");

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
                {lookupTags.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      const selectedTag = lookupTags.find(
                        (elem) => elem.value === currentValue
                      );
                      if (selectedTag) {
                        setValue(
                          "tags",
                          currentTags
                            ? [...currentTags.split(","), selectedTag.value]
                                .map((tag) => tag)
                                .join(",")
                            : selectedTag.value
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
        {currentTags &&
          currentTags.split(",").map((tag) => (
            <Badge
              key={tag!}
              className="w-min truncate"
              onClick={() => {
                const newTags = currentTags
                  .split(",")
                  .filter((selectedTag) => selectedTag! !== tag!);
                setValue("tags", newTags.map((tag) => tag).join(","));
              }}
            >
              {
                lookupTags.filter((lookupTag) => lookupTag.value === tag)[0]
                  .label
              }
            </Badge>
          ))}
      </div>
      <input
        type="select"
        name="tags"
        style={{ display: "none" }}
        multiple
        value={tags?.split(",").map((item) => item)}
      />
    </div>
  );
}
