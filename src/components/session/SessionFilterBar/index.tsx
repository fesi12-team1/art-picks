'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateFilter from '@/components/ui/DateFilter';
import Dropdown from '@/components/ui/Dropdown';
import FilterButton from '@/components/ui/FilterButton';
import RegionFilter from '@/components/ui/RegionFilter';
import TimeFilter from '@/components/ui/TimeFilter';

const LEVEL_OPTIONS = [
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const;

export default function SessionFilterBar() {
  const [region, setRegion] = useState<Record<string, string[]> | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<[number, number] | undefined>();
  const [level, setLevel] = useState<
    'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | undefined
  >();

  return (
    <div className="mb-6 flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <RegionFilter value={region} onChange={setRegion} />
        <DateFilter value={date} onChange={setDate} />
        <TimeFilter value={time} onChange={setTime} />
        <Dropdown size="lg" hasSelected={Boolean(level)}>
          <Dropdown.Trigger>
            {LEVEL_OPTIONS.find((option) => option.value === level)?.label ||
              '난이도'}
          </Dropdown.Trigger>
          <Dropdown.Content>
            {LEVEL_OPTIONS.map((option) => (
              <Dropdown.Item
                key={option.value}
                selected={level === option.value}
                onSelect={() => setLevel(option.value)}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <FilterButton className="pl-2" />
      </div>
      <Dropdown size="lg">
        <Dropdown.Trigger>최근 생성순</Dropdown.Trigger>
      </Dropdown>
    </div>
  );
}
