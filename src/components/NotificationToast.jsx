import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

export default function NotificationToast({ notifications }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} color="#00d4aa" />
      case 'error': return <AlertCircle size={18} color="#ff6b6b" />
      default: return <Info size={18} color="#4a9eff" />
    }
  }

  const getBg = (type) => {
    switch (type) {
      case 'success': return 'rgba(0, 212, 170, 0.1)'
      case 'error': return 'rgba(255, 107, 107, 0.1)'
      default: return 'rgba(74, 158, 255, 0.1)'
    }
  }

  const getBorder = (type) => {
    switch (type) {
      case 'success': return 'rgba(0, 212, 170, 0.2)'
      case 'error': return 'rgba(255, 107, 107, 0.2)'
      default: return 'rgba(74, 158, 255, 0.2)'
    }
  }

  return (
    <div style={{
      position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: '12px',
            background: getBg(n.type),
            border: `1px solid ${getBorder(n.type)}`,
            backdropFilter: 'blur(12px)',
            animation: 'slideInRight 0.3s ease-out',
            minWidth: '280px',
          }}
        >
          {getIcon(n.type)}
          <p style={{ fontSize: '14px', color: '#fff', fontWeight: '500', flex: 1 }}>{n.message}</p>
        </div>
      ))}
    </div>
  )
}
