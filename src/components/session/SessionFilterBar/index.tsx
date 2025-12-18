'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateFilter from '@/components/ui/DateFilter';
import Dropdown from '@/components/ui/Dropdown';
import FilterButton from '@/components/ui/FilterButton';
import RegionFilter from '@/components/ui/RegionFilter';
import TimeFilter from '@/components/ui/TimeFilter';
import {
  LEVEL_OPTIONS,
  LevelValue,
  SORT_OPTIONS,
  SortValue,
} from '@/constants/session/sessionFilters';

function getOptionLabel<T extends readonly { label: string; value: string }[]>(
  options: T,
  value?: T[number]['value']
) {
  return options.find((option) => option.value === value)?.label;
}

export default function SessionFilterBar() {
  const [region, setRegion] = useState<Record<string, string[]> | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<[number, number] | undefined>();
  const [level, setLevel] = useState<LevelValue | undefined>();
  const [sort, setSort] = useState<SortValue | undefined>();

  return (
    <div className="mb-6 flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <RegionFilter value={region} onChange={setRegion} />
        <DateFilter value={date} onChange={setDate} />
        <TimeFilter value={time} onChange={setTime} />

        {/** 난이도 */}
        <Dropdown size="lg" hasSelected={Boolean(level)}>
          <Dropdown.Trigger>
            {getOptionLabel(LEVEL_OPTIONS, level) || '난이도'}
          </Dropdown.Trigger>
          <Dropdown.Content>
            {LEVEL_OPTIONS.map(({ label, value }) => (
              <Dropdown.Item
                key={value}
                selected={level === value}
                onSelect={() => setLevel(value)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <FilterButton className="pl-2" />
      </div>

      {/** 정렬 */}
      <Dropdown size="lg">
        <Dropdown.Trigger className="bg-transparent">
          {getOptionLabel(SORT_OPTIONS, sort)}
        </Dropdown.Trigger>
        <Dropdown.Content>
          {SORT_OPTIONS.map(({ label, value }) => (
            <Dropdown.Item
              key={value}
              selected={sort === value}
              onSelect={() => setSort(value)}
            >
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
