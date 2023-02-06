// Взято с https://usehooks.com/useWindowSize/
import React from 'react'
// Define general type for useWindowSize hook, which includes width and height
type TSize = {
  width: number | undefined
  height: number | undefined
}
// Hook
export const useWindowSize = (): TSize => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState<TSize>({
    width: undefined,
    height: undefined,
  })

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
