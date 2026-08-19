import { useState, useEffect, useCallback } from 'react'
import { AsyncState } from '../types/api'

/**
 * Generic custom hook for fetching data from a REST API
 * @template T - The expected type of the fetched data
 * @param url - The URL to fetch from
 * @returns Current async state and a refetch function
 */
export function useFetch<T>(url: string): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' })

  const fetchData = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: T = await response.json()
      setState({ status: 'success', data })
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setState({ status: 'error', error })
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [url])

  return {
    ...state,
    refetch: fetchData,
  }
}
