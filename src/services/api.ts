export const api = {
  async get(path: string) {
    const token = localStorage.getItem('token')
    const res = await fetch(path, { headers: token ? { Authorization: `Bearer ${token}` } : undefined })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  async post(path: string, body: any) {
    const token = localStorage.getItem('token')
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }
}

export function formatDateTime(dt: Date | string) {
  const d = typeof dt === 'string' ? new Date(dt) : dt
  const pad = (n: number) => String(n).padStart(2, '0')
  const fecha = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
  const hora = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  return { fecha, hora }
}
