import { useState } from 'react'
import { Wallet, ArrowRight, Shield, Zap, Users } from 'lucide-react'

export default function Signup({ onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && email) {
      setLoading(true)
      onSignup(name, email)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        {/* Left side - Branding */}
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #00d4aa, #00a882)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Wallet size={26} color="#fff" />
            </div>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>MicroSave</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '16px' }}>
            Save Small.<br />
            <span style={{ color: '#00d4aa' }}>Grow Big.</span>
          </h1>

          <p style={{ fontSize: '16px', color: '#888', lineHeight: 1.6, marginBottom: '32px' }}>
            MicroSave automatically saves your spare change from every transaction. 
            You won't even feel it — until you see how much you've grown.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <Zap size={20} />, text: 'Instant round-down savings on every transfer' },
              { icon: <Shield size={20} />, text: 'Your money is safe and always accessible' },
              { icon: <Users size={20} />, text: 'Join thousands of smart savers' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#aaa',
                fontSize: '14px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0, 212, 170, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00d4aa',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px',
          animation: 'fadeIn 0.6s ease-out 0.2s both',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Create your account</h2>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px' }}>Start saving in under a minute</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>

            <button
              type="submit"
              disabled={!name || !email || loading}
              style={{
                width: '100%',
                padding: '14px',
                background: name && email ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '12px',
                color: name && email ? '#fff' : '#666',
                fontSize: '16px',
                fontWeight: '600',
                cursor: name && email ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s',
              }}
            >
              {loading ? 'Setting up...' : 'Get Started'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p style={{ fontSize: '12px', color: '#555', textAlign: 'center', marginTop: '16px' }}>
            By signing up, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}
