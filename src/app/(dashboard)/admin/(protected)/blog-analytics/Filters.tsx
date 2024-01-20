"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { DatesFilterType } from "@/types";
import useDateFilter from "../../_hooks/useDateFilter";

const datesPreset: Record<DatesFilterType, string> = {
  today: "Today",
  yesterday: "Yesterday",
  "last-seven-days": "Last 7 days",
  "last-thirty-days": "Last 30 days",
};

const dates: Array<{ value: DatesFilterType; label: string }> = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "yesterday",
    label: "Yesterday",
  },
  {
    value: "last-seven-days",
    label: "Last 7 days",
  },
  {
    value: "last-thirty-days",
    label: "Last 30 days",
  },
];

export default function Filters() {
  const { selectedDateFilter, setDateFilter } = useDateFilter();

  return (
    <div className="flex justify-end">
      <Select
        value={selectedDateFilter}
        onValueChange={(value: DatesFilterType) => setDateFilter(value)}
      >
        <SelectTrigger className="w-[150px]">
          {datesPreset[selectedDateFilter]}
        </SelectTrigger>
        <SelectContent>
          {dates.map(({ value, label }) => (
            <SelectItem key={value} value={value} on>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
