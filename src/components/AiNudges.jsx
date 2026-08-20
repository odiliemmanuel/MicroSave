import { useState, useEffect } from 'react'
import { Zap, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, Shield, PiggyBank, BarChart3 } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

const aiInsights = [
  {
    id: 1,
    type: 'tip',
    icon: <Lightbulb size={20} />,
    color: '#ffd700',
    title: 'Savings Opportunity Detected',
    message: 'You spent ₦12,400 on food this week. If you round down to nearest ₦100 on each transaction, you could save ~₦800/week without noticing.',
    action: 'Enable Auto Round-Down',
  },
  {
    id: 2,
    type: 'warning',
    icon: <AlertTriangle size={20} />,
    color: '#ff9f43',
    title: 'Spending Spike Alert',
    message: 'Your transport spending increased 45% this month compared to last month. Consider setting a transport budget of ₦3,000/week.',
    action: 'Set Budget Limit',
  },
  {
    id: 3,
    type: 'insight',
    icon: <TrendingUp size={20} />,
    color: '#00d4aa',
    title: 'Inflation Protection',
    message: '₦100,000 saved today will be worth ₦94,200 in purchasing power in 12 months at current inflation (5.8%). Consider our inflation-indexed savings to protect your money.',
    action: 'Learn More',
  },
  {
    id: 4,
    type: 'tip',
    icon: <Shield size={20} />,
    color: '#4a9eff',
    title: 'Smart Savings Rule',
    message: 'Based on your income, we recommend saving 20% (₦2,000) of your weekly earnings. You\'re currently at 12%. Try increasing your round-down to nearest ₦500.',
    action: 'Adjust Settings',
  },
  {
    id: 5,
    type: 'achievement',
    icon: <PiggyBank size={20} />,
    color: '#a855f7',
    title: 'Savings Milestone',
    message: 'You\'ve saved ₦12,000 this month — that\'s 23% more than last month! At this rate, you\'ll hit ₦50,000 in 3.2 months.',
    action: 'View Progress',
  },
]

const spendingBreakdown = [
  { category: 'Food & Dining', amount: 12400, percent: 35, color: '#ff6b6b' },
  { category: 'Transport', amount: 8500, percent: 24, color: '#4a9eff' },
  { category: 'Utilities', amount: 5200, percent: 15, color: '#00d4aa' },
  { category: 'Shopping', amount: 4800, percent: 14, color: '#ff9f43' },
  { category: 'Entertainment', amount: 3100, percent: 8, color: '#a855f7' },
  { category: 'Other', amount: 1500, percent: 4, color: '#888' },
]

export default function AiNudges({ user, allUsers }) {
  const [dismissedInsights, setDismissedInsights] = useState([])

  const visibleInsights = aiInsights.filter(i => !dismissedInsights.includes(i.id))

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={20} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>AI Insights</h2>
          <p style={{ fontSize: '13px', color: '#888' }}>Personalized tips to save smarter</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>
            Smart Recommendations
          </h3>
          {visibleInsights.map((insight) => (
            <div
              key={insight.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px', padding: '16px',
                animation: 'slideInUp 0.3s ease-out',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: insight.color + '15', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: insight.color, flexShrink: 0,
                }}>
                  {insight.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>
                    {insight.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>
                    {insight.message}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: insight.color + '15', color: insight.color,
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                }}>
                  {insight.action} <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => setDismissedInsights(prev => [...prev, insight.id])}
                  style={{
                    background: 'none', border: 'none', color: '#555',
                    fontSize: '11px', cursor: 'pointer',
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Spending breakdown */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '14px' }}>
            Spending Breakdown
          </h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px', padding: '20px',
          }}>
            {/* Visual bar */}
            <div style={{
              display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden',
              marginBottom: '20px',
            }}>
              {spendingBreakdown.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: `${item.percent}%`,
                    background: item.color,
                    transition: 'width 0.5s ease',
                  }}
                />
              ))}
            </div>

            {spendingBreakdown.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 0',
                borderBottom: i < spendingBreakdown.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '3px',
                  background: item.color, flexShrink: 0,
                }} />
                <span style={{ flex: 1, fontSize: '13px', color: '#ddd' }}>{item.category}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#ddd' }}>
                  {formatNaira(item.amount)}
                </span>
                <span style={{ fontSize: '12px', color: '#888', width: '35px', textAlign: 'right' }}>
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>

          {/* Inflation widget */}
          <div style={{
            marginTop: '16px', padding: '16px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(124, 58, 237, 0.04))',
            border: '1px solid rgba(168, 85, 247, 0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BarChart3 size={16} color="#a855f7" />
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#a855f7' }}>Inflation Monitor</p>
            </div>
            <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>
              Current inflation rate: <span style={{ color: '#ff6b6b', fontWeight: '600' }}>5.8%</span>.
              Your ₦{user.savings.toLocaleString()} savings loses ~₦{Math.round(user.savings * 0.058).toLocaleString()}/year in purchasing power.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
