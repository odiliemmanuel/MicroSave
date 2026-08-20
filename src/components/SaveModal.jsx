import { useState } from 'react'
import { X, PiggyBank, Sparkles, Check, Clock, Zap, Calendar, Lock as LockIcon } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

export default function SaveModal({ balance, threshold, onSave, onUpdateThreshold, onClose }) {
  const [selectedThreshold, setSelectedThreshold] = useState(threshold || 100)
  const [selectedPeriod, setSelectedPeriod] = useState('flex')
  const [showPeriodPicker, setShowPeriodPicker] = useState(false)
  const [done, setDone] = useState(false)

  const periods = [
    { id: 'flex', label: 'Flex', desc: 'No lock — withdraw anytime', icon: <Zap size={14} />, color: '#00d4aa', days: 0 },
    { id: '30day', label: '30 Days', desc: 'Lock for 1 month', icon: <Clock size={14} />, color: '#4a9eff', days: 30 },
    { id: '90day', label: '90 Days', desc: 'Lock for 3 months', icon: <Calendar size={14} />, color: '#a855f7', days: 90 },
    { id: '180day', label: '6 Months', desc: 'Lock for 6 months', icon: <Calendar size={14} />, color: '#f59e0b', days: 180 },
    { id: '365day', label: '1 Year', desc: 'Best returns', icon: <LockIcon size={14} />, color: '#ef4444', days: 365 },
  ]

  const handleThresholdClick = (n) => {
    setSelectedThreshold(n)
    setShowPeriodPicker(true)
  }

  const handlePeriodSelect = (periodId) => {
    setSelectedPeriod(periodId)
    setShowPeriodPicker(false)
  }

  const handleConfirm = () => {
    if (onUpdateThreshold) {
      onUpdateThreshold(selectedThreshold, selectedPeriod)
    }
    setDone(true)
    setTimeout(() => onClose(), 1200)
  }

  const selectedPeriodObj = periods.find(p => p.id === selectedPeriod)

  // Period picker popup
  if (showPeriodPicker) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}>
        <div style={{
          background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '380px',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>Savings Period</h2>
            <button onClick={() => setShowPeriodPicker(false)} style={{
              background: 'rgba(255, 255, 255, 0.06)', border: 'none',
              borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
            }}>
              <X size={18} />
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px', lineHeight: 1.5 }}>
            Choose how long your ₦{selectedThreshold.toLocaleString()} spare change stays locked. Longer periods earn higher interest.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {periods.map(p => (
              <button
                key={p.id}
                onClick={() => handlePeriodSelect(p.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: '12px',
                  border: selectedPeriod === p.id
                    ? `1px solid ${p.color}`
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  background: selectedPeriod === p.id
                    ? `${p.color}15`
                    : 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: selectedPeriod === p.id ? `${p.color}25` : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: selectedPeriod === p.id ? p.color : '#666',
                  flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '14px', fontWeight: '600',
                    color: selectedPeriod === p.id ? '#fff' : '#aaa',
                  }}>{p.label}</p>
                  <p style={{ fontSize: '11px', color: '#666' }}>{p.desc}</p>
                </div>
                {selectedPeriod === p.id && (
                  <Check size={16} color={p.color} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowPeriodPicker(false)}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #00d4aa, #00a882)',
              border: 'none', borderRadius: '12px',
              color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Main modal
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '420px',
        animation: 'fadeIn 0.3s ease-out',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Auto Savings</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Balance display */}
        <div style={{
          textAlign: 'center', padding: '12px', borderRadius: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Current Balance</p>
          <p style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>{formatNaira(balance)}</p>
        </div>

        {/* Threshold selection */}
        <div style={{
          padding: '16px', borderRadius: '14px',
          background: 'rgba(0, 212, 170, 0.06)',
          border: '1px solid rgba(0, 212, 170, 0.1)',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="#00d4aa" />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#00d4aa' }}>Round-Down Threshold</p>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px', lineHeight: 1.5 }}>
            After every transfer, spare change above the nearest amount gets saved automatically.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[10, 50, 100, 500, 1000].map(n => (
              <button
                key={n}
                onClick={() => handleThresholdClick(n)}
                style={{
                  padding: '10px 16px', borderRadius: '10px',
                  border: selectedThreshold === n ? '1px solid #00d4aa' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedThreshold === n ? 'rgba(0, 212, 170, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedThreshold === n ? '#00d4aa' : '#aaa',
                  fontSize: '15px', cursor: 'pointer', fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                ₦{n.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected summary + change period link */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '20px',
        }}>
          <div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>Savings Period</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{selectedPeriodObj?.label}</p>
          </div>
          <button
            onClick={() => setShowPeriodPicker(true)}
            style={{
              background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
              color: '#a855f7', fontSize: '12px', fontWeight: '500',
            }}
          >
            Change
          </button>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={done}
          style={{
            width: '100%', padding: '14px',
            background: done
              ? 'rgba(0, 212, 170, 0.3)'
              : 'linear-gradient(135deg, #00d4aa, #00a882)',
            border: 'none', borderRadius: '12px',
            color: '#fff',
            fontSize: '16px', fontWeight: '600',
            cursor: done ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          {done ? (
            <>
              <Check size={18} />
              Auto Savings Configured!
            </>
          ) : (
            <>
              <PiggyBank size={18} />
              Save — ₦{selectedThreshold.toLocaleString()} · {selectedPeriodObj?.label}
            </>
          )}
        </button>

        <p style={{ fontSize: '11px', color: '#555', textAlign: 'center', marginTop: '12px' }}>
          No money deducted now. Spare change auto-saves after your next transfer.
        </p>
      </div>
    </div>
  )
}
