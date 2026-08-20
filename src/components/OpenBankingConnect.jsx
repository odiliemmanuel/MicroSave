import { useState } from 'react'
import { X, Building2, Link2, Shield, Check, ChevronRight, Lock } from 'lucide-react'

const BANKS = [
  { id: 'alat', name: 'ALAT by Wema', color: '#00a882', desc: 'Nigeria\'s first fully digital bank' },
  { id: 'kuda', name: 'Kuda Bank', color: '#ff5722', desc: 'The bank of the free' },
  { id: 'opay', name: 'OPay', color: '#00b167', desc: 'Mobile money & financial services' },
  { id: 'palmpay', name: 'PalmPay', color: '#e91e63', desc: 'Fast, reliable payments' },
  { id: 'gtbank', name: 'Guaranty Trust Bank', color: '#ff6600', desc: 'Africa\'s most admired bank' },
  { id: 'access', name: 'Access Bank', color: '#003366', desc: 'Africa\'s gateway to financial inclusion' },
]

export default function OpenBankingConnect({ connectedBank, onConnect, onClose }) {
  const [selectedBank, setSelectedBank] = useState(null)
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    if (selectedBank) {
      setConnecting(true)
      setTimeout(() => {
        onConnect(BANKS.find(b => b.id === selectedBank)?.name || selectedBank)
        setConnecting(false)
      }, 1500)
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
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '460px',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Connect Your Bank</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Open Banking info */}
        <div style={{
          padding: '14px 16px', borderRadius: '12px',
          background: 'rgba(0, 212, 170, 0.06)',
          border: '1px solid rgba(0, 212, 170, 0.1)',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Shield size={14} color="#00d4aa" />
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#00d4aa' }}>Open Banking (CBN Compliant)</p>
          </div>
          <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>
            Your bank data is accessed via Nigeria's Open Banking API framework. MicroSave never stores your bank credentials. Connection is read-only for transaction monitoring.
          </p>
        </div>

        {connectedBank && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: '12px',
            background: 'rgba(0, 212, 170, 0.08)',
            border: '1px solid rgba(0, 212, 170, 0.15)',
            marginBottom: '20px',
          }}>
            <Check size={18} color="#00d4aa" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#00d4aa' }}>Connected</p>
              <p style={{ fontSize: '12px', color: '#aaa' }}>{connectedBank}</p>
            </div>
          </div>
        )}

        <p style={{ fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '12px' }}>Select your bank</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '280px', overflowY: 'auto' }}>
          {BANKS.map(bank => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '12px',
                border: selectedBank === bank.id ? `1px solid ${bank.color}44` : '1px solid rgba(255, 255, 255, 0.06)',
                background: selectedBank === bank.id ? bank.color + '10' : 'rgba(255, 255, 255, 0.02)',
                cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: bank.color + '20', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Building2 size={20} color={bank.color} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{bank.name}</p>
                <p style={{ fontSize: '11px', color: '#888' }}>{bank.desc}</p>
              </div>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%',
                border: selectedBank === bank.id ? `2px solid ${bank.color}` : '2px solid #444',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selectedBank === bank.id && (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: bank.color }} />
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleConnect}
          disabled={!selectedBank || connecting}
          style={{
            width: '100%', padding: '14px',
            background: selectedBank && !connecting ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.08)',
            border: 'none', borderRadius: '12px',
            color: selectedBank && !connecting ? '#fff' : '#555',
            fontSize: '16px', fontWeight: '600',
            cursor: selectedBank && !connecting ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
        >
          {connecting ? (
            <>
              <div style={{
                width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Connecting...
            </>
          ) : (
            <>
              <Link2 size={18} />
              Connect Bank
            </>
          )}
        </button>
      </div>
    </div>
  )
}
