import { useState } from 'react'
import { Wallet, ArrowRight, Shield, Zap, Users, LogIn } from 'lucide-react'

export default function Signup({ onSignup, onSignIn, ready }) {
  const [mode, setMode] = useState('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    if (name && email) {
      setLoading(true)
      onSignup(name, email)
      setTimeout(() => setLoading(false), 3000)
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    if (email) {
      setLoading(true)
      onSignIn(email)
      setTimeout(() => setLoading(false), 3000)
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
      <div className="signup-grid" style={{
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

        {/* Right side - Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '40px',
          animation: 'fadeIn 0.6s ease-out 0.2s both',
        }}>
          {/* Mode toggle */}
          <div style={{
            display: 'flex', gap: '4px', padding: '4px',
            background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px',
            marginBottom: '24px',
          }}>
            <button
              onClick={() => { setMode('signup'); setLoading(false) }}
              style={{
                flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                background: mode === 'signup' ? 'rgba(0, 212, 170, 0.15)' : 'transparent',
                color: mode === 'signup' ? '#00d4aa' : '#888',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMode('signin'); setLoading(false) }}
              style={{
                flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                background: mode === 'signin' ? 'rgba(0, 212, 170, 0.15)' : 'transparent',
                color: mode === 'signin' ? '#00d4aa' : '#888',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </div>

          {mode === 'signup' ? (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Create your account</h2>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px' }}>Start saving in under a minute</p>

              <form onSubmit={handleSignup}>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none',
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
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!name || !email || loading || !ready}
                  style={{
                    width: '100%', padding: '14px',
                    background: name && email && ready ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none', borderRadius: '12px',
                    color: name && email && ready ? '#fff' : '#666',
                    fontSize: '16px', fontWeight: '600',
                    cursor: name && email && ready ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {loading ? 'Setting up...' : 'Get Started'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Welcome back</h2>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px' }}>Sign in with your email address</p>

              <form onSubmit={handleSignIn}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#aaa', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || loading || !ready}
                  style={{
                    width: '100%', padding: '14px',
                    background: email && ready ? 'linear-gradient(135deg, #00d4aa, #00a882)' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none', borderRadius: '12px',
                    color: email && ready ? '#fff' : '#666',
                    fontSize: '16px', fontWeight: '600',
                    cursor: email && ready ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <LogIn size={18} />}
                </button>
              </form>
            </>
          )}

          <p style={{ fontSize: '12px', color: '#555', textAlign: 'center', marginTop: '16px' }}>
            {mode === 'signup'
              ? 'By signing up, you agree to our Terms of Service'
              : "Don't have an account? Switch to Sign Up"}
          </p>

          {/* Connection status */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', marginTop: '12px',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: ready ? '#00d4aa' : '#ff6464',
            }} />
            <span style={{ fontSize: '11px', color: ready ? '#00d4aa' : '#ff6464' }}>
              {ready ? 'Connected' : 'Connecting...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
