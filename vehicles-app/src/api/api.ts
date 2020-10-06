async function fetchData<T>(url: string, init?: RequestInit): Promise<T> {
  url = `http://localhost:8080/api${url}`

  return fetch(url, init).then((res) => {
    if (!res.ok || res.status !== 200) {
      throw new Error(`Bad response status: ${res.ok && res.status}`)
    }

    return res.json() as Promise<T>
  })
}

function paramsToQueryString(params: Record<string, string>) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

function buildUrlWithParams(url: string, params?: Record<string, string>) {
  const paramsQueryString = paramsToQueryString(params || {})

  if (paramsQueryString.length > 0) {
    url += `?${paramsQueryString}`
  }

  return url
}

const api = {
  get: async <T>(url: string, params?: Record<string, string>): Promise<T> => {
    return fetchData<T>(buildUrlWithParams(url, params))
  },
}

export default api
