import { useState } from 'react'
import { X, PiggyBank, Sparkles } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

export default function SaveModal({ balance, threshold, onSave, onUpdateThreshold, onClose }) {
  const [amount, setAmount] = useState('')
  const [roundDown, setRoundDown] = useState(null)
  const [showThreshold, setShowThreshold] = useState(false)
  const [newThreshold, setNewThreshold] = useState(threshold || 100)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount) {
      onSave(amount)
    }
  }

  const handleRoundDown = (nearest) => {
    const currentBalance = Math.floor(balance)
    let savings = 0

    if (nearest === 10) {
      savings = currentBalance % 10
    } else if (nearest === 50) {
      savings = currentBalance % 50
    } else if (nearest === 100) {
      savings = currentBalance % 100
    } else if (nearest === 500) {
      savings = currentBalance % 500
    } else if (nearest === 1000) {
      savings = currentBalance % 1000
    }

    if (savings === 0) savings = nearest
    setAmount(savings.toString())
    setRoundDown(nearest)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '420px',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Save Money</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Round-down feature */}
        <div style={{
          padding: '16px', borderRadius: '14px',
          background: 'rgba(0, 212, 170, 0.06)',
          border: '1px solid rgba(0, 212, 170, 0.1)',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="#00d4aa" />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#00d4aa' }}>Quick Save (Round Down)</p>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
            Save the spare change by rounding down to nearest:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[10, 50, 100, 500, 1000].map(n => (
              <button
                key={n}
                onClick={() => handleRoundDown(n)}
                style={{
                  padding: '8px 14px', borderRadius: '8px',
                  border: roundDown === n ? '1px solid #00d4aa' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: roundDown === n ? 'rgba(0, 212, 170, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: roundDown === n ? '#00d4aa' : '#aaa',
                  fontSize: '13px', cursor: 'pointer', fontWeight: '500',
                }}
              >
                ₦{n.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
              Amount to Save
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: '#888', fontSize: '18px', fontWeight: '600',
              }}>₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setRoundDown(null) }}
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
            <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
              Available: {formatNaira(balance)}
            </p>
          </div>

          {/* Threshold settings */}
          <div style={{
            padding: '14px', borderRadius: '12px',
            background: 'rgba(74, 158, 255, 0.06)',
            border: '1px solid rgba(74, 158, 255, 0.1)',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#4a9eff' }}>Auto Round-Up Threshold</p>
              <button
                type="button"
                onClick={() => setShowThreshold(!showThreshold)}
                style={{
                  background: 'none', border: 'none', color: '#4a9eff',
                  fontSize: '12px', cursor: 'pointer', textDecoration: 'underline',
                }}
              >
                {showThreshold ? 'Hide' : 'Change'}
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: showThreshold ? '10px' : 0 }}>
              Current: Round down to nearest ₦{(threshold || 100).toLocaleString()}
            </p>
            {showThreshold && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[10, 50, 100, 500, 1000].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setNewThreshold(n)
                      onUpdateThreshold && onUpdateThreshold(n)
                    }}
                    style={{
                      padding: '6px 12px', borderRadius: '6px',
                      border: (threshold || 100) === n ? '1px solid #4a9eff' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: (threshold || 100) === n ? 'rgba(74, 158, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      color: (threshold || 100) === n ? '#4a9eff' : '#888',
                      fontSize: '12px', cursor: 'pointer', fontWeight: '500',
                    }}
                  >
                    ₦{n.toLocaleString()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!amount || parseFloat(amount) > balance || parseFloat(amount) < 1}
            style={{
              width: '100%', padding: '14px',
              background: amount && parseFloat(amount) <= balance && parseFloat(amount) >= 1
                ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.08)',
              border: 'none', borderRadius: '12px',
              color: amount && parseFloat(amount) <= balance && parseFloat(amount) >= 1 ? '#fff' : '#555',
              fontSize: '16px', fontWeight: '600',
              cursor: amount && parseFloat(amount) <= balance && parseFloat(amount) >= 1 ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <PiggyBank size={18} />
            Save Now
          </button>
        </form>
      </div>
    </div>
  )
}
