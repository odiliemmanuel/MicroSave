import { useState, useEffect, useRef } from 'react'

export function useWebSocket() {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    const wsUrl = `ws://localhost:8080`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      setConnected(true)
      console.log('WebSocket connected')
    }

    ws.onclose = () => {
      setConnected(false)
      console.log('WebSocket disconnected')
    }

    ws.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    wsRef.current = ws

    return () => {
      ws.close()
    }
  }, [])

  return { ws: wsRef.current, connected }
}
