import { useState } from 'react'
import { Target, Flame, Trophy, Clock, Zap, Star, Check } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

const challenges = [
  {
    id: 1,
    name: '7-Day Streak',
    description: 'Save at least ₦100 every day for 7 days',
    icon: <Flame size={24} />,
    color: '#ff6b6b',
    reward: '₦500 bonus',
    progress: 4,
    total: 7,
    amount: 100,
  },
  {
    id: 2,
    name: 'Weekend Warrior',
    description: 'Save ₦500 every Saturday & Sunday this month',
    icon: <Target size={24} />,
    color: '#4a9eff',
    reward: '₦1,000 bonus',
    progress: 2,
    total: 8,
    amount: 500,
  },
  {
    id: 3,
    name: 'Round-Up Master',
    description: 'Use round-down savings 10 times this week',
    icon: <Star size={24} />,
    color: '#ffd700',
    reward: '₦2,000 bonus',
    progress: 7,
    total: 10,
    amount: 0,
  },
  {
    id: 4,
    name: '₦50K Sprint',
    description: 'Save up to ₦50,000 in your savings wallet',
    icon: <Trophy size={24} />,
    color: '#00d4aa',
    reward: 'VIP Status',
    progress: 12000,
    total: 50000,
    amount: 0,
  },
  {
    id: 5,
    name: 'Early Bird',
    description: 'Save before 8 AM for 5 consecutive days',
    icon: <Clock size={24} />,
    color: '#ff9f43',
    reward: '₦300 bonus',
    progress: 3,
    total: 5,
    amount: 50,
  },
  {
    id: 6,
    name: 'Power Saver',
    description: 'Save ₦1,000 or more in a single transaction',
    icon: <Zap size={24} />,
    color: '#a855f7',
    reward: '2x savings interest for a week',
    progress: 0,
    total: 1,
    amount: 1000,
  },
]

export default function SavingsChallenges({ user, onSave }) {
  const [activeChallenge, setActiveChallenge] = useState(null)

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
          Savings Challenges
        </h2>
        <p style={{ fontSize: '14px', color: '#888' }}>
          Complete challenges to earn bonus rewards and level up your savings game
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px',
      }}>
        {[
          { label: 'Active Challenges', value: '4', color: '#00d4aa' },
          { label: 'Completed', value: '12', color: '#4a9eff' },
          { label: 'Rewards Earned', value: '₦8,500', color: '#ffd700' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '16px 20px', borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{stat.label}</p>
            <p style={{ fontSize: '22px', fontWeight: '700', color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Challenges grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {challenges.map((challenge) => {
          const progressPercent = challenge.total > 1000
            ? (challenge.progress / challenge.total) * 100
            : (challenge.progress / challenge.total) * 100

          return (
            <div
              key={challenge.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px', padding: '20px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = challenge.color + '44'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: challenge.color + '15', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: challenge.color,
                }}>
                  {challenge.icon}
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: '600', color: challenge.color,
                  padding: '4px 10px', borderRadius: '20px',
                  background: challenge.color + '15',
                }}>
                  {challenge.reward}
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>
                {challenge.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '14px', lineHeight: 1.4 }}>
                {challenge.description}
              </p>

              {/* Progress bar */}
              <div style={{ marginBottom: '6px' }}>
                <div style={{
                  height: '6px', borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '3px',
                    background: `linear-gradient(90deg, ${challenge.color}, ${challenge.color}aa)`,
                    width: `${Math.min(progressPercent, 100)}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '11px', color: '#888' }}>
                  {challenge.total > 1000
                    ? `${formatNaira(challenge.progress)} / ${formatNaira(challenge.total)}`
                    : `${challenge.progress} / ${challenge.total}`}
                </p>
                <p style={{ fontSize: '11px', color: '#888' }}>
                  {Math.round(progressPercent)}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
