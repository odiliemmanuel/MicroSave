import { WebSocketServer } from 'ws'
import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'

const users = new Map()
let accountCounter = 2000000000

function generateAccountNumber() {
  accountCounter++
  return accountCounter.toString().padStart(10, '0')
}

function broadcast(clients, message) {
  const data = JSON.stringify(message)
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data)
    }
  })
}

function broadcastUsers(clients) {
  const userList = []
  users.forEach((user) => {
    userList.push({
      accountNumber: user.accountNumber,
      name: user.name,
      balance: user.balance,
      savings: user.savings,
      lockedSavings: user.lockedSavings,
      roundUpThreshold: user.roundUpThreshold,
      connectedBank: user.connectedBank,
    })
  })
  broadcast(clients, { type: 'users_update', users: userList })
}

function detectSalaryIncrease(user, amount) {
  const LARGE_INFLOWS = [50000, 100000, 150000, 200000, 250000, 300000, 500000]
  return LARGE_INFLOWS.some(threshold => amount >= threshold)
}

function calculateRoundDown(balance, threshold) {
  if (!threshold || threshold <= 0) return 0
  const remainder = balance % threshold
  return remainder === 0 ? 0 : remainder
}

function applyAutoSave(user) {
  const savingsAmount = calculateRoundDown(user.balance, user.roundUpThreshold)
  if (savingsAmount > 0 && user.balance > savingsAmount) {
    user.balance -= savingsAmount
    user.savings += savingsAmount

    const tx = {
      id: Date.now() + Math.random(),
      type: 'auto_save',
      amount: savingsAmount,
      threshold: user.roundUpThreshold,
      timestamp: new Date().toISOString(),
    }
    user.transactions.unshift(tx)

    return { saved: savingsAmount, transaction: tx, user }
  }
  return { saved: 0, user }
}

function getUserPayload(user) {
  return {
    accountNumber: user.accountNumber,
    name: user.name,
    balance: user.balance,
    savings: user.savings,
    lockedSavings: user.lockedSavings,
    lockTier: user.lockTier,
    lockExpiry: user.lockExpiry,
    roundUpThreshold: user.roundUpThreshold,
    savingsPeriod: user.savingsPeriod || 'flex',
    connectedBank: user.connectedBank,
    transactions: user.transactions,
  }
}

// SSL support - place cert.pem and key.pem in project root for HTTPS/WSS
let server
const certPath = './cert.pem'
const keyPath = './key.pem'

if (existsSync(certPath) && existsSync(keyPath)) {
  const https = await import('https')
  server = https.createServer({
    cert: readFileSync(certPath),
    key: readFileSync(keyPath),
  })
  console.log('SSL enabled')
} else {
  server = createServer()
  console.log('No SSL certs found — running on HTTP/WS only')
}

server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  // Mock API endpoints for Hackaholics demo
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', version: '1.0.0', name: 'MicroSave SDK' }))
    return
  }

  if (req.url === '/api/v1/users' && req.method === 'GET') {
    const userList = []
    users.forEach((user) => {
      userList.push({
        accountNumber: user.accountNumber,
        name: user.name,
        balance: user.balance,
        savings: user.savings,
      })
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ users: userList, count: userList.length }))
    return
  }

  if (req.url === '/api/v1/stats' && req.method === 'GET') {
    let totalSavings = 0
    let totalUsers = 0
    users.forEach((user) => {
      totalSavings += user.savings + user.lockedSavings
      totalUsers++
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      totalUsers,
      totalSavings,
      averageSavingsPerUser: totalUsers > 0 ? Math.round(totalSavings / totalUsers) : 0,
      estimatedAnnualYield: Math.round(totalSavings * 0.12),
      depositGrowthRate: '15.3%',
    }))
    return
  }

  if (req.url === '/api/v1/roundup/config' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      supportedThresholds: [10, 50, 100, 500, 1000],
      defaultThreshold: 100,
      aiNudgeEnabled: true,
      salaryDetectionEnabled: true,
      maxRoundUpPerTransaction: 5000,
    }))
    return
  }

  if (req.url === '/api/v1/lock/tiers' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      tiers: [
        { id: 'flex', name: 'Flex Save', minDays: 0, maxDays: 30, interestRate: 5, breakingFee: 0 },
        { id: '30day', name: '30-Day Lock', minDays: 30, maxDays: 30, interestRate: 8, breakingFee: 1.5 },
        { id: '90day', name: '90-Day Lock', minDays: 90, maxDays: 90, interestRate: 12, breakingFee: 2 },
        { id: '180day', name: '180-Day Lock', minDays: 180, maxDays: 180, interestRate: 15, breakingFee: 3 },
        { id: '365day', name: '1-Year Lock', minDays: 365, maxDays: 365, interestRate: 20, breakingFee: 5 },
      ],
    }))
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())

      if (msg.type === 'signup') {
        let exists = false
        users.forEach((user) => {
          if (user.email === msg.email) exists = true
        })
        if (exists) {
          ws.send(JSON.stringify({ type: 'error', message: 'Email already registered' }))
          return
        }

        const accNum = generateAccountNumber()
        const user = {
          accountNumber: accNum,
          name: msg.name,
          email: msg.email,
          balance: 10000,
          savings: 0,
          lockedSavings: 0,
          lockTier: null,
          lockExpiry: null,
          roundUpThreshold: 100,
          savingsPeriod: 'flex',
          pin: '1234',
          connectedBank: null,
          transactions: [],
          inflowHistory: [],
          nudgeHistory: [],
          contacts: [],
        }
        users.set(accNum, user)
        ws.accountNumber = accNum

        ws.send(JSON.stringify({
          type: 'signup_success',
          user: {
            accountNumber: user.accountNumber,
            name: user.name,
            email: user.email,
            balance: user.balance,
            savings: user.savings,
            lockedSavings: user.lockedSavings,
            lockTier: user.lockTier,
            lockExpiry: user.lockExpiry,
            roundUpThreshold: user.roundUpThreshold,
            savingsPeriod: user.savingsPeriod,
            connectedBank: user.connectedBank,
            transactions: user.transactions,
          },
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'signin') {
        let foundUser = null
        users.forEach((user) => {
          if (user.email === msg.email) foundUser = user
        })
        if (!foundUser) {
          ws.send(JSON.stringify({ type: 'error', message: 'No account found with this email' }))
          return
        }

        ws.accountNumber = foundUser.accountNumber

        ws.send(JSON.stringify({
          type: 'signup_success',
          user: getUserPayload(foundUser),
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'connect_bank') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }

        user.connectedBank = msg.bankName || 'ALAT by Wema'

        ws.send(JSON.stringify({
          type: 'bank_connected',
          user: { accountNumber: user.accountNumber, name: user.name, balance: user.balance, savings: user.savings, lockedSavings: user.lockedSavings, roundUpThreshold: user.roundUpThreshold, connectedBank: user.connectedBank, transactions: user.transactions },
          bankName: user.connectedBank,
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'transfer') {
        const sender = users.get(msg.from)
        const receiver = users.get(msg.to)

        if (!sender) {
          ws.send(JSON.stringify({ type: 'error', message: 'Sender account not found' }))
          return
        }
        if (!receiver) {
          ws.send(JSON.stringify({ type: 'error', message: 'Recipient account not found' }))
          return
        }
        if (sender.pin !== msg.pin) {
          ws.send(JSON.stringify({ type: 'pin_error', message: 'Incorrect PIN' }))
          return
        }
        if (sender.accountNumber === receiver.accountNumber) {
          ws.send(JSON.stringify({ type: 'error', message: 'Cannot transfer to yourself' }))
          return
        }
        if (sender.balance < msg.amount) {
          ws.send(JSON.stringify({ type: 'error', message: 'Insufficient balance' }))
          return
        }

        sender.balance -= msg.amount
        receiver.balance += msg.amount

        // Record inflow for salary detection
        receiver.inflowHistory.push({ amount: msg.amount, timestamp: new Date().toISOString() })

        const txOut = {
          id: Date.now(),
          type: 'transfer_out',
          amount: msg.amount,
          to: receiver.accountNumber,
          toName: receiver.name,
          timestamp: new Date().toISOString(),
        }
        sender.transactions.unshift(txOut)

        const txIn = {
          id: Date.now(),
          type: 'transfer_in',
          amount: msg.amount,
          from: sender.accountNumber,
          fromName: sender.name,
          timestamp: new Date().toISOString(),
        }
        receiver.transactions.unshift(txIn)

        // Track contacts
        if (!sender.contacts.includes(receiver.accountNumber)) {
          sender.contacts.push(receiver.accountNumber)
        }
        if (!receiver.contacts.includes(sender.accountNumber)) {
          receiver.contacts.push(sender.accountNumber)
        }

        // Auto round-down savings for sender
        const senderAutoSave = applyAutoSave(sender)
        if (senderAutoSave.saved > 0) {
          sender.transactions.unshift(senderAutoSave.transaction)
        }

        ws.send(JSON.stringify({
          type: 'transfer_success',
          user: getUserPayload(sender),
          transaction: txOut,
        }))

        // Notify sender of auto-save
        if (senderAutoSave.saved > 0) {
          ws.send(JSON.stringify({
            type: 'auto_save',
            amount: senderAutoSave.saved,
            balance: sender.balance,
            savings: sender.savings,
            message: `₦${senderAutoSave.saved.toLocaleString()} spare change saved automatically (nearest ₦${sender.roundUpThreshold.toLocaleString()})`,
          }))
        }

        wss.clients.forEach((client) => {
          if (client.accountNumber === receiver.accountNumber && client.readyState === 1) {
            client.send(JSON.stringify({
              type: 'transfer_received',
              user: getUserPayload(receiver),
              transaction: txIn,
            }))

            // Salary detection nudge
            if (detectSalaryIncrease(receiver, msg.amount)) {
              const recentLargeInflows = receiver.inflowHistory.filter(
                (i) => i.amount >= msg.amount * 0.8 && new Date(i.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              )
              if (recentLargeInflows.length >= 2) {
                const suggestedThreshold = Math.min(msg.amount / 10, 5000)
                client.send(JSON.stringify({
                  type: 'salary_nudge',
                  message: `We noticed a repeated large inflow of ~₦${msg.amount.toLocaleString()}. Consider increasing your round-up threshold to ₦${suggestedThreshold.toLocaleString()} to save more automatically.`,
                  suggestedThreshold,
                  currentThreshold: receiver.roundUpThreshold,
                  detectedAmount: msg.amount,
                }))
              }
            }
          }
        })

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'withdraw') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }
        if (user.balance < msg.amount) {
          ws.send(JSON.stringify({ type: 'error', message: 'Insufficient balance' }))
          return
        }

        user.balance -= msg.amount

        const tx = {
          id: Date.now(),
          type: 'withdrawal',
          amount: msg.amount,
          timestamp: new Date().toISOString(),
        }
        user.transactions.unshift(tx)

        // Auto round-down savings after withdrawal
        const autoSave = applyAutoSave(user)
        if (autoSave.saved > 0) {
          user.transactions.unshift(autoSave.transaction)
        }

        ws.send(JSON.stringify({
          type: 'withdraw_success',
          user: getUserPayload(user),
          transaction: tx,
        }))

        // Notify of auto-save
        if (autoSave.saved > 0) {
          ws.send(JSON.stringify({
            type: 'auto_save',
            amount: autoSave.saved,
            balance: user.balance,
            savings: user.savings,
            message: `₦${autoSave.saved.toLocaleString()} spare change saved automatically (nearest ₦${user.roundUpThreshold.toLocaleString()})`,
          }))
        }

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'save') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }
        if (user.balance < msg.amount) {
          ws.send(JSON.stringify({ type: 'error', message: 'Insufficient balance' }))
          return
        }

        user.balance -= msg.amount
        user.savings += msg.amount

        const tx = {
          id: Date.now(),
          type: 'savings',
          amount: msg.amount,
          timestamp: new Date().toISOString(),
        }
        user.transactions.unshift(tx)

        ws.send(JSON.stringify({
          type: 'save_success',
          user: { accountNumber: user.accountNumber, name: user.name, balance: user.balance, savings: user.savings, lockedSavings: user.lockedSavings, roundUpThreshold: user.roundUpThreshold, connectedBank: user.connectedBank, transactions: user.transactions },
          transaction: tx,
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'lock_savings') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }
        if (user.savings < msg.amount) {
          ws.send(JSON.stringify({ type: 'error', message: 'Insufficient savings to lock' }))
          return
        }

        const TIER_CONFIG = {
          flex: { days: 0, rate: 5, fee: 0 },
          '30day': { days: 30, rate: 8, fee: 1.5 },
          '90day': { days: 90, rate: 12, fee: 2 },
          '180day': { days: 180, rate: 15, fee: 3 },
          '365day': { days: 365, rate: 20, fee: 5 },
        }

        const tier = TIER_CONFIG[msg.tier] || TIER_CONFIG.flex

        user.savings -= msg.amount
        user.lockedSavings += msg.amount
        user.lockTier = msg.tier
        user.lockExpiry = new Date(Date.now() + tier.days * 24 * 60 * 60 * 1000).toISOString()

        const tx = {
          id: Date.now(),
          type: 'lock',
          amount: msg.amount,
          tier: msg.tier,
          expiry: user.lockExpiry,
          interestRate: tier.rate,
          timestamp: new Date().toISOString(),
        }
        user.transactions.unshift(tx)

        ws.send(JSON.stringify({
          type: 'lock_success',
          user: { accountNumber: user.accountNumber, name: user.name, balance: user.balance, savings: user.savings, lockedSavings: user.lockedSavings, lockTier: user.lockTier, lockExpiry: user.lockExpiry, roundUpThreshold: user.roundUpThreshold, connectedBank: user.connectedBank, transactions: user.transactions },
          transaction: tx,
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'unlock_savings') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }
        if (user.lockedSavings < msg.amount) {
          ws.send(JSON.stringify({ type: 'error', message: 'Insufficient locked savings' }))
          return
        }

        const now = new Date()
        const expiry = new Date(user.lockExpiry)
        const isEarly = now < expiry

        let breakingFee = 0
        if (isEarly) {
          const TIER_FEES = { flex: 0, '30day': 1.5, '90day': 2, '180day': 3, '365day': 5 }
          breakingFee = msg.amount * ((TIER_FEES[user.lockTier] || 0) / 100)
        }

        user.lockedSavings -= msg.amount
        user.savings += (msg.amount - breakingFee)

        if (user.lockedSavings === 0) {
          user.lockTier = null
          user.lockExpiry = null
        }

        const tx = {
          id: Date.now(),
          type: 'unlock',
          amount: msg.amount,
          breakingFee: Math.round(breakingFee),
          netAmount: Math.round(msg.amount - breakingFee),
          timestamp: new Date().toISOString(),
        }
        user.transactions.unshift(tx)

        ws.send(JSON.stringify({
          type: 'unlock_success',
          user: { accountNumber: user.accountNumber, name: user.name, balance: user.balance, savings: user.savings, lockedSavings: user.lockedSavings, lockTier: user.lockTier, lockExpiry: user.lockExpiry, roundUpThreshold: user.roundUpThreshold, connectedBank: user.connectedBank, transactions: user.transactions },
          transaction: tx,
          breakingFee: Math.round(breakingFee),
          isEarly,
        }))

        broadcastUsers(wss.clients)
      }

      if (msg.type === 'set_pin') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }
        if (msg.oldPin && user.pin !== msg.oldPin) {
          ws.send(JSON.stringify({ type: 'pin_error', message: 'Current PIN is incorrect' }))
          return
        }
        user.pin = msg.newPin
        ws.send(JSON.stringify({ type: 'pin_success', message: 'PIN updated successfully' }))
      }

      if (msg.type === 'update_threshold') {
        const user = users.get(msg.accountNumber)
        if (!user) {
          ws.send(JSON.stringify({ type: 'error', message: 'Account not found' }))
          return
        }

        user.roundUpThreshold = msg.threshold
        if (msg.period) user.savingsPeriod = msg.period

        ws.send(JSON.stringify({
          type: 'threshold_updated',
          user: { accountNumber: user.accountNumber, name: user.name, balance: user.balance, savings: user.savings, lockedSavings: user.lockedSavings, roundUpThreshold: user.roundUpThreshold, savingsPeriod: user.savingsPeriod, connectedBank: user.connectedBank, transactions: user.transactions },
        }))

        broadcastUsers(wss.clients)
      }

    } catch (err) {
      console.error('Message parse error:', err)
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 MicroSave Server running`)
  console.log(`   Port:     ${PORT}`)
  console.log(`   REST API: http://localhost:${PORT}/api/health`)
  console.log(`   Stats:    http://localhost:${PORT}/api/v1/stats`)
  console.log(`   Users:    http://localhost:${PORT}/api/v1/users\n`)
})
