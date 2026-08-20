import { useState } from 'react'
import { X, Lock, Unlock, Shield, Clock, TrendingUp, AlertTriangle } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

const TIERS = [
  { id: 'flex', name: 'Flex Save', days: 0, rate: 5, fee: 0, color: '#00d4aa', desc: 'No lock, withdraw anytime' },
  { id: '30day', name: '30-Day Lock', days: 30, rate: 8, fee: 1.5, color: '#4a9eff', desc: '1-month commitment' },
  { id: '90day', name: '90-Day Lock', days: 90, rate: 12, fee: 2, color: '#ff9f43', desc: '3-month commitment' },
  { id: '180day', name: '180-Day Lock', days: 180, rate: 15, fee: 3, color: '#a855f7', desc: '6-month commitment' },
  { id: '365day', name: '1-Year Lock', days: 365, rate: 20, fee: 5, color: '#ff6b6b', desc: 'Maximum returns' },
]

export default function LockModal({ savings, lockedSavings, lockTier, lockExpiry, onLock, onUnlock, onClose }) {
  const [mode, setMode] = useState('lock')
  const [amount, setAmount] = useState('')
  const [selectedTier, setSelectedTier] = useState('30day')
  const [unlockAmount, setUnlockAmount] = useState('')

  const handleLock = (e) => {
    e.preventDefault()
    if (amount && parseFloat(amount) <= savings) {
      onLock(amount, selectedTier)
    }
  }

  const handleUnlock = (e) => {
    e.preventDefault()
    if (unlockAmount && parseFloat(unlockAmount) <= lockedSavings) {
      onUnlock(unlockAmount)
    }
  }

  const currentTier = TIERS.find(t => t.id === lockTier)
  const isLocked = lockedSavings > 0 && lockExpiry && new Date() < new Date(lockExpiry)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '500px',
        animation: 'fadeIn 0.3s ease-out', maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
            {mode === 'lock' ? 'Lock Savings' : 'Unlock Savings'}
          </h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: '4px', padding: '4px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setMode('lock')}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
              background: mode === 'lock' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              color: mode === 'lock' ? '#a855f7' : '#888',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            <Lock size={14} style={{ marginRight: '6px' }} />
            Lock
          </button>
          <button
            onClick={() => setMode('unlock')}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
              background: mode === 'unlock' ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
              color: mode === 'unlock' ? '#ffd700' : '#888',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            <Unlock size={14} style={{ marginRight: '6px' }} />
            Unlock
          </button>
        </div>

        {/* Current lock status */}
        {lockedSavings > 0 && (
          <div style={{
            padding: '14px 16px', borderRadius: '12px',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.15)',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#888' }}>Currently Locked</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#a855f7' }}>{formatNaira(lockedSavings)}</p>
              </div>
              {currentTier && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#888' }}>Tier</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: currentTier.color }}>{currentTier.name}</p>
                </div>
              )}
            </div>
            {lockExpiry && (
              <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                <Clock size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {isLocked ? `Expires: ${new Date(lockExpiry).toLocaleDateString()}` : 'Unlocked'}
              </p>
            )}
          </div>
        )}

        {mode === 'lock' ? (
          <form onSubmit={handleLock}>
            {/* Tier selection */}
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '10px' }}>Select Lock Tier</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {TIERS.map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: '12px',
                    border: selectedTier === tier.id ? `1px solid ${tier.color}44` : '1px solid rgba(255, 255, 255, 0.06)',
                    background: selectedTier === tier.id ? tier.color + '10' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: selectedTier === tier.id ? tier.color : '#444',
                      }} />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{tier.name}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#888', marginLeft: '16px', marginTop: '2px' }}>{tier.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: tier.color }}>{tier.rate}% p.a.</p>
                    {tier.fee > 0 && (
                      <p style={{ fontSize: '10px', color: '#ff6b6b' }}>{tier.fee}% early fee</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
                Amount to Lock
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
                  max={savings}
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
                Available savings: {formatNaira(savings)}
              </p>
            </div>

            <button
              type="submit"
              disabled={!amount || parseFloat(amount) > savings}
              style={{
                width: '100%', padding: '14px',
                background: amount && parseFloat(amount) <= savings
                  ? 'linear-gradient(135deg, #a855f7, #7c3aed)' : 'rgba(255, 255, 255, 0.08)',
                border: 'none', borderRadius: '12px',
                color: amount && parseFloat(amount) <= savings ? '#fff' : '#555',
                fontSize: '16px', fontWeight: '600',
                cursor: amount && parseFloat(amount) <= savings ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Lock size={18} />
              Lock {amount ? formatNaira(parseFloat(amount)) : ''}
            </button>
          </form>
        ) : (
          <form onSubmit={handleUnlock}>
            <div style={{
              padding: '14px', borderRadius: '12px',
              background: 'rgba(255, 215, 0, 0.06)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertTriangle size={14} color="#ffd700" />
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#ffd700' }}>Early Withdrawal Notice</p>
              </div>
              <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>
                {isLocked
                  ? `Unlocking before ${new Date(lockExpiry).toLocaleDateString()} will incur a ${currentTier?.fee || 0}% breaking fee.`
                  : 'Your lock period has expired. No breaking fee applies.'}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>
                Amount to Unlock
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  color: '#888', fontSize: '18px', fontWeight: '600',
                }}>₦</span>
                <input
                  type="number"
                  value={unlockAmount}
                  onChange={(e) => setUnlockAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max={lockedSavings}
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
                Locked: {formatNaira(lockedSavings)}
              </p>
            </div>

            <button
              type="submit"
              disabled={!unlockAmount || parseFloat(unlockAmount) > lockedSavings}
              style={{
                width: '100%', padding: '14px',
                background: unlockAmount && parseFloat(unlockAmount) <= lockedSavings
                  ? 'linear-gradient(135deg, #ffd700, #e6c200)' : 'rgba(255, 255, 255, 0.08)',
                border: 'none', borderRadius: '12px',
                color: unlockAmount && parseFloat(unlockAmount) <= lockedSavings ? '#1a1a2e' : '#555',
                fontSize: '16px', fontWeight: '600',
                cursor: unlockAmount && parseFloat(unlockAmount) <= lockedSavings ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Unlock size={18} />
              Unlock {unlockAmount ? formatNaira(parseFloat(unlockAmount)) : ''}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
