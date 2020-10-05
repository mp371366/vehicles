async function fetchData<T>(url: string, init?: RequestInit): Promise<T> {
  url = `http://localhost:8080/api${url}`

  return fetch(url, init).then((res) => {
    if (!res.ok || res.status !== 200) {
      throw new Error(`Bad response status: ${res.ok && res.status}`)
    }

    return res.json() as Promise<T>
  })
}

const api = {
  get: async <T>(url: string, params?: Record<string, string>): Promise<T> => {
    const paramsString = Object.entries(params || {})
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    url = `${url}${params !== undefined ? `?${paramsString}` : ''}`
    return await fetchData<T>(url)
  },
}

export default api
