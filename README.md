# MicroSave

**Frictionless Wealth Generation Infrastructure**

A B2B2C micro-saving plug-in that automatically rounds down transactions and saves spare change. Built as infrastructure for banks — not a competing app, but a layer that powers savings across any platform.

---

## What It Does

Every time a user makes a transfer, MicroSave automatically calculates the spare change (e.g., ₦4,850 → ₦5,000 = ₦150 saved) and moves it into a savings wallet. Users never feel the loss — but over time, it compounds.

## Features

- **Auto Round-Down Savings** — Spare change after every transfer is saved automatically
- **Configurable Threshold** — Round to nearest ₦10, ₦50, ₦100, ₦500, or ₦1,000
- **Savings Period Lock** — Flex, 30-Day, 90-Day, 6-Month, or 1-Year lock tiers with interest
- **4-Digit PIN Security** — Real banking-style PIN verification before every transfer
- **Balance Hide/Show** — OPay-style toggle to hide balances on-screen
- **Real-Time WebSocket Updates** — Instant balance and transaction updates across sessions
- **Open Banking Mock** — Simulated bank connection (ALAT, Kuda, GTBank, etc.)
- **AI Savings Nudges** — Smart prompts based on spending patterns and salary detection
- **Community Savings** — Group savings goals and排行榜
- **Savings Challenges** — Gamified streaks and milestones
- **REST API + SDK** — Live API endpoints for third-party integration
- **Session Persistence** — Login survives page refresh via localStorage
- **Mobile Responsive** — Optimized layout for phones and tablets

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Lucide Icons |
| Backend | Node.js, WebSocket (`ws`), HTTP REST API |
| Styling | Inline JSX (dark theme, no CSS framework) |
| Real-Time | WebSocket protocol for instant updates |
| Deploy | Vercel (frontend), Render (WebSocket server) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/odiliemmanuel/MicroSave.git
cd microsave
npm install
```

### Run Development

```bash
# Terminal 1 — WebSocket server
node server.js

# Terminal 2 — Vite dev server
npm run dev
```

Open `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output goes to `dist/`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/v1/users` | List all users |
| GET | `/api/v1/stats` | Platform statistics |
| GET | `/api/v1/roundup/config` | Round-up configuration |
| GET | `/api/v1/lock/tiers` | Available lock tiers |

## WebSocket Messages

| Type | Direction | Description |
|------|-----------|-------------|
| `signup` | Client → Server | Create new account |
| `signin` | Client → Server | Sign in with email |
| `transfer` | Client → Server | Send money (requires PIN) |
| `update_threshold` | Client → Server | Change round-down threshold + period |
| `connect_bank` | Client → Server | Connect a bank account |
| `lock_savings` | Client → Server | Lock savings for a tier |
| `unlock_savings` | Client → Server | Break savings lock |
| `auto_save` | Server → Client | Auto round-down triggered |
| `transfer_success` | Server → Client | Transfer completed |
| `pin_error` | Server → Client | Incorrect PIN |

## Default PIN

For demo purposes, every account is created with PIN: **1234**

## Project Structure

```
microsave/
├── server.js                  # WebSocket + REST API server
├── src/
│   ├── App.jsx                # Root component, WebSocket handler
│   ├── index.css              # Global styles + mobile responsive
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Signup.jsx         # Sign up / Sign in
│   │   ├── TransferModal.jsx  # Transfer with PIN verification
│   │   ├── SaveModal.jsx      # Auto savings config
│   │   ├── LockModal.jsx      # Savings lock tiers
│   │   ├── OpenBankingConnect.jsx
│   │   ├── ApiDemo.jsx        # Live API endpoint tester
│   │   ├── SavingsChallenges.jsx
│   │   ├── CommunitySavings.jsx
│   │   ├── AiNudges.jsx
│   │   └── NotificationToast.jsx
│   ├── hooks/
│   │   └── useWebSocket.js    # WebSocket client hook
│   └── utils/
│       └── helpers.js         # formatNaira, timeAgo, etc.
├── render.yaml                # Render deployment config
├── vite.config.js
└── HACKAHOLICS_SUBMISSION.md  # Pitch document
```

## License

MIT

---

Built for **Hackaholics 7.0** at Wema Bank.
