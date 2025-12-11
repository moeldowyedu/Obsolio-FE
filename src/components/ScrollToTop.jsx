import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Check if there is a hash in the URL
    if (pathname && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)

      if (element) {
        // Add a small delay to ensure content is loaded/rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
        return
      }
    }

    // Default: Scroll to top when route changes (and no hash match found immediately)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [pathname, window.location.hash])

  return null // This component doesn't render anything
}

export default ScrollToTop
