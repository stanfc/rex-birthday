import { useRef, useEffect } from 'react'

/**
 * 觸控滑動偵測 hook
 * @param {(direction: 'UP'|'DOWN'|'LEFT'|'RIGHT') => void} onSwipe
 * @param {React.RefObject} targetRef - 綁定的元素
 */
export function useSwipe(onSwipe, targetRef) {
  const start = useRef(null)

  useEffect(() => {
    const el = targetRef?.current || document
    const threshold = 30

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      start.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e) => {
      if (!start.current) return
      const touch = e.changedTouches[0]
      const dx = touch.clientX - start.current.x
      const dy = touch.clientY - start.current.y

      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return

      if (Math.abs(dx) > Math.abs(dy)) {
        onSwipe(dx > 0 ? 'RIGHT' : 'LEFT')
      } else {
        onSwipe(dy > 0 ? 'DOWN' : 'UP')
      }
      start.current = null
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipe, targetRef])
}
