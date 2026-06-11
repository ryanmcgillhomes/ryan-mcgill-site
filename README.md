# Ryan McGill — ryanmcgillrealtor.com
### 5 Points Realty · Charlotte, NC

Built by Lizard Marketing. Next.js + Vercel deployment.

---

## Stack
- **Framework:** Next.js 14
- **Host:** Vercel (deploy via GitHub push)
- **Forms:** Formspree
- **Fonts:** Cormorant Garamond + DM Sans (Google Fonts)
- **Images:** Vercel Image Optimization (auto WebP)

---

## Deployment
1. Push to GitHub `main` branch
2. Vercel auto-deploys in ~60 seconds
3. Live at ryanmcgillrealtor.com

---

## Site Map — 33 Pages

### Core
| Page | File | URL |
|---|---|---|
| Homepage | pages/index.jsx | / |
| About Ryan | pages/about.jsx | /about |
| Buy | pages/buy.jsx | /buy |
| Sell | pages/sell.jsx | /sell |
| Buyer's Guide | pages/buyers-guide.jsx | /buyers-guide |
| Seller's Guide | pages/sellers-guide.jsx | /sellers-guide |
| Market Reports | pages/market-reports.jsx | /market-reports |
| FAQ | pages/faq.jsx | /faq |

### Inner Charlotte Neighborhoods
| Page | File | URL |
|---|---|---|
| Plaza Midwood | pages/neighborhoods/plaza-midwood.jsx | /neighborhoods/plaza-midwood |
| NoDa | pages/neighborhoods/noda.jsx | /neighborhoods/noda |
| Dilworth | pages/neighborhoods/dilworth.jsx | /neighborhoods/dilworth |
| Myers Park | pages/neighborhoods/myers-park.jsx | /neighborhoods/myers-park |
| South End | pages/neighborhoods/south-end.jsx | /neighborhoods/south-end |
| Elizabeth | pages/neighborhoods/elizabeth.jsx | /neighborhoods/elizabeth |
| Cotswold | pages/neighborhoods/cotswold.jsx | /neighborhoods/cotswold |
| Uptown Charlotte | pages/neighborhoods/uptown-charlotte.jsx | /neighborhoods/uptown-charlotte |
| Eastover | pages/neighborhoods/eastover.jsx | /neighborhoods/eastover |
| Villa Heights | pages/neighborhoods/villa-heights.jsx | /neighborhoods/villa-heights |
| Chantilly | pages/neighborhoods/chantilly.jsx | /neighborhoods/chantilly |
| Ballantyne | pages/neighborhoods/ballantyne.jsx | /neighborhoods/ballantyne |

### Surrounding Cities
| Page | File | URL |
|---|---|---|
| Huntersville | pages/neighborhoods/huntersville.jsx | /neighborhoods/huntersville |
| Mooresville | pages/neighborhoods/mooresville.jsx | /neighborhoods/mooresville |
| Davidson | pages/neighborhoods/davidson.jsx | /neighborhoods/davidson |
| Cornelius | pages/neighborhoods/cornelius.jsx | /neighborhoods/cornelius |
| Matthews | pages/neighborhoods/matthews.jsx | /neighborhoods/matthews |
| Concord | pages/neighborhoods/concord.jsx | /neighborhoods/concord |
| Kannapolis | pages/neighborhoods/kannapolis.jsx | /neighborhoods/kannapolis |
| Rock Hill SC | pages/neighborhoods/rock-hill.jsx | /neighborhoods/rock-hill |
| Gastonia | pages/neighborhoods/gastonia.jsx | /neighborhoods/gastonia |
| Mint Hill | pages/neighborhoods/mint-hill.jsx | /neighborhoods/mint-hill |
| Pineville | pages/neighborhoods/pineville.jsx | /neighborhoods/pineville |

---

## Shared Components
| Component | File | Used On |
|---|---|---|
| Nav | components/Nav.jsx | All pages |
| Footer | components/Footer.jsx | All pages |
| Reveal | components/Reveal.jsx | All pages |

---

## Quarterly Market Data Update
**File:** `pages/market-reports.jsx`
**Section:** Top of file — `QUARTERLY UPDATE BLOCK`
**Source:** Canopy MLS → export to Excel → update values
**Fields per neighborhood:** Median Price · DOM · List/Sale Ratio · Inventory · YoY Change · Trend

Update 4x per year: January · April · July · October

---

## Forms
All forms submit via Formspree.
**Endpoint:** Set in `components/ContactForm.jsx` → `FORMSPREE_ENDPOINT`
Ryan receives an email for every submission with all field values.

---

## Contacts
- **Agent:** Ryan McGill · (704) 576-4118
- **Brokerage:** 5 Points Realty · 2200 The Plaza · Charlotte NC 28205
- **License:** NC Broker #359364
- **Built by:** Lizard Marketing
