import { useState, useEffect } from 'react'
import { X, Globe, Copy, Check, ExternalLink, Code, Server, Database, Shield } from 'lucide-react'

const endpoints = [
  {
    method: 'GET',
    path: '/api/health',
    desc: 'Health check — Verify SDK is running',
    color: '#00d4aa',
  },
  {
    method: 'GET',
    path: '/api/v1/users',
    desc: 'List all registered MicroSave users',
    color: '#4a9eff',
  },
  {
    method: 'GET',
    path: '/api/v1/stats',
    desc: 'Platform statistics — total users, savings, yield estimates',
    color: '#a855f7',
  },
  {
    method: 'GET',
    path: '/api/v1/roundup/config',
    desc: 'Round-up configuration — thresholds, AI nudge settings',
    color: '#ff9f43',
  },
  {
    method: 'GET',
    path: '/api/v1/lock/tiers',
    desc: 'Lock tier definitions — rates, fees, durations',
    color: '#ff6b6b',
  },
]

export default function ApiDemo({ onClose }) {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState({})
  const [copied, setCopied] = useState(null)

  const callEndpoint = async (endpoint) => {
    setLoading(prev => ({ ...prev, [endpoint.path]: true }))
    try {
      const res = await fetch(endpoint.path)
      const data = await res.json()
      setResults(prev => ({ ...prev, [endpoint.path]: data }))
    } catch (err) {
      setResults(prev => ({ ...prev, [endpoint.path]: { error: err.message } }))
    }
    setLoading(prev => ({ ...prev, [endpoint.path]: false }))
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sdkSnippet = `<!-- MicroSave SDK Integration -->
<script src="https://sdk.microsave.io/v1/microsave.min.js"></script>
<script>
  MicroSave.init({
    bankId: 'alat',
    userId: '${'{user_id}'}',
    threshold: 100,
    aiNudge: true,
    salaryDetection: true,
    onRoundUp: (amount) => {
      console.log('Saved:', amount);
    }
  });
</script>`

  const apiSnippet = `// MicroSave REST API
const response = await fetch('https://api.microsave.io/v1/stats');
const stats = await response.json();
// { totalUsers: 1247, totalSavings: 4500000, ... }`

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '700px',
        animation: 'fadeIn 0.3s ease-out', maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Globe size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>API / SDK Demo</h2>
              <p style={{ fontSize: '12px', color: '#888' }}>B2B2C plug-in infrastructure for banking partners</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#888',
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Architecture overview */}
        <div style={{
          padding: '16px', borderRadius: '14px',
          background: 'rgba(168, 85, 247, 0.06)',
          border: '1px solid rgba(168, 85, 247, 0.12)',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#a855f7', marginBottom: '10px' }}>
            Architecture: B2B2C Plug-In Model
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { icon: <Database size={14} />, label: 'Bank API (Open Banking)', color: '#4a9eff' },
              { icon: <Server size={14} />, label: 'MicroSave Engine', color: '#a855f7' },
              { icon: <Shield size={14} />, label: 'Round-Up + AI Nudge', color: '#00d4aa' },
              { icon: <Globe size={14} />, label: 'Bank App (ALAT Integration)', color: '#ff9f43' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  padding: '6px 10px', borderRadius: '8px',
                  background: item.color + '15', display: 'flex',
                  alignItems: 'center', gap: '6px', fontSize: '11px', color: item.color, fontWeight: '500',
                }}>
                  {item.icon}
                  {item.label}
                </div>
                {i < 3 && <span style={{ color: '#555', fontSize: '16px' }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Live API endpoints */}
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
          Live API Endpoints
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {endpoints.map((ep) => (
            <div key={ep.path} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}>
              <span style={{
                padding: '3px 8px', borderRadius: '4px',
                background: ep.color + '20', color: ep.color,
                fontSize: '11px', fontWeight: '700', fontFamily: 'monospace',
              }}>
                {ep.method}
              </span>
              <code style={{ fontSize: '13px', color: '#ddd', fontFamily: 'monospace', flex: 1 }}>
                {ep.path}
              </code>
              <span style={{ fontSize: '12px', color: '#888', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {ep.desc}
              </span>
              <button
                onClick={() => callEndpoint(ep)}
                disabled={loading[ep.path]}
                style={{
                  padding: '6px 12px', borderRadius: '6px', border: 'none',
                  background: loading[ep.path] ? 'rgba(255,255,255,0.05)' : ep.color + '20',
                  color: ep.color, fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                {loading[ep.path] ? '...' : 'Try'}
              </button>
            </div>
          ))}
        </div>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '10px' }}>Response</h3>
            <div style={{
              background: '#0d0d1a', border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '12px', padding: '16px', fontFamily: 'monospace',
              fontSize: '12px', color: '#00d4aa', lineHeight: 1.6,
              maxHeight: '200px', overflowY: 'auto',
            }}>
              {JSON.stringify(results, null, 2)}
            </div>
          </div>
        )}

        {/* Code snippets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>SDK Integration</p>
            <div style={{
              background: '#0d0d1a', border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '10px', padding: '12px', position: 'relative',
            }}>
              <button
                onClick={() => copyCode(sdkSnippet)}
                style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: 'rgba(255, 255, 255, 0.06)', border: 'none',
                  borderRadius: '4px', padding: '4px', cursor: 'pointer', color: '#888',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
              </button>
              <pre style={{ fontSize: '11px', color: '#aaa', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>
                {sdkSnippet}
              </pre>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>REST API</p>
            <div style={{
              background: '#0d0d1a', border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '10px', padding: '12px', position: 'relative',
            }}>
              <button
                onClick={() => copyCode(apiSnippet)}
                style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: 'rgba(255, 255, 255, 0.06)', border: 'none',
                  borderRadius: '4px', padding: '4px', cursor: 'pointer', color: '#888',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
              </button>
              <pre style={{ fontSize: '11px', color: '#aaa', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>
                {apiSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
