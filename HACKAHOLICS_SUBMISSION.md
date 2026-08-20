# Hackaholics 7.0 — Submission Document

## Project: MicroSave

---

## 1. Executive Summary

**Project Name:** MicroSave
**Track:** Hackathon Track (Core Product Integration)
**Vertical:** Financial Inclusion / Digital Transformation
**Team:** 4 Members

**Value Proposition:**
MicroSave is a frictionless, automated micro-savings infrastructure that rounds up everyday transactional "spare change" to the nearest designated threshold — driving retail deposit growth without user friction. We are building a B2B2C plug-in that integrates directly into existing banking apps like ALAT by Wema Bank.

**Tagline:** *"Frictionless Wealth Generation — Save without feeling it."*
https://microsave-ecd8.onrender.com
---

## 2. Problem Statement

Nigerians face three critical savings challenges:

1. **Psychological Barrier:** Traditional saving requires active discipline — moving large, visible blocks of money during high inflation feels punishing.
2. **Failed Transactions:** Existing apps rely on fixed daily/weekly deductions that fail when accounts run low, causing penalty fees and user frustration.
3. **Inflation Erosion:** ₦100,000 saved today loses ~₦5,800 in purchasing power annually at current inflation rates (5.8%), yet most Nigerians have no access to inflation-protected savings.

**The Gap:** There is no seamless, invisible savings mechanism that works with the natural flow of daily transactions.

---

## 3. The Solution

MicroSave captures unnoticeable fragments of daily spending through an automated round-up mechanism:

### Core Mechanism
- **The Trigger:** User links their primary transactional bank account via Open Banking API
- **The Calculation:** Every time a transaction leaves a fractional balance, the system automatically rounds it down based on user-defined parameters (Nearest ₦10, ₦50, ₦100, ₦500, or ₦1,000)
- **The Savings:** The difference is instantly transferred to a micro-savings wallet

### Example
| Transaction | Balance | Threshold | Saved | Remaining |
|-------------|---------|-----------|-------|-----------|
| Transfer ₦3,500 | ₦6,420 | ₦100 | ₦20 | ₦6,400 |
| Transfer ₦15,000 | ₦8,756 | ₦500 | ₦256 | ₦8,500 |
| Transfer ₦45,000 | ₦52,340 | ₦1,000 | ₦340 | ₦52,000 |

### AI Smart Nudge (Dynamic Threshold)
When the algorithm detects repeated high-value inflows (e.g., salary increase), it securely prompts the user to upscale their round-up threshold. This is **AI-driven adaptive savings** — the system grows with the user's income.

### Savings Lock (Premium Tier)
Users can lock accumulated savings for fixed periods to earn higher interest rates:
| Tier | Duration | Interest Rate | Early Break Fee |
|------|----------|--------------|-----------------|
| Flex Save | No lock | 5% p.a. | 0% |
| 30-Day Lock | 30 days | 8% p.a. | 1.5% |
| 90-Day Lock | 90 days | 12% p.a. | 2% |
| 180-Day Lock | 180 days | 15% p.a. | 3% |
| 1-Year Lock | 365 days | 20% p.a. | 5% |

---

## 4. Why MicroSave for Wema Bank (ALAT)

**We are NOT building a competing bank.** We are building infrastructure that plugs into ALAT.

### The B2B2C Model
```
[User's ALAT Account] 
    → [MicroSave SDK/API Layer]
    → [Round-Up Engine + AI Nudge]
    → [Savings Wallet (within ALAT)]
    → [Pooled Investment (T-Bills, Bonds)]
```

### Value to Wema Bank
1. **Increased Deposit Liabilities:** Every transaction generates micro-deposits. At scale, millions of ₦42 and ₦62 fragments accumulate into billions in pooled savings.
2. **Revenue from Net Interest Margin:** Pooled savings are invested in Treasury Bills (12-15% yield). Wema Bank earns the spread between T-Bill returns and user interest payouts.
3. **Customer Retention:** Gamified savings (streaks, challenges, leaderboards) increase app engagement and reduce churn.
4. **Competitive Edge:** First-mover advantage in invisible, AI-driven micro-savings within Nigerian digital banking.

---

## 5. Revenue Model

| Stream | Description | Estimated Revenue |
|--------|-------------|-------------------|
| Net Interest Margin (NIM) | Pool user savings, invest in T-Bills at 12-15%, pay users 5-8% | Primary revenue |
| Interchange Fees | Fractional fees on linked card transactions | Secondary |
| Premium Lock Tiers | Breaking fees on early withdrawal | Tertiary |
| API Licensing | License SDK to other banks and fintechs | Scaling revenue |

**Conservative Projection:** With 100,000 users saving an average of ₦500/day:
- Monthly pooled savings: ₦1.5 Billion
- Annual T-Bill yield at 12%: ₦180 Million
- User interest at 5%: ₦75 Million
- **Net revenue: ₦105 Million/year**

---

## 6. Technical Architecture

### Stack
- **Frontend:** React + Vite (Mobile-responsive Web App)
- **Backend:** Node.js WebSocket server (real-time sync)
- **Database:** In-memory (hackathon MVP) → PostgreSQL (production)
- **API:** RESTful endpoints for banking partner integration
- **Open Banking:** CBN-compliant API framework

### API Endpoints (Live Demo)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | SDK health check |
| GET | `/api/v1/users` | List registered users |
| GET | `/api/v1/stats` | Platform statistics |
| GET | `/api/v1/roundup/config` | Round-up configuration |
| GET | `/api/v1/lock/tiers` | Lock tier definitions |

### SDK Integration (Plug-and-Play)
```html
<!-- One-line integration for banking partners -->
<script src="https://sdk.microsave.io/v1/microsave.min.js"></script>
<script>
  MicroSave.init({
    bankId: 'alat',
    userId: '{user_id}',
    threshold: 100,
    aiNudge: true,
    salaryDetection: true,
    onRoundUp: (amount) => console.log('Saved:', amount)
  });
</script>
```

---

## 7. Hackathon-Worthy Features

| Feature | Why It Matters |
|---------|---------------|
| **Gamified Challenges** | 7-Day Streak, Round-Up Master, ₦50K Sprint — drives engagement |
| **Community Savings (Digital AJO)** | Cultural resonance — group savings with leaderboard |
| **AI Smart Nudges** | Spending analysis, inflation protection alerts, salary detection |
| **Inflation Monitor** | Shows purchasing power loss, positions savings as hedge |
| **Savings Lock Tiers** | Premium revenue model + user commitment |
| **Real-Time Multi-Tab** | WebSocket-powered live transfers between users |
| **Open Banking Ready** | CBN-compliant architecture for bank integration |

---

## 8. Target Audience

| Segment | Why |
|---------|-----|
| **Gen Z & Millennials** | High-frequency digital transactors, savings gap |
| **Gig Workers & Daily Earners** | Irregular income, benefit from automatic saving |
| **Market Traders** | Multiple daily POS/transfer transactions |
| **Salary Earners** | Salary detection auto-scales savings |

---

## 9. Demo Instructions

### Running Locally
```bash
cd microsave
node server.js &          # WebSocket server on port 8080
./node_modules/.bin/vite  # React app on port 5173
```

### Testing Multi-User
1. Open `http://localhost:5173` in Tab 1 → Sign up
2. Open `http://localhost:5173` in Tab 2 → Sign up with different email
3. Transfer between accounts → Both tabs update in real-time
4. Try Save → Round-down feature works instantly
5. Try Lock → Choose tier, lock savings for interest

### Testing API
```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/v1/stats
curl http://localhost:8080/api/v1/lock/tiers
```

---

## 10. Roadmap

| Phase | Timeline | Milestone |
|-------|----------|-----------|
| MVP | Hackathon | Working demo with round-up, transfer, lock |
| Pilot | Month 1-3 | ALAT integration prototype, 1,000 beta users |
| Scale | Month 4-6 | Open Banking API launch, 50,000 users |
| Expand | Month 7-12 | Multi-bank SDK, 500,000 users, T-Bill investment |

---

## 11. Team

| Role | Responsibility |
|------|---------------|
| Product Lead | Vision, pitch, user research |
| Backend Developer | WebSocket server, API, Open Banking |
| Frontend Developer | React app, UI/UX, mobile optimization |
| Business/Finance | Monetization, regulatory, partnerships |

---

## 12. The Ask

We are seeking:
1. **₦20-25 Million Grand Prize** to fund pilot development
2. **Wema Bank Partnership** for ALAT integration pilot
3. **Open Banking API Access** via Wema Bank's developer portal
4. **Mentorship** from Wema Bank's digital banking team

**Our Commitment:** Within 90 days of funding, we will deliver a production-ready ALAT plug-in that increases Wema Bank's retail deposit liabilities through invisible, AI-driven micro-savings.

---

*Built with ❤️ for Hackaholics 7.0 by Wema Bank*
*MicroSave — Frictionless Wealth Generation*
