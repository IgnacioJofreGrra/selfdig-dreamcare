import { ResponsiveContainer, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Bar } from 'recharts'

type Props = {
  data: Array<{ quiz: string; count: number }>
}

export default function AdminBarChart({ data }: Props) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quiz" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
