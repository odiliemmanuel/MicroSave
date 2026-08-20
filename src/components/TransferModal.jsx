import { useState } from 'react'
import { X, Send, Search } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

export default function TransferModal({ users, currentUser, onTransfer, onClose }) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.accountNumber.includes(searchTerm)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (recipient && amount) {
      onTransfer(recipient, amount)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '440px',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Transfer</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Search recipients */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
              Search Recipient
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or account number"
                style={{
                  width: '100%', padding: '12px 12px 12px 36px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none',
                }}
              />
            </div>
          </div>

          {/* User list */}
          {filteredUsers.length > 0 && (
            <div style={{
              maxHeight: '140px', overflowY: 'auto', marginBottom: '16px',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              {filteredUsers.map(u => (
                <button
                  key={u.accountNumber}
                  type="button"
                  onClick={() => { setRecipient(u.accountNumber); setSearchTerm(u.name) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '10px', border: 'none',
                    background: recipient === u.accountNumber ? 'rgba(0, 212, 170, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00d4aa, #00a882)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '600', color: '#fff', flexShrink: 0,
                  }}>
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#ddd' }}>{u.name}</p>
                    <p style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{u.accountNumber}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Account number input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
              Account Number
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter 10-digit account number"
              maxLength={10}
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px', color: '#fff', fontSize: '15px',
                fontFamily: 'monospace', letterSpacing: '2px', outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
              Amount
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: '#888', fontSize: '18px', fontWeight: '600',
              }}>₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                style={{
                  width: '100%', padding: '14px 16px 14px 32px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px', color: '#fff', fontSize: '18px',
                  fontWeight: '600', outline: 'none',
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
              Available: {formatNaira(currentUser.balance)}
            </p>
          </div>

          <button
            type="submit"
            disabled={!recipient || !amount}
            style={{
              width: '100%', padding: '14px',
              background: recipient && amount ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.08)',
              border: 'none', borderRadius: '12px',
              color: recipient && amount ? '#fff' : '#555',
              fontSize: '16px', fontWeight: '600', cursor: recipient && amount ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <Send size={18} />
            Send Money
          </button>
        </form>
      </div>
    </div>
  )
}
