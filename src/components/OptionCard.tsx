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
        `hover:bg-slate-50 focus-within:ring-2 focus-within:ring-slate-400 ` +
        (checked ? 'border-slate-900 bg-slate-50' : 'border-slate-200')
      }
    >
      <input
        type="radio"
        className="h-5 w-5 accent-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        aria-checked={checked}
      />
      <span className="text-[15px] select-none leading-relaxed">{label}</span>
    </label>
  )
}
