import { useState, useEffect } from 'react'
import {
  Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft, PiggyBank,
  TrendingUp, Zap, Target, Users, Award, Bell, ChevronRight,
  Send, Check, Lock, Unlock, Settings, Link2,
  Building2, Shield, BarChart3, Globe, LogOut
} from 'lucide-react'
import { formatNaira, timeAgo } from '../utils/helpers'
import TransferModal from './TransferModal'
import SaveModal from './SaveModal'
import LockModal from './LockModal'
import OpenBankingConnect from './OpenBankingConnect'
import ApiDemo from './ApiDemo'
import NotificationToast from './NotificationToast'
import SavingsChallenges from './SavingsChallenges'
import CommunitySavings from './CommunitySavings'
import AiNudges from './AiNudges'

export default function Dashboard({ user, allUsers, onTransfer, onSave, onLock, onUnlock, onConnectBank, onUpdateThreshold, onSignOut, connected, autoSaveNotif }) {
  const [showBalance, setShowBalance] = useState(true)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showLock, setShowLock] = useState(false)
  const [showConnectBank, setShowConnectBank] = useState(false)
  const [showApiDemo, setShowApiDemo] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000)
  }

  const copyAccount = () => {
    navigator.clipboard.writeText(user.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [showAllUsers, setShowAllUsers] = useState(false)
  const contactedUsers = allUsers.filter(u => user.contacts && user.contacts.includes(u.accountNumber))

  const txList = user.transactions && user.transactions.length > 0 ? user.transactions : [
    { id: 1, type: 'transfer_in', amount: 5000, fromName: 'Welcome Bonus', timestamp: new Date().toISOString() },
    { id: 2, type: 'savings', amount: 250, timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, type: 'transfer_out', amount: 1500, toName: 'Bank Transfer', timestamp: new Date(Date.now() - 7200000).toISOString() },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a1a' }}>
      <NotificationToast notifications={notifications} />

      {/* Auto-Save Pop-up Notification */}
      {autoSaveNotif && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, animation: 'slideInUp 0.4s ease-out',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 20px', borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.15), rgba(0, 168, 130, 0.1))',
            border: '1px solid rgba(0, 212, 170, 0.3)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0, 212, 170, 0.2)',
            minWidth: '320px',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #00d4aa, #00a882)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 1s ease-in-out',
            }}>
              <PiggyBank size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: '10px', color: '#00d4aa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Auto-Saved
              </p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                {autoSaveNotif.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {showTransfer && (
        <TransferModal
          users={allUsers.filter(u => u.accountNumber !== user.accountNumber)}
          currentUser={user}
          onTransfer={(to, amount) => {
            onTransfer(to, amount)
            setShowTransfer(false)
            addNotification(`Transferred ${formatNaira(amount)} successfully!`, 'success')
          }}
          onClose={() => setShowTransfer(false)}
        />
      )}

      {showSave && (
        <SaveModal
          balance={user.balance}
          threshold={user.roundUpThreshold}
          onSave={(amount) => {
            onSave(amount)
            setShowSave(false)
            addNotification(`Saved ${formatNaira(amount)} to your savings!`, 'success')
          }}
          onUpdateThreshold={onUpdateThreshold}
          onClose={() => setShowSave(false)}
        />
      )}

      {showLock && (
        <LockModal
          savings={user.savings}
          lockedSavings={user.lockedSavings}
          lockTier={user.lockTier}
          lockExpiry={user.lockExpiry}
          onLock={(amount, tier) => {
            onLock(amount, tier)
            setShowLock(false)
            addNotification(`Locked ${formatNaira(amount)} in ${tier} savings!`, 'success')
          }}
          onUnlock={(amount) => {
            onUnlock(amount)
            setShowLock(false)
            addNotification(`Unlocked savings successfully!`, 'success')
          }}
          onClose={() => setShowLock(false)}
        />
      )}

      {showConnectBank && (
        <OpenBankingConnect
          connectedBank={user.connectedBank}
          onConnect={(bankName) => {
            onConnectBank(bankName)
            setShowConnectBank(false)
            addNotification(`Connected to ${bankName}!`, 'success')
          }}
          onClose={() => setShowConnectBank(false)}
        />
      )}

      {showApiDemo && (
        <ApiDemo onClose={() => setShowApiDemo(false)} />
      )}

      {/* Sidebar */}
      <aside className="desktop-sidebar" style={{
        width: '240px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', padding: '0 8px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00d4aa, #00a882)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PiggyBank size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>MicroSave</span>
        </div>
        <p style={{ fontSize: '10px', color: '#555', padding: '0 8px', marginBottom: '24px', lineHeight: 1.4 }}>
          Frictionless Wealth Generation Infrastructure
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {[
            { id: 'overview', icon: <TrendingUp size={18} />, label: 'Overview' },
            { id: 'challenges', icon: <Target size={18} />, label: 'Challenges' },
            { id: 'community', icon: <Users size={18} />, label: 'Community' },
            { id: 'ai', icon: <Zap size={18} />, label: 'AI Insights' },
            { id: 'api', icon: <Globe size={18} />, label: 'API / SDK' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => item.id === 'api' ? setShowApiDemo(true) : setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', border: 'none',
                background: activeTab === item.id ? 'rgba(0, 212, 170, 0.1)' : 'transparent',
                color: activeTab === item.id ? '#00d4aa' : '#888',
                fontSize: '14px', fontWeight: activeTab === item.id ? '600' : '400',
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{
          padding: '16px', borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(0, 168, 130, 0.05))',
          border: '1px solid rgba(0, 212, 170, 0.15)',
        }}>
          <Award size={20} color="#00d4aa" style={{ marginBottom: '8px' }} />
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#00d4aa', marginBottom: '4px' }}>Savings Streak</p>
          <p style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>7 days</p>
          <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Keep it going!</p>
        </div>

        <button
          onClick={onSignOut}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '10px', border: 'none', marginTop: '16px',
            background: 'transparent', color: '#ff6464',
            fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
            textAlign: 'left', width: '100%',
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '28px',
        }}>
          <div>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'} 👋
            </p>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{user.name}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Open Banking status */}
            <button
              onClick={() => setShowConnectBank(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '10px',
                background: user.connectedBank ? 'rgba(0, 212, 170, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${user.connectedBank ? 'rgba(0, 212, 170, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
                color: user.connectedBank ? '#00d4aa' : '#888',
                fontSize: '12px', fontWeight: '500', cursor: 'pointer',
              }}
            >
              {user.connectedBank ? <Link2 size={14} /> : <Building2 size={14} />}
              {user.connectedBank || 'Connect Bank'}
            </button>

            {/* API demo button */}
            <button
              onClick={() => setShowApiDemo(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                color: '#a855f7',
                fontSize: '12px', fontWeight: '500', cursor: 'pointer',
              }}
            >
              <Globe size={14} />
              API
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '8px',
              background: connected ? 'rgba(0, 212, 170, 0.1)' : 'rgba(255, 100, 100, 0.1)',
              fontSize: '12px', color: connected ? '#00d4aa' : '#ff6464',
            }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: connected ? '#00d4aa' : '#ff6464',
              }} />
              {connected ? 'Live' : 'Offline'}
            </div>

            <button
              onClick={onSignOut}
              style={{
                background: 'rgba(255, 100, 100, 0.1)', border: '1px solid rgba(255, 100, 100, 0.2)',
                borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#ff6464',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            {/* Balance Card */}
            <div className="balance-card" style={{
              background: 'linear-gradient(135deg, #1a2a4a, #0f1f3a)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px 32px',
              marginBottom: '24px',
            }}>
              <div className="balance-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Main Wallet Balance</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 className="balance-amount" style={{
                      fontSize: '36px', fontWeight: '800', color: '#fff',
                      filter: showBalance ? 'none' : 'blur(8px)',
                      transition: 'filter 0.3s',
                    }}>
                      {formatNaira(user.balance)}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)', border: 'none',
                        borderRadius: '8px', padding: '8px', cursor: 'pointer',
                        color: '#aaa', display: 'flex',
                      }}
                    >
                      {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Account Number</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '16px', fontWeight: '600', color: '#00d4aa',
                      fontFamily: 'monospace', letterSpacing: '1px',
                    }}>
                      {user.accountNumber}
                    </span>
                    <button
                      onClick={copyAccount}
                      style={{
                        background: 'rgba(0, 212, 170, 0.1)', border: 'none',
                        borderRadius: '6px', padding: '6px', cursor: 'pointer',
                        color: '#00d4aa', display: 'flex',
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Savings + Locked + Threshold row */}
              <div className="savings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(0, 212, 170, 0.06)',
                  border: '1px solid rgba(0, 212, 170, 0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <PiggyBank size={14} color="#00d4aa" />
                    <p style={{ fontSize: '11px', color: '#888' }}>Micro Savings</p>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#00d4aa' }}>
                    {showBalance ? formatNaira(user.savings) : '****'}
                  </p>
                </div>

                <div style={{
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.06)',
                  border: '1px solid rgba(168, 85, 247, 0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Lock size={14} color="#a855f7" />
                    <p style={{ fontSize: '11px', color: '#888' }}>Locked Savings</p>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#a855f7' }}>
                    {showBalance ? formatNaira(user.lockedSavings) : '****'}
                  </p>
                </div>

                <div style={{
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(74, 158, 255, 0.06)',
                  border: '1px solid rgba(74, 158, 255, 0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Settings size={14} color="#4a9eff" />
                    <p style={{ fontSize: '11px', color: '#888' }}>Round-Up</p>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#4a9eff' }}>
                    Nearest ₦{(user.roundUpThreshold || 100).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="action-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { icon: <Send size={20} />, label: 'Transfer', color: '#4a9eff', action: () => setShowTransfer(true) },
                { icon: <PiggyBank size={20} />, label: 'Save', color: '#00d4aa', action: () => setShowSave(true) },
                { icon: <Lock size={20} />, label: 'Lock', color: '#a855f7', action: () => setShowLock(true) },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px', padding: '18px 12px',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '8px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = item.color + '33'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: item.color + '15', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: item.color,
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#ddd' }}>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Recently Contacted */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px', padding: '20px', marginBottom: '28px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>
                    Recently Contacted ({contactedUsers.length})
                  </h3>
                  {contactedUsers.length > 4 && (
                    <button
                      onClick={() => setShowAllUsers(!showAllUsers)}
                      style={{
                        background: 'none', border: 'none', color: '#00d4aa',
                        fontSize: '13px', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', gap: '4px',
                      }}
                    >
                      {showAllUsers ? 'Show Less' : 'View All'}
                      <ChevronRight size={14} style={{ transform: showAllUsers ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                  )}
                </div>
                {contactedUsers.length === 0 ? (
                  <p style={{ fontSize: '13px', color: '#555', padding: '10px 0' }}>
                    No contacts yet. Make a transfer to start building your contacts.
                  </p>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {(showAllUsers ? contactedUsers : contactedUsers.slice(0, 4)).map(u => (
                        <div key={u.accountNumber} style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 14px', borderRadius: '12px',
                          background: 'rgba(0, 212, 170, 0.05)',
                          border: '1px solid rgba(0, 212, 170, 0.1)',
                        }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00d4aa, #00a882)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', fontWeight: '600', color: '#fff',
                          }}>
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#ddd' }}>{u.name}</p>
                            <p style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{u.accountNumber}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {!showAllUsers && contactedUsers.length > 4 && (
                      <p style={{ fontSize: '12px', color: '#555', marginTop: '10px' }}>
                        +{contactedUsers.length - 4} more
                      </p>
                    )}
                  </>
                )}
              </div>

            {/* Transactions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px', padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Recent Transactions</h3>
                <button style={{
                  background: 'none', border: 'none', color: '#00d4aa',
                  fontSize: '13px', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', gap: '4px',
                }}>
                  View All <ChevronRight size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {txList.slice(0, 6).map((tx, i) => (
                  <div key={tx.id || i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 8px', borderRadius: '10px',
                    transition: 'background 0.2s',
                  }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: tx.type === 'transfer_in' || tx.type === 'deposit'
                        ? 'rgba(0, 212, 170, 0.1)'
                        : tx.type === 'savings'
                        ? 'rgba(74, 158, 255, 0.1)'
                        : tx.type === 'lock'
                        ? 'rgba(168, 85, 247, 0.1)'
                        : tx.type === 'unlock'
                        ? 'rgba(255, 215, 0, 0.1)'
                        : 'rgba(255, 107, 107, 0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {tx.type === 'transfer_in' || tx.type === 'deposit' ? (
                        <ArrowDownLeft size={18} color="#00d4aa" />
                      ) : tx.type === 'savings' ? (
                        <PiggyBank size={18} color="#4a9eff" />
                      ) : tx.type === 'lock' ? (
                        <Lock size={18} color="#a855f7" />
                      ) : tx.type === 'unlock' ? (
                        <Unlock size={18} color="#ffd700" />
                      ) : (
                        <ArrowUpRight size={18} color="#ff6b6b" />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#ddd' }}>
                        {tx.type === 'transfer_in'
                          ? `From ${tx.fromName || 'Someone'}`
                          : tx.type === 'transfer_out'
                          ? `To ${tx.toName || 'Someone'}`
                          : tx.type === 'savings'
                          ? 'Micro Savings'
                          : tx.type === 'lock'
                          ? `Locked (${tx.tier})`
                          : tx.type === 'unlock'
                          ? 'Unlocked Savings'
                          : 'Withdrawal'}
                      </p>
                      <p style={{ fontSize: '12px', color: '#888' }}>{timeAgo(tx.timestamp)}</p>
                    </div>
                    <span style={{
                      fontSize: '14px', fontWeight: '600',
                      color: tx.type === 'transfer_in' || tx.type === 'deposit' ? '#00d4aa' : '#ff6b6b',
                    }}>
                      {tx.type === 'transfer_in' || tx.type === 'deposit' ? '+' : '-'}
                      {formatNaira(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && <SavingsChallenges user={user} onSave={onSave} />}
        {activeTab === 'community' && <CommunitySavings user={user} allUsers={allUsers} />}
        {activeTab === 'ai' && <AiNudges user={user} allUsers={allUsers} />}
      </main>
    </div>
  )
}
