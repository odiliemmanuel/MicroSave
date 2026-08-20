import { useState, useEffect } from 'react'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const { ws, connected } = useWebSocket()

  useEffect(() => {
    if (!ws) return

    const handleMessage = (e) => {
      const msg = JSON.parse(e.data)

      if (msg.type === 'signup_success' || msg.type === 'transfer_success' || msg.type === 'withdraw_success' || msg.type === 'save_success' || msg.type === 'transfer_received' || msg.type === 'bank_connected' || msg.type === 'lock_success' || msg.type === 'unlock_success' || msg.type === 'threshold_updated') {
        setUser(msg.user)
      }

      if (msg.type === 'users_update') {
        setAllUsers(msg.users)
      }

      if (msg.type === 'salary_nudge') {
        alert(msg.message)
      }

      if (msg.type === 'error') {
        alert(msg.message)
      }
    }

    ws.addEventListener('message', handleMessage)
    return () => ws.removeEventListener('message', handleMessage)
  }, [ws])

  const handleSignup = (name, email) => {
    if (ws && connected) {
      ws.send(JSON.stringify({ type: 'signup', name, email }))
    }
  }

  const handleConnectBank = (bankName) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'connect_bank', accountNumber: user.accountNumber, bankName }))
    }
  }

  const handleTransfer = (to, amount) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'transfer', from: user.accountNumber, to, amount: parseFloat(amount) }))
    }
  }

  const handleWithdraw = (amount) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'withdraw', accountNumber: user.accountNumber, amount: parseFloat(amount) }))
    }
  }

  const handleSave = (amount) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'save', accountNumber: user.accountNumber, amount: parseFloat(amount) }))
    }
  }

  const handleLock = (amount, tier) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'lock_savings', accountNumber: user.accountNumber, amount: parseFloat(amount), tier }))
    }
  }

  const handleUnlock = (amount) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'unlock_savings', accountNumber: user.accountNumber, amount: parseFloat(amount) }))
    }
  }

  const handleUpdateThreshold = (threshold) => {
    if (ws && connected && user) {
      ws.send(JSON.stringify({ type: 'update_threshold', accountNumber: user.accountNumber, threshold }))
    }
  }

  if (!user) {
    return <Signup onSignup={handleSignup} />
  }

  return (
    <Dashboard
      user={user}
      allUsers={allUsers}
      onTransfer={handleTransfer}
      onWithdraw={handleWithdraw}
      onSave={handleSave}
      onLock={handleLock}
      onUnlock={handleUnlock}
      onConnectBank={handleConnectBank}
      onUpdateThreshold={handleUpdateThreshold}
      connected={connected}
    />
  )
}

export default App
