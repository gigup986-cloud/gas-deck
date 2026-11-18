# GAS DECK — PHASE 1 CUSTOMER WEBSITE

> **Phase 1 Status:** Completed &amp; Verified  
> **Target Market:** Nigeria (Port Harcourt / Alakahia / Choba Reference)  
> **Primary Authority:** `GAS_MARKETPLACE_VIDEO_ANALYSIS.md` &amp; 11-second Figma Prototype Video  
> **Brand Identity:** Gas Deck (Vibrant gradient flame glyph, modern typography, purple CTA styling)  

---

## 1. EXECUTIVE SUMMARY & PHASE 1 SCOPE

Gas Deck is an on-demand domestic Liquefied Petroleum Gas (LPG) ordering and delivery marketplace designed to eliminate the danger, time loss, and physical strain of transporting cooking gas cylinders to retail plants in Nigeria.

Phase 1 delivers the complete **Customer Website Experience**, faithfully preserving every element, label, preset, price calculation, and interaction demonstrated in the owner's video reference while strictly adhering to project boundaries.

---

## 2. SCREEN INVENTORY & FEATURE STATUS

| Screen / Feature | Description | Implementation Status | Evidence Source |
| :--- | :--- | :--- | :--- |
| **Public Landing Page** | Explains value proposition, 15–25 min SLA, 4-step ordering process, and instant LPG price estimator. | **Implemented &amp; Verified** | Client Brief |
| **Registration Screen** | Exact replica of video frame: "A warmer welcome. Create your account. We'll handle the gas.", Role Selector cards ("Order gas" vs "Sell gas"), Nigerian phone format (`+234`). | **Implemented &amp; Verified** | Video (00:06 – 00:11) |
| **Customer Dashboard** | Center frame from video: "Hi, Ezekiel 👋", Location "24 Blueberry, Alakahia", Hero Card "Running low? 15 - 25 min delivery time", Presets (`₦8,500`, `12 kg`, `Custom`), Total `₦20,000`, "Find my gas merchant" CTA. | **Implemented &amp; Verified** | Video (00:01 – 00:03) |
| **Reorder Card** | "Your last refill: 12.5 kg Full refill • 14 Oct • Son And Father Oil &amp; Gas • ₦18,500" with instant 1-click reorder. | **Implemented &amp; Verified** | Video (00:01 – 00:03) |
| **Location Input &amp; Discovery** | Address switcher with Port Harcourt / Alakahia neighborhoods, landmark instructions, and GPS satellite fix simulation. | **Implemented &amp; Verified** | Video &amp; Client Brief |
| **Nearby Vendor Listing** | Searchable directory of verified local LPG stations (Son And Father Oil &amp; Gas, Delight Flame, Pinnacle Gas, Rivers Premier) with distance, price/kg, and NMDPRA license. | **Implemented &amp; Verified** | Video &amp; Architecture |
| **Custom Order Modal** | Dual ordering selector supporting exact kilograms (3kg, 6kg, 12.5kg, 25kg, 50kg) or fixed Naira budgets (₦5k, ₦8.5k, ₦10k, ₦20k) + Refill vs Instant Tank Swap. | **Implemented &amp; Verified** | Client Brief |
| **Checkout Summary** | Itemized breakdown: Gas Content (₦18,500) + Delivery Fee (₦1,500) = Total (₦20,000). Doorstep delivery notes field. | **Implemented &amp; Verified** | Video (00:01 – 00:03) |
| **Payment Selection** | Clear selection between Online Payment (Paystack/Flutterwave sandbox simulator) and Pay-on-Delivery (Cash / POS upon doorstep cylinder delivery). | **Implemented &amp; Verified** | Video ("Paid online") &amp; Brief |
| **Order Confirmation &amp; Tracking** | Real-time tracking view for `#ORD-2048` with live stages, courier details (Godswill Tamuno, Tricycle PH-249-AB), and 4-digit handover PIN (`4829`). | **Implemented &amp; Verified** | Video (00:03 – 00:06) |
| **Order History &amp; Receipts** | Order history log with printable digital tax invoices and repeat order triggers. | **Implemented &amp; Verified** | Client Brief |
| **Safety Leak-Testing Guide** | Comprehensive guide on the mandatory free doorstep soapy water valve test, vertical storage, and tare weight calibration. | **Implemented &amp; Verified** | Nigerian Regulatory Standard |
| **Project Archive Exporter** | In-app one-click `.ZIP` archive generator bundling all source code and markdown documentation. | **Implemented &amp; Verified** | Client Deliverable Requirement |

---

## 3. IMPLEMENTED VS. SIMULATED FUNCTIONALITY

To maintain absolute fidelity and adhere to Phase 1 boundaries, live external payment and physical delivery operations are explicitly labeled:

### Fully Implemented in Code:
* Responsive UI with Tailwind CSS v4 and full mobile/tablet/desktop layouts.
* State management for users, active addresses, cart configuration, and order lifecycle via React Context with `localStorage` persistence.
* Dynamic Nigerian Naira pricing engine matching the video's ₦1,480/kg rate and ₦1,500 delivery fee.
* Full client-side `.ZIP` source code bundler (`jszip`) allowing reviewers to export the complete repository archive with one click.
* Filterable Requirements Traceability Matrix and Screen Inspector.

### Simulated / Sandbox Integrations (Clearly Labeled):
* **Payment Gateway:** Uses a sandbox checkout interface simulating Paystack / Flutterwave card and bank transfer flows. **No real debit cards are charged in this phase.**
* **GPS Geolocation:** Simulates a high-accuracy GPS fix on Alakahia / Port Harcourt coordinates with manual landmark entry fallback.
* **Order Status Progression:** Includes an interactive reviewer control (`Simulate Next Step →`) to walk through order fulfillment stages (Accepted → Filling → In Transit → Leak Test → Delivered) without waiting 20 minutes.
* **Merchant Portal:** Displays a preview card explaining Phase 2 availability without premature implementation of the merchant or admin dashboards.

---

## 4. RUN INSTRUCTIONS & DEVELOPMENT

### Prerequisites
* Node.js 18+ or 20+
* npm or bun

### Local Setup
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Production Build
```bash
npm run build
```

---

## 5. DESIGN TOKENS & VISUAL IDENTITY

* **Brand Primary (Purple):** `#5B4AE4` / `#6366F1` (Used for primary CTA buttons, selected role highlights, and active navigation)
* **Brand Accent (Flame):** `#F97316` / `#FB923C` (Gas flame motif, LPG indicators, alert badges)
* **Status Green (Online / Verified):** `#10B981` (Store availability toggle, "Paid online" tag)
* **Dark Slate Navy:** `#18182E` / `#0F172A` (Metrics cards, contrast containers)
* **Currency Symbol:** Nigerian Naira (`₦`) formatted with commas (`₦18,500`, `₦1,500`, `₦20,000`)
* **Reference Address:** `24 Blueberry, Alakahia, Port Harcourt, Rivers State`

---

## 6. REMAINING BLOCKERS & RECOMMENDED NEXT STEPS FOR PHASE 2

Before expanding into Phase 2 (Merchant Portal and Admin Dashboard), the product owner should confirm the following 4 decisions documented in `GAS_MARKETPLACE_VIDEO_ANALYSIS.md`:

1. **Logistics Courier Fleet:** Confirm whether merchants (like Son And Father Oil &amp; Gas) dispatch with their own tricycles/vans, or whether Gas Deck will operate a unified 3rd-party freelance courier network.
2. **Cylinder Swap vs. Refill Wait:** Confirm standard operating procedure for the 15–25 min SLA: immediate certified tank swap vs. wait-and-fill.
3. **Payment Processor Selection:** Confirm preferred Nigerian gateway (Paystack, Flutterwave, or Monnify) for production API keys and webhook escrow.
4. **Platform Commission Rate:** Confirm platform percentage or flat cut per kilogram.

---
*Gas Deck Technologies Ltd. — Phase 1 Customer Marketplace Handoff*
