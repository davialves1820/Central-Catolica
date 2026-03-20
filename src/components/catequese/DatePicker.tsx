"use client";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DatePicker = ({ selectedDate, onDateChange }: DatePickerProps) => {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="date-picker"
        className="text-sm font-medium text-zinc-500"
      >
        Data:
      </label>
      <input
        id="date-picker"
        type="date"
        className="rounded-lg border border-border px-3 py-1 text-sm bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-primary transition-all"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        title="Selecionar data"
      />
    </div>
  );
};
