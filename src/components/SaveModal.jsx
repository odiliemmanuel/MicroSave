import { useState } from 'react'
import { X, PiggyBank, Sparkles, Check, Clock, Zap, Calendar, Lock as LockIcon } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

export default function SaveModal({ balance, threshold, onSave, onUpdateThreshold, onClose }) {
  const [selectedThreshold, setSelectedThreshold] = useState(threshold || 100)
  const [selectedPeriod, setSelectedPeriod] = useState('flex')
  const [done, setDone] = useState(false)

  const periods = [
    { id: 'flex', label: 'Flex', desc: 'No lock — withdraw anytime', icon: <Zap size={14} />, color: '#00d4aa', days: 0 },
    { id: '30day', label: '30 Days', desc: 'Lock for 1 month', icon: <Clock size={14} />, color: '#4a9eff', days: 30 },
    { id: '90day', label: '90 Days', desc: 'Lock for 3 months', icon: <Calendar size={14} />, color: '#a855f7', days: 90 },
    { id: '180day', label: '6 Months', desc: 'Lock for 6 months', icon: <Calendar size={14} />, color: '#f59e0b', days: 180 },
    { id: '365day', label: '1 Year', desc: 'Best returns', icon: <LockIcon size={14} />, color: '#ef4444', days: 365 },
  ]

  const handleSetThreshold = (nearest) => {
    setSelectedThreshold(nearest)
  }

  const handleConfirm = () => {
    if (onUpdateThreshold) {
      onUpdateThreshold(selectedThreshold, selectedPeriod)
    }
    setDone(true)
    setTimeout(() => onClose(), 1200)
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
          textAlign: 'center', padding: '14px', borderRadius: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '24px',
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
            After every transfer or withdrawal, if your balance has spare change above the nearest amount, it gets saved automatically.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {[10, 50, 100, 500, 1000].map(n => (
              <button
                key={n}
                onClick={() => handleSetThreshold(n)}
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

          {/* Example */}
          <div style={{
            padding: '10px 12px', borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            fontSize: '11px', color: '#888', lineHeight: 1.5,
          }}>
            Example: Balance ₦6,420 → nearest ₦{selectedThreshold.toLocaleString()} → ₦{(() => {
              const rem = 6420 % selectedThreshold
              return rem === 0 ? '0 saved (already clean)' : `${rem.toLocaleString()} saved`
            })()}
          </div>
        </div>

        {/* Savings Period */}
        <div style={{
          padding: '16px', borderRadius: '14px',
          background: 'rgba(168, 85, 247, 0.06)',
          border: '1px solid rgba(168, 85, 247, 0.1)',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Clock size={16} color="#a855f7" />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#a855f7' }}>Savings Period</p>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px', lineHeight: 1.5 }}>
            Choose how long your auto-saved spare change stays locked. Longer periods earn higher interest.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {periods.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPeriod(p.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 14px', borderRadius: '12px',
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
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: selectedPeriod === p.id ? `${p.color}25` : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: selectedPeriod === p.id ? p.color : '#666',
                  flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '13px', fontWeight: '600',
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
        </div>

        {/* Confirm button — only for setting the threshold */}
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
              Save — ₦{selectedThreshold.toLocaleString()} · {periods.find(p => p.id === selectedPeriod)?.label}
            </>
          )}
        </button>

        <p style={{ fontSize: '11px', color: '#555', textAlign: 'center', marginTop: '12px' }}>
          {selectedPeriod === 'flex'
            ? 'No money deducted now. Spare change auto-saves after your next transfer.'
            : `Spare change auto-saves after transfers. Locked for ${periods.find(p => p.id === selectedPeriod)?.days} days with interest.`}
        </p>
      </div>
    </div>
  )
}
