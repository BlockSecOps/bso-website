'use client'

import { useEffect, useRef } from 'react'

interface EngagementTrackerProps {
  slug: string
}

export function EngagementTracker({ slug }: EngagementTrackerProps) {
  const startTimeRef = useRef<number>(Date.now())
  const trackedRef = useRef<boolean>(false)

  useEffect(() => {
    // Track page view immediately
    if (!trackedRef.current) {
      fetch('/api/track-engagement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, timeOnPage: 0 }),
      }).catch(() => {
        // Silently fail - don't disrupt user experience
      })
      trackedRef.current = true
    }

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000)

      // Use sendBeacon for reliability when page is unloading
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ slug, timeOnPage })],
          { type: 'application/json' }
        )
        navigator.sendBeacon('/api/track-engagement', blob)
      }
    }

    // Track engagement on visibility change (tab switching, minimizing)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000)
        fetch('/api/track-engagement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug, timeOnPage }),
        }).catch(() => {
          // Silently fail
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [slug])

  return null // This component doesn't render anything
}
