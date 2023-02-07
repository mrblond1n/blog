import {useEffect, DependencyList} from 'react'

export const useDebounceEffect = (fn: () => void, waitTime = 100, deps?: DependencyList) => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn()
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
