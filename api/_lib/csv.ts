export function toCSVWithBOM(headers: string[], rows: (string | number)[][]) {
  const esc = (v: string | number) => {
    const s = String(v ?? '')
    // escape quotes
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return '"' + s.replaceAll('"', '""') + '"'
    }
    return s
  }
  const lines = [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))]
  const csv = lines.join('\n')
  const BOM = '\uFEFF'
  return BOM + csv
}

export function formatFechaHora(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  const pad = (n: number) => String(n).padStart(2, '0')
  const fecha = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
  const hora = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  return { fecha, hora }
}
