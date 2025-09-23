type Props = {
  name: string
  value: number
  label: string
  checked: boolean
  onChange: () => void
}

export function OptionCard({ name, value, label, checked, onChange }: Props) {
  return (
    <label
      className={
        `flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition shadow-sm ` +
        `hover:bg-slate-50 dark:hover:bg-slate-800/50 ` +
        (checked ? 'border-slate-900 dark:border-slate-200 bg-slate-50 dark:bg-slate-800/60' : 'border-slate-200 dark:border-slate-700')
      }
    >
      <input
        type="radio"
        className="h-5 w-5 accent-slate-900 dark:accent-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <span className="text-[15px] select-none">{label}</span>
    </label>
  )
}
