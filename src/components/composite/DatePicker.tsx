'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Label from '@/components/ui/Label';
import Popover from '@/components/ui/Popover';

export interface DatePickerProps {
  value?: Date;
  onChange: (next?: Date) => void;
  label?: string;
  inline?: boolean;
  captionLayout?: 'dropdown' | 'label';
}

export default function DatePicker({
  value,
  onChange,
  label = '날짜',
  inline = false,
  captionLayout = 'dropdown',
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (next?: Date) => {
    onChange?.(next);
  };

  if (inline) {
    return (
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <Calendar
          mode="single"
          selected={value}
          captionLayout={captionLayout}
          onSelect={handleSelect}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            variant="outline"
            className="w-56 justify-between font-normal"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {value ? (
                value.toLocaleDateString()
              ) : (
                <span className="text-muted-foreground">날짜를 선택하세요</span>
              )}
            </span>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Calendar
            mode="single"
            selected={value}
            captionLayout={captionLayout}
            onSelect={(next?: Date): void => {
              handleSelect(next);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover>
    </div>
  );
}
