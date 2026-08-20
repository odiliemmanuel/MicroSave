import { useState } from 'react'
import { Users, Clock, TrendingUp, Award, ChevronRight, Plus } from 'lucide-react'
import { formatNaira } from '../utils/helpers'

const communityGroups = [
  {
    id: 1,
    name: 'Market Traders Circle',
    members: 12,
    contribution: 1000,
    frequency: 'Weekly',
    totalPool: 12000,
    nextPayout: 'You',
    color: '#00d4aa',
  },
  {
    id: 2,
    name: 'Office Colleagues',
    members: 8,
    contribution: 2000,
    frequency: 'Monthly',
    totalPool: 16000,
    nextPayout: 'Adaeze K.',
    color: '#4a9eff',
  },
  {
    id: 3,
    name: 'Family Savings',
    members: 6,
    contribution: 500,
    frequency: 'Weekly',
    totalPool: 3000,
    nextPayout: 'Emeka O.',
    color: '#ff9f43',
  },
]

const leaderboard = [
  { rank: 1, name: 'Chidi A.', saved: 45000, streak: 14 },
  { rank: 2, name: 'You', saved: 12000, streak: 7 },
  { rank: 3, name: 'Adaeze K.', saved: 9500, streak: 5 },
  { rank: 4, name: 'Emeka O.', saved: 7200, streak: 3 },
  { rank: 5, name: 'Ngozi P.', saved: 5800, streak: 2 },
]

export default function CommunitySavings({ user, allUsers }) {
  const [selectedGroup, setSelectedGroup] = useState(null)

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
            Community Savings
          </h2>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Digital "AJO" — save together, grow together
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '10px 16px', borderRadius: '10px', border: 'none',
          background: 'linear-gradient(135deg, #00d4aa, #00a882)',
          color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>
          <Plus size={16} />
          Create Group
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Groups */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '14px' }}>
            Your Groups
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {communityGroups.map(group => (
              <div
                key={group.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${selectedGroup === group.id ? group.color + '44' : 'rgba(255, 255, 255, 0.06)'}`,
                  borderRadius: '16px', padding: '18px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onClick={() => setSelectedGroup(group.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: group.color + '15', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', color: group.color,
                    }}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{group.name}</h4>
                      <p style={{ fontSize: '12px', color: '#888' }}>{group.members} members</p>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#888" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#888' }}>Contribution</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#ddd' }}>
                      {formatNaira(group.contribution)}/{group.frequency === 'Weekly' ? 'wk' : 'mo'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#888' }}>Total Pool</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: group.color }}>
                      {formatNaira(group.totalPool)}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#888' }}>Next Payout</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#ffd700' }}>
                      {group.nextPayout}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '14px' }}>
            Top Savers This Month
          </h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px', padding: '16px',
          }}>
            {leaderboard.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 8px', borderRadius: '10px',
                  background: entry.name === 'You' ? 'rgba(0, 212, 170, 0.08)' : 'transparent',
                  marginBottom: i < leaderboard.length - 1 ? '4px' : 0,
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: entry.rank === 1 ? 'rgba(255, 215, 0, 0.15)' :
                    entry.rank === 2 ? 'rgba(192, 192, 192, 0.15)' :
                    entry.rank === 3 ? 'rgba(205, 127, 50, 0.15)' :
                    'rgba(255, 255, 255, 0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700',
                  color: entry.rank === 1 ? '#ffd700' :
                    entry.rank === 2 ? '#c0c0c0' :
                    entry.rank === 3 ? '#cd7f32' : '#888',
                }}>
                  {entry.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '13px', fontWeight: entry.name === 'You' ? '600' : '500',
                    color: entry.name === 'You' ? '#00d4aa' : '#ddd',
                  }}>
                    {entry.name}
                  </p>
                  <p style={{ fontSize: '11px', color: '#888' }}>
                    {entry.streak} day streak
                  </p>
                </div>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#ddd' }}>
                  {formatNaira(entry.saved)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
