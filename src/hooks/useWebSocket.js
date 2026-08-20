import { useState, useEffect, useRef } from 'react'

export function useWebSocket() {
  const [connected, setConnected] = useState(false)
  const [ready, setReady] = useState(false)
  const wsRef = useRef(null)

  useEffect(() => {
    const host = window.location.hostname
    const wsUrl = `ws://${host}:8080`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      setConnected(true)
      setReady(true)
      console.log('WebSocket connected to', wsUrl)
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

  return { ws: wsRef.current, connected, ready }
}
