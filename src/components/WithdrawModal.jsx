import { useState } from 'react'
import { X, CreditCard } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

export default function WithdrawModal({ balance, onWithdraw, onClose }) {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount && parseFloat(amount) <= balance) {
      onWithdraw(amount)
    }
  }

  const quickAmounts = [500, 1000, 2000, 5000]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '400px',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Withdraw</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        <div style={{
          textAlign: 'center', padding: '16px', borderRadius: '14px',
          background: 'rgba(255, 107, 107, 0.06)',
          border: '1px solid rgba(255, 107, 107, 0.1)',
          marginBottom: '24px',
        }}>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Available Balance</p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#ff6b6b' }}>{formatNaira(balance)}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
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
                max={balance}
                style={{
                  width: '100%', padding: '14px 16px 14px 32px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px', color: '#fff', fontSize: '18px',
                  fontWeight: '600', outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {quickAmounts.map(qa => (
              <button
                key={qa}
                type="button"
                onClick={() => setAmount(qa.toString())}
                style={{
                  padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: amount === qa.toString() ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: amount === qa.toString() ? '#ff6b6b' : '#aaa',
                  fontSize: '13px', cursor: 'pointer', fontWeight: '500',
                }}
              >
                {formatNaira(qa)}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!amount || parseFloat(amount) > balance}
            style={{
              width: '100%', padding: '14px',
              background: amount && parseFloat(amount) <= balance ? 'linear-gradient(135deg, #ff6b6b, #e05252)' : 'rgba(255, 255, 255, 0.08)',
              border: 'none', borderRadius: '12px',
              color: amount && parseFloat(amount) <= balance ? '#fff' : '#555',
              fontSize: '16px', fontWeight: '600',
              cursor: amount && parseFloat(amount) <= balance ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <CreditCard size={18} />
            Withdraw
          </button>
        </form>
      </div>
    </div>
  )
}
