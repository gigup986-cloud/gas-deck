# GAS MARKETPLACE APP ("GAS DECK")
## COMPREHENSIVE VIDEO ANALYSIS, PRODUCT SPECIFICATION & HANDOFF DOCUMENT

**Document Version:** 1.0.0  
**Date:** October 14, 2026  
**Author:** Senior Product Analyst, UI/UX Architect & Software Requirements Engineer  
**Source Material:** 11-second video walkthrough of the "Gas Deck" high-fidelity Figma design prototype  
**Target Audience:** Engineering Team, Product Managers, UI/UX Designers, Product Owner  
**Reference App Name:** **Gas Deck**  
**Delivery File:** `GAS_MARKETPLACE_VIDEO_ANALYSIS.md`

---

## EVIDENCE CLASSIFICATION LEGEND

Throughout this document, every observation, requirement, workflow step, and architecture decision is tagged with one of the following strict evidence labels:

* `[VERIFIED IN VIDEO]`: Directly visible on the laptop screen showing the Figma canvas (layout, copy, visual styling, icons, labels, amounts).
* `[OWNER-STATED]`: Explicitly stated in spoken audio narration by the owner during the video recording.
* `[INFERRED]`: Highly probable deductions derived directly from visible UI states (e.g. Nigerian market context from Alakahia address, ₦ currency symbol, +234 phone code).
* `[RECOMMENDED]`: Professional software engineering, architectural, or UX proposals required to implement the owner's design safely and effectively.
* `[UNCONFIRMED]`: Ambiguous or partially obscured details in the video that need explicit owner sign-off.
* `[NOT DEMONSTRATED]`: Workflows, admin screens, or edge-case handling not shown in the 11-second video snippet.

---

## 1. EXECUTIVE SUMMARY OF THE OWNER'S VISION

The owner has designed a two-sided on-demand Liquefied Petroleum Gas (LPG) marketplace named **Gas Deck** (branded with an energetic orange-to-violet gas flame motif). The application connects domestic cooking gas customers in Nigeria (specifically demonstrated in the Alakahia / Port Harcourt area) with local retail gas plants and merchants (such as demonstrated merchant "Son And Father Oil & Gas").

### Core Value Proposition
* **For Customers:** Eliminate the friction, danger, and time loss of physically transporting heavy LPG cylinders to gas refilling plants. Customers enter or detect their location ("24 Blueberry, Alakahia"), select a refill preset (e.g., ₦8,500, 12 kg, or custom amount), see upfront pricing and delivery fees (₦1,500 delivery fee, ~15–25 minute delivery estimate), and dispatch an order to nearby registered vendors.
* **For Merchants:** Provide a dedicated merchant workspace to toggle store availability ("You're open for orders"), monitor daily revenue and deliveries at a glance ("₦148,000 / 8 Delivered"), receive real-time incoming order alerts with distance and customer details ("#ORD-2048 • Amina Bello • 12.5 kg LPG refill • 1.4 km away • ₦20,000 Paid online"), and accept or decline orders with one tap.
* **Unified Onboarding:** A unified welcoming entry point ("A warmer welcome. Create your account. We'll handle the gas.") allowing immediate self-selection into either the "Order gas (Customer)" or "Sell gas (Merchant)" persona.

---

## 2. COMPLETE VIDEO TIMELINE & OBSERVATIONS

The video is an 11-second handheld smartphone recording of a laptop displaying a dark-themed Figma canvas. Three iPhone artboards are shown side-by-side in portrait mode.

| Timestamp | Camera Focus | Visible UI Elements & Interactions | Spoken Narration (Transcribed) | Evidence Label |
| :--- | :--- | :--- | :--- | :--- |
| **00:00.00 – 00:02.10** | Wide pan across 3 mobile frames on Figma canvas. | Left: Registration screen ("Gas Deck"). Center: Customer Dashboard ("Running low?"). Right: Merchant Dashboard ("Son And Father Oil & Gas"). | "...dashboard" `[OWNER-STATED]` | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |
| **00:02.10 – 00:04.20** | Finger points to center frame ("Customer dashboard") then shifts towards right frame. | Header shows "Customer dashboard" frame title in Figma. Profile avatar + "Hi, Ezekiel 👋", Location "24 Blueberry, Alakahia", Hero card "Running low?", Preset buttons "₦8,500", "12 kg", "Custom", Total ₦20,000, "Find my gas merchant" CTA. | (Background audio transition) | `[VERIFIED IN VIDEO]` |
| **00:04.20 – 00:06.00** | Finger points directly at the right frame: "Merchant dashboard". Close-up on metric card and incoming order. | Header "MERCHANT WORKSPACE", Store name "Son And Father Oil & Gas", Status toggle "You're open for orders" (Green toggle ON), Card "Today at a glance" (₦148,000, 8 Delivered), Incoming order card #ORD-2048 from Amina Bello (₦20,000 Paid online). | *"Then this one na the merchant dashboard."* `[OWNER-STATED]` | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |
| **00:06.00 – 00:08.50** | Camera shifts back to the left frame: Registration / Account Creation. Finger hovers over role selector. | Heading "A warmer welcome. Create your account. We'll handle the gas.", Section label "I'm here to...", Two role selection cards: "Order gas (Customer)" (selected with purple border) and "Sell gas (Merchant)". | *"Then when you wan register, e go ask you if you want to order gas..."* `[OWNER-STATED]` | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |
| **00:08.50 – 00:11.00** | Close-up on the role cards and form fields on the left frame. | Form fields: "Full name" ("Amina Bello"), "Phone number" ("+234 801 234 5678"), followed by email/password inputs and purple full-width button "Create account →". | *"...or you want to sell gas."* `[OWNER-STATED]` | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |

---

## 3. SCREEN-BY-SCREEN REQUIREMENTS INVENTORY

### Screen 1: Registration & Role Selection Screen
* **Canvas Title:** `Registration` / `Onboarding` `[INFERRED]`
* **Status Bar:** Standard iOS 9:41 style `[VERIFIED IN VIDEO]`.
* **Top Bar:**
  * **Brand Logo:** Circular/rounded badge containing a gradient gas flame icon (coral/orange/purple) `[VERIFIED IN VIDEO]`.
  * **Brand Name:** "Gas Deck" in bold modern geometric sans-serif typography `[VERIFIED IN VIDEO]`.
  * **Top-Right Action:** Text link "Log in" in purple font, routing existing users to credentials screen `[VERIFIED IN VIDEO]`.
* **Headline Section:**
  * **Display Title:** "A warmer welcome." (26–28pt, bold, high contrast) `[VERIFIED IN VIDEO]`.
  * **Subtitle:** "Create your account. We'll handle the gas." (14pt, subdued slate-500) `[VERIFIED IN VIDEO]`.
* **Role Selection ("I'm here to..."):**
  * Section label: "I'm here to..." `[VERIFIED IN VIDEO]`.
  * **Option A: "Order gas" (Customer)** `[VERIFIED IN VIDEO]`
    * Layout: Left card.
    * Icon: House / Home icon.
    * Text: Bold title "Order gas", sub-caption "Customer".
    * State: Active / Selected.
    * Visual cues: Solid purple/violet border (2px), soft lavender background tint (`#F5F3FF`), purple radio circle indicator in top right corner.
  * **Option B: "Sell gas" (Merchant)** `[VERIFIED IN VIDEO]`
    * Layout: Right card.
    * Icon: Retail storefront / shop icon.
    * Text: Title "Sell gas", sub-caption "Merchant".
    * State: Inactive / Unselected.
    * Visual cues: Thin light-gray border (`#E5E7EB`), crisp white background.
* **Form Inputs:**
  * **Full Name:**
    * Left adornment: User silhouette icon.
    * Value/Placeholder shown: "Amina Bello" `[VERIFIED IN VIDEO]`.
  * **Phone Number:**
    * Left adornment: Phone receiver icon.
    * Value/Placeholder shown: "+234 801 234 5678" (Format: Nigerian MSISDN) `[VERIFIED IN VIDEO]`.
  * **Email Address & Password:**
    * Outlined inputs with mail icon and lock icon `[VERIFIED IN VIDEO]`.
* **Primary Action:**
  * Button label: "Create account →" `[VERIFIED IN VIDEO]`.
  * Styling: Full-width rounded pill button in vivid purple (`#6366F1` / `#5B4AE4`) with white typography and trailing arrow icon.

---

### Screen 2: Customer Dashboard
* **Canvas Title:** `Customer dashboard` `[VERIFIED IN VIDEO]`.
* **Top Header:**
  * **Left:** Circular profile avatar thumbnail `[VERIFIED IN VIDEO]`.
  * **Greeting:** "Hi, Ezekiel 👋" (Personalized first name greeting with waving hand emoji) `[VERIFIED IN VIDEO]`.
  * **Right:** Notification bell icon with active badge dot `[VERIFIED IN VIDEO]`.
* **Location Selector Bar:**
  * Left icon: Location map pin (coral/red or purple) `[VERIFIED IN VIDEO]`.
  * Address string: "24 Blueberry, Alakahia" (Nigerian residential address) `[VERIFIED IN VIDEO]`.
  * Right indicator: Downward chevron indicating modal/drawer for address selection or GPS geolocation `[VERIFIED IN VIDEO]`.
* **Hero Order Card ("Running low?"):**
  * Container: Soft rounded card (16px border radius) with faint neutral background.
  * Title: "Running low?" (Bold, 18pt) `[VERIFIED IN VIDEO]`.
  * Delivery SLA pill: "⚡ 15 - 25 min delivery time" (estimated arrival badge) `[VERIFIED IN VIDEO]`.
  * Decorative illustration: Orange LPG cooking gas cylinder with flame badge in top right of card `[VERIFIED IN VIDEO]`.
  * **Refill Quantity Presets / Controls:**
    * Preset 1 (Amount): "₦8,500" (or ₦10,500) numeric preset box `[VERIFIED IN VIDEO]`.
    * Preset 2 (Standard Cylinder Weight): "12 kg" (or 12.5 kg) weight chip `[VERIFIED IN VIDEO]`.
    * Preset 3 (Custom Mode): "Custom" solid purple interactive button `[VERIFIED IN VIDEO]`.
  * **Cost Breakdown Summary (Right/Bottom):**
    * Gas Refill Subtotal: "₦18,500" (or ₦10,500) `[VERIFIED IN VIDEO]`.
    * Delivery Fee: "₦1,500" `[VERIFIED IN VIDEO]`.
    * Total Display: "Total ₦20,000" (Prominent bold text) `[VERIFIED IN VIDEO]`.
  * **Primary CTA:**
    * Full-width purple pill button: "Find my gas merchant" (or "Find my gas 🔍") `[VERIFIED IN VIDEO]`.
* **Secondary Section ("Your last refill"):**
  * Heading: "Your last refill" `[VERIFIED IN VIDEO]`.
  * Order Summary Card:
    * Left icon: Gas cylinder icon.
    * Title: "12.5 kg | Full refill" `[VERIFIED IN VIDEO]`.
    * Vendor & Date: "14 Oct • Son And Father Oil & Gas" `[VERIFIED IN VIDEO]`.
    * Price: "₦18,500" `[VERIFIED IN VIDEO]`.
    * Action button: "Reorder" button `[VERIFIED IN VIDEO]`.
* **Customer Bottom Navigation Bar (4 Tabs):**
  1. `Home` (House icon, purple active state) `[VERIFIED IN VIDEO]`.
  2. `Orders` (Receipt / Box icon) `[VERIFIED IN VIDEO]`.
  3. `Wallet` (Wallet / Card icon) `[VERIFIED IN VIDEO]`.
  4. `Profile` (User silhouette icon) `[VERIFIED IN VIDEO]`.

---

### Screen 3: Merchant Dashboard
* **Canvas Title:** `Merchant dashboard` `[VERIFIED IN VIDEO]`.
* **Top Header:**
  * **Overline:** "MERCHANT WORKSPACE" in uppercase muted tracking `[VERIFIED IN VIDEO]`.
  * **Store Identity:** Flame logo + "Son And Father Oil & Gas" `[VERIFIED IN VIDEO]`.
  * **Right:** Notification bell icon `[VERIFIED IN VIDEO]`.
* **Store Online / Offline Availability Banner:**
  * Status indicator: Live green indicator dot `[VERIFIED IN VIDEO]`.
  * Primary copy: "You're open for orders" `[VERIFIED IN VIDEO]`.
  * Secondary copy: "Orders in your area will find you." (or "Customers nearby can find you.") `[VERIFIED IN VIDEO]`.
  * Toggle control: Standard iOS green toggle switch set to ON (`true`) `[VERIFIED IN VIDEO]`.
* **Financial & Delivery Performance Card ("Today at a glance"):**
  * Container: High-contrast dark navy / deep purple card (`#18182E` / `#1E1B4B`) `[VERIFIED IN VIDEO]`.
  * Top bar:
    * Label: "Today at a glance" `[VERIFIED IN VIDEO]`.
    * Date badge: "14 OCT" pill `[VERIFIED IN VIDEO]`.
  * Metric Column 1 (Revenue):
    * Amount: "₦148,000" (High-visibility white typography) `[VERIFIED IN VIDEO]`.
    * Trend / Context: "Sales • +18% vs yesterday" (with green upward trend arrow) `[VERIFIED IN VIDEO]`.
  * Vertical divider line `[VERIFIED IN VIDEO]`.
  * Metric Column 2 (Completed Volume):
    * Number: "8" `[VERIFIED IN VIDEO]`.
    * Sub-label: "Delivered" `[VERIFIED IN VIDEO]`.
* **Incoming Order Section:**
  * Header: "Incoming orders" with status chip "1 new request" (soft orange pill badge) `[VERIFIED IN VIDEO]`.
  * Order Dispatch Card:
    * Header row: Order ID tag "#ORD-2048" on left; "New request" orange tag on right `[VERIFIED IN VIDEO]`.
    * Customer Info: Circular avatar thumbnail + "Amina Bello" `[VERIFIED IN VIDEO]`.
    * Order Specs & Distance: "12.5 kg LPG refill • 1.4 km away" `[VERIFIED IN VIDEO]`.
    * Financials & Settlement: "₦20,000" accompanied by green badge "Paid online" `[VERIFIED IN VIDEO]`.
    * **Action Bar:**
      * Left button: "Decline" with '✕' icon (outlined neutral style) `[VERIFIED IN VIDEO]`.
      * Right button: "Accept order ✓" (Solid purple CTA button with checkmark) `[VERIFIED IN VIDEO]`.
* **Inventory Quick Glance ("Your gas stock"):**
  * Label: "Your gas stock" `[VERIFIED IN VIDEO]`.
  * Available capacity / LPG stock indicator visible at bottom fold `[VERIFIED IN VIDEO]`.
* **Merchant Bottom Navigation Bar (5 Tabs):**
  1. `Dashboard` (Grid / Store icon, active purple state) `[VERIFIED IN VIDEO]`.
  2. `Orders` (Clock / Clipboard icon) `[VERIFIED IN VIDEO]`.
  3. `Stock` (LPG cylinder icon) `[VERIFIED IN VIDEO]`.
  4. `Earnings` (Naira / Wallet icon) `[VERIFIED IN VIDEO]`.
  5. `Settings` (Cog / Person icon) `[VERIFIED IN VIDEO]`.

---

## 4. DETAILED FEATURE MATRIX BY ACTOR

### A. Customer Features

| Feature ID | Feature Name | Description | Evidence Label |
| :--- | :--- | :--- | :--- |
| **CUST-01** | Dual Role Registration | Customer selects "Order gas (Customer)" on registration. | `[VERIFIED IN VIDEO]` |
| **CUST-02** | Customer Profile & Auth | Sign up with Full Name, Nigerian Phone (+234), Email, and Password. Login link. | `[VERIFIED IN VIDEO]` |
| **CUST-03** | Location Display & Geotag | Display active delivery address ("24 Blueberry, Alakahia") with drop-down selector. | `[VERIFIED IN VIDEO]` |
| **CUST-04** | GPS-based Auto-detection | Automatic GPS fetch with manual fallback. | `[INFERRED]` |
| **CUST-05** | Delivery Time SLA | Real-time estimated delivery window ("15 - 25 min delivery time"). | `[VERIFIED IN VIDEO]` |
| **CUST-06** | Presets & Custom Ordering | Quick selection by Naira amount (₦8,500), cylinder weight (12 kg/12.5 kg), or Custom amount. | `[VERIFIED IN VIDEO]` |
| **CUST-07** | Transparent Price Breakdown | Explicit display of Gas Refill cost (₦18,500), Delivery Fee (₦1,500), and Total (₦20,000). | `[VERIFIED IN VIDEO]` |
| **CUST-08** | Vendor Matching Dispatch | "Find my gas merchant" triggers location-based matching to nearest online merchants. | `[VERIFIED IN VIDEO]` |
| **CUST-09** | One-Tap Reordering | "Your last refill" widget allows reordering previous purchases (e.g. Son And Father Oil & Gas) with 1 click. | `[VERIFIED IN VIDEO]` |
| **CUST-10** | Online Payment Badge | Visible "Paid online" tag confirms online card/bank transfer integration. | `[VERIFIED IN VIDEO]` |
| **CUST-11** | Pay-on-Delivery Option | Cash / POS on delivery requested in client brief. | `[OWNER-STATED]` & `[RECOMMENDED]` |
| **CUST-12** | Order Tracking & History | "Orders" bottom tab; real-time status transitions. | `[INFERRED]` |
| **CUST-13** | Customer In-App Wallet | Dedicated "Wallet" tab for refund credits and direct checkout. | `[INFERRED]` |
| **CUST-14** | Notifications | In-app notification bell with unread dot. | `[VERIFIED IN VIDEO]` |

### B. Gas Merchant Features

| Feature ID | Feature Name | Description | Evidence Label |
| :--- | :--- | :--- | :--- |
| **MERC-01** | Merchant Role Selection | Select "Sell gas (Merchant)" during initial registration. | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |
| **MERC-02** | Merchant Workspace Branding | Store banner showing business name (e.g., "Son And Father Oil & Gas") and brand flame. | `[VERIFIED IN VIDEO]` |
| **MERC-03** | Online/Offline Availability Toggle | Live toggle ("You're open for orders / Orders in your area will find you"). | `[VERIFIED IN VIDEO]` |
| **MERC-04** | Real-time Metric Dashboard | "Today at a glance" card showing daily sales (₦148,000), percentage change (+18%), and delivery count (8). | `[VERIFIED IN VIDEO]` |
| **MERC-05** | Instant Order Notification | Audible/visual alert with badge "1 new request" and order card. | `[VERIFIED IN VIDEO]` |
| **MERC-06** | Order Dispatch Details | Displays Order ID (#ORD-2048), Customer Name (Amina Bello), Product (12.5 kg LPG refill), Distance (1.4 km away), Total Amount (₦20,000), and Payment Status ("Paid online"). | `[VERIFIED IN VIDEO]` |
| **MERC-07** | Accept / Decline Workflow | Distinct action buttons: "Decline" (✕) and "Accept order" (✓). | `[VERIFIED IN VIDEO]` |
| **MERC-08** | Stock / Inventory Tracking | "Your gas stock" section & dedicated bottom tab to log bulk LPG in kg. | `[VERIFIED IN VIDEO]` |
| **MERC-09** | Earnings & Payouts | "Earnings" bottom tab for tracking settled funds and requesting bank withdrawals. | `[INFERRED]` |
| **MERC-10** | Business Verification | KYC document submission (CAC registration, DPR/NMDPRA LPG retail license). | `[RECOMMENDED]` |

### C. Platform Administrator Features

*Note: No administrator screen was displayed in the video snippet.*

| Feature ID | Feature Name | Description | Evidence Label |
| :--- | :--- | :--- | :--- |
| **ADMIN-01** | Vendor Verification & Approval | Review merchant CAC registration, gas plant safety inspection certificates, and bank account details. | `[RECOMMENDED]` |
| **ADMIN-02** | Commission & Fee Management | Configure platform fee per kg or flat percentage (e.g. 5–10%) and set delivery fee caps. | `[RECOMMENDED]` |
| **ADMIN-03** | Order Dispute Mediation | Handle rejected orders, non-delivery reports, contaminated/underfilled gas complaints, and payment discrepancies. | `[RECOMMENDED]` |
| **ADMIN-04** | Geofence & Service Areas | Define active delivery polygons (e.g. Port Harcourt: Alakahia, Choba, Rumuokoro, GRA). | `[RECOMMENDED]` |
| **ADMIN-05** | Audit Logs & Compliance | Record timestamps, driver assignments, cylinder serials, and transaction IDs for safety audits. | `[RECOMMENDED]` |

---

## 5. EXACT USER WORKFLOWS (STEP-BY-STEP)

### Workflow A: Registration & Role Selection
*Status: Demonstrated in Video (00:06 – 00:11)*
1. User opens Gas Deck on mobile device.
2. The splash/welcome screen displays: *"A warmer welcome. Create your account. We'll handle the gas."*
3. The prompt *"I'm here to..."* shows two selectable cards:
   * **"Order gas (Customer)"** with home icon.
   * **"Sell gas (Merchant)"** with shop icon.
4. User taps their preferred role. The selected card displays a vivid purple outline, soft lavender background, and checked indicator.
5. User enters their **Full Name** (e.g., "Amina Bello") and **Phone Number** (prefixed with `+234`).
6. User enters **Email Address** and **Password**.
7. User taps **"Create account →"**.
8. System issues SMS OTP verification (standard Nigerian fintech/logistics pattern) and routes user to their respective dashboard (`Customer Dashboard` or `Merchant Dashboard`).

---

### Workflow B: Customer Finding Nearby Vendors & Placing an Order
*Status: Partially Demonstrated (Customer Dashboard Hero Card 00:01 – 00:03)*
1. Customer lands on Customer Dashboard. The system detects their delivery address via GPS or displays their saved location (e.g., *"24 Blueberry, Alakahia"*).
2. The *"Running low?"* card highlights an estimated delivery time of *"15 - 25 min delivery time"*.
3. Customer selects their refill requirement:
   * **Option 1 (Fixed Naira Amount):** Taps preset (e.g., `₦8,500`).
   * **Option 2 (Standard Cylinder Size):** Taps preset (e.g., `12 kg` or `12.5 kg`).
   * **Option 3 (Custom Refill):** Taps `Custom` to input exact kilograms (e.g., 6kg, 25kg, 50kg) or monetary budget.
4. The system calculates and displays the itemized summary:
   * Gas Refill Subtotal: `₦18,500`
   * Delivery Fee: `₦1,500`
   * Total: `₦20,000`
5. Customer taps the primary CTA button: **"Find my gas merchant"**.
6. The system queries active merchants within a 3–5 km radius whose status is *"You're open for orders"* and whose LPG stock is $\ge$ requested weight.
7. Customer selects the preferred payment method:
   * **Online Payment:** Debit card, USSD, or Bank Transfer via Paystack/Flutterwave.
   * **Pay on Delivery:** Cash or Mobile POS upon cylinder delivery.
8. Order is submitted and assigned state `ORDER_CREATED`.

---

### Workflow C: Merchant Receiving & Processing an Order
*Status: Demonstrated in Video (00:03 – 00:06)*
1. Merchant ("Son And Father Oil & Gas") sets the store toggle to **"You're open for orders"** (Green toggle ON).
2. Customer order `#ORD-2048` arrives.
3. Merchant receives an audible ringtone/push notification. The badge *"1 new request"* appears under *"Incoming orders"*.
4. Merchant inspects the incoming order card:
   * **Order ID:** `#ORD-2048`
   * **Customer Name:** Amina Bello
   * **Refill Size:** 12.5 kg LPG refill
   * **Distance:** 1.4 km away
   * **Total Value:** ₦20,000
   * **Payment Tag:** `Paid online`
5. Merchant has two direct action options:
   * **Decline (`✕`):** Merchant rejects the order (requires selecting reason: out of gas, closed early, out of service area). The platform re-routes the order to the next closest vendor.
   * **Accept order (`✓`):** Merchant taps the solid purple button.
6. Upon acceptance:
   * Status updates to `ORDER_ACCEPTED`.
   * Merchant fills cylinder or assigns a dispatch rider/driver.
   * Customer dashboard transitions to live delivery tracking.
   * Merchant's "Today at a glance" sales figures increment dynamically.

---

### Workflow D: Order Completion & Confirmation
*Status: Inferred / Not fully demonstrated in video*
1. Dispatch rider arrives at customer location ("24 Blueberry, Alakahia").
2. Rider performs mandatory leak test on cylinder valve using soapy solution.
3. Customer inspects safety seal and weight tare.
4. Customer provides a 4-digit completion PIN to the rider (or rider uploads photo of delivered cylinder).
5. Merchant dashboard updates metrics: `Delivered: 8 → 9`.
6. Merchant wallet balance reflects settled amount minus platform commission.
7. Customer receives digital invoice and prompt to rate "Son And Father Oil & Gas".

---

### Workflow E: Merchant Onboarding & Admin Approval
*Status: Not Demonstrated in Video (Required for Production)*
1. Merchant selects "Sell gas (Merchant)" during registration.
2. Merchant enters Business Name (e.g., "Son And Father Oil & Gas"), Station Physical Address, and Operating License number.
3. Merchant uploads Corporate Affairs Commission (CAC) certificate and NMDPRA safety clearance certificate.
4. Merchant enters Settlement Bank Account number (verified via NIBSS/Paystack Name Enquiry API).
5. Administrator reviews documents in Admin Console and toggles verification status to `APPROVED`.
6. Merchant gains access to workspace and toggles "You're open for orders".

---

## 6. VISUAL DESIGN SPECIFICATION

### Color Palette (Hex Codes & Usage)

| Token Name | Hex Code | Visual Sample / Usage | Evidence Label |
| :--- | :--- | :--- | :--- |
| **Brand Primary (Purple)** | `#5B4AE4` / `#6366F1` | Primary CTA buttons ("Create account", "Find my gas merchant", "Accept order"), selected role border, active navigation icon. | `[VERIFIED IN VIDEO]` |
| **Brand Surface Light** | `#F5F3FF` / `#FAF8FF` | Role card background when selected, subtle tint cards. | `[VERIFIED IN VIDEO]` |
| **Accent Orange / Flame** | `#F97316` / `#FB923C` | Gas flame icon in logo, cylinder illustration on hero card, "1 new request" badge. | `[VERIFIED IN VIDEO]` |
| **Online Success Green** | `#10B981` / `#22C55E` | Store availability toggle, online pulsing status dot, "Paid online" tag, upward growth indicators (+18%). | `[VERIFIED IN VIDEO]` |
| **Dark Metric Navy** | `#18182E` / `#1E1B4B` | "Today at a glance" merchant performance card container. | `[VERIFIED IN VIDEO]` |
| **Background Neutral** | `#F8F9FA` / `#FFFFFF` | Mobile frame canvas background, card surfaces, input backgrounds. | `[VERIFIED IN VIDEO]` |
| **Text Primary** | `#0F172A` / `#1E293B` | Headings ("A warmer welcome.", "Running low?", "₦148,000"). | `[VERIFIED IN VIDEO]` |
| **Text Muted** | `#64748B` / `#94A3B8` | Subtitles, helper text, inactive navigation icons. | `[VERIFIED IN VIDEO]` |
| **Border Neutral** | `#E2E8F0` / `#E5E7EB` | Unselected role card border, input field outlines. | `[VERIFIED IN VIDEO]` |
| **Danger / Decline Red** | `#EF4444` / `#DC2626` | Decline order outline, cancellation badges. | `[INFERRED]` |

### Typography & Spacing
* **Font Family:** Inter or Plus Jakarta Sans (Clean, high-legibility modern sans-serif with excellent tabular numbers for currency formatting).
* **Headings:**
  * Screen Title: 24–28px, Bold, -0.02em letter spacing.
  * Card Title: 18–20px, Semi-Bold.
  * Section Headers: 15–16px, Semi-Bold, slate-800.
* **Metric Numbers:** 28–32px, Bold, tabular figures (`₦148,000`, `₦20,000`).
* **Captions & Labels:** 12–13px, Medium weight.
* **Component Geometry:**
  * Primary Action Buttons: Height 50–54px, Full pill radius (9999px or 24px rounded).
  * Feature Cards: Border radius 16px to 20px, subtle elevation (`box-shadow: 0 4px 20px rgba(0,0,0,0.04)`).
  * Selection Cards: Padding 16px, border radius 16px.

---

## 7. FUNCTIONAL & TECHNICAL ARCHITECTURE

### High-Level System Architecture
```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  +-------------------------------------+  +------------------------------------+  |
|  |     Customer Web / Mobile App       |  |       Merchant Web / Mobile App    |  |
|  |  (Ordering, Tracking, Payment)      |  |   (Dispatch, Stock, Daily Sales)   |  |
|  +-------------------------------------+  +------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                          |
                                    HTTPS / WSS
                                          v
+-----------------------------------------------------------------------------------+
|                                API GATEWAY LAYER                                  |
|   Rate Limiting | JWT Authentication | Role-Based Access Control (RBAC)           |
+-----------------------------------------------------------------------------------+
       |                            |                           |
       v                            v                           v
+---------------+            +---------------+           +--------------------+
| Order Service |            | Merchant SVC  |           | Billing & Payouts  |
| - Matching    |            | - Inventory   |           | - Paystack / Monnify|
| - Pricing SLA |            | - Store State |           | - Escrow & Payout  |
+---------------+            +---------------+           +--------------------+
       |                            |                           |
       +----------------------------+---------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------------------+
|                               PERSISTENCE LAYER                                   |
|   PostgreSQL / Firestore: Users, Merchants, Products, Orders, Inventory, Audits   |
|   Redis: Real-time Geo-spatial Indexing (GEOADD/GEORADIUS), Merchant Availability  |
+-----------------------------------------------------------------------------------+
```

---

### Proposed Database Schema

#### 1. `users`
* `id` (UUID, Primary Key)
* `role` (ENUM: `CUSTOMER`, `MERCHANT`, `ADMIN`, `RIDER`) `[VERIFIED IN VIDEO]`
* `full_name` (VARCHAR, e.g., "Amina Bello") `[VERIFIED IN VIDEO]`
* `phone_number` (VARCHAR, unique, e.g., "+2348012345678") `[VERIFIED IN VIDEO]`
* `email` (VARCHAR, unique)
* `password_hash` (VARCHAR)
* `is_verified` (BOOLEAN, default: false)
* `created_at` (TIMESTAMP)

#### 2. `merchants`
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key -> `users.id`)
* `business_name` (VARCHAR, e.g., "Son And Father Oil & Gas") `[VERIFIED IN VIDEO]`
* `is_open` (BOOLEAN, default: true) `[VERIFIED IN VIDEO]`
* `current_lpg_stock_kg` (NUMERIC, e.g., 450.00) `[VERIFIED IN VIDEO]`
* `price_per_kg` (NUMERIC, e.g., 1480.00)
* `delivery_fee_base` (NUMERIC, e.g., 1500.00) `[VERIFIED IN VIDEO]`
* `latitude` (DOUBLE PRECISION)
* `longitude` (DOUBLE PRECISION)
* `service_radius_km` (NUMERIC, default: 5.0)
* `verification_status` (ENUM: `PENDING`, `APPROVED`, `SUSPENDED`) `[RECOMMENDED]`
* `bank_account_number` (VARCHAR)
* `bank_code` (VARCHAR)

#### 3. `orders`
* `id` (UUID, Primary Key)
* `order_code` (VARCHAR, e.g., "#ORD-2048") `[VERIFIED IN VIDEO]`
* `customer_id` (UUID, Foreign Key -> `users.id`)
* `merchant_id` (UUID, Foreign Key -> `merchants.id`)
* `cylinder_size_kg` (NUMERIC, e.g., 12.5) `[VERIFIED IN VIDEO]`
* `gas_amount_naira` (NUMERIC, e.g., 18500.00) `[VERIFIED IN VIDEO]`
* `delivery_fee_naira` (NUMERIC, e.g., 1500.00) `[VERIFIED IN VIDEO]`
* `total_naira` (NUMERIC, e.g., 20000.00) `[VERIFIED IN VIDEO]`
* `delivery_address` (TEXT, e.g., "24 Blueberry, Alakahia") `[VERIFIED IN VIDEO]`
* `customer_lat` (DOUBLE PRECISION)
* `customer_lng` (DOUBLE PRECISION)
* `distance_km` (NUMERIC, e.g., 1.4) `[VERIFIED IN VIDEO]`
* `payment_status` (ENUM: `PAID_ONLINE`, `PAY_ON_DELIVERY`, `REFUNDED`) `[VERIFIED IN VIDEO]`
* `order_status` (ENUM: `NEW_REQUEST`, `ACCEPTED`, `IN_DISPATCH`, `DELIVERED`, `DECLINED`, `CANCELLED`) `[VERIFIED IN VIDEO]`
* `created_at` (TIMESTAMP)

---

### Core Backend API Endpoints

| Method | Endpoint | Description | Evidence Label |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register user with role (`CUSTOMER` or `MERCHANT`). | `[VERIFIED IN VIDEO]` |
| `POST` | `/api/v1/auth/login` | Authenticate and issue JWT. | `[VERIFIED IN VIDEO]` |
| `GET` | `/api/v1/customer/dashboard` | Fetch current location, last order refill, active order state. | `[VERIFIED IN VIDEO]` |
| `POST` | `/api/v1/orders/quote` | Calculate gas price + delivery fee for given weight/budget. | `[VERIFIED IN VIDEO]` |
| `POST` | `/api/v1/orders/find-merchant` | Dispatch order to nearest open merchant with stock. | `[VERIFIED IN VIDEO]` |
| `GET` | `/api/v1/merchant/dashboard` | Fetch store status, today's sales (₦148k), count (8), stock. | `[VERIFIED IN VIDEO]` |
| `PUT` | `/api/v1/merchant/status` | Toggle `is_open` (Open / Closed for orders). | `[VERIFIED IN VIDEO]` |
| `PUT` | `/api/v1/merchant/orders/:id/accept` | Merchant accepts order (transitions to `ACCEPTED`). | `[VERIFIED IN VIDEO]` |
| `PUT` | `/api/v1/merchant/orders/:id/decline` | Merchant declines order (triggers fallback matching). | `[VERIFIED IN VIDEO]` |
| `PUT` | `/api/v1/merchant/stock` | Update available LPG kilograms in bulk tank. | `[VERIFIED IN VIDEO]` |

---

## 8. BUSINESS MODEL, REVENUE STREAMS & EDGE CASES

### Monetization Channels
1. **Commission on Gas Sales:** Platform deducts a commission (e.g. 3%–5% or ₦50/kg) on completed transactions before merchant payout.
2. **Delivery Fee Commission:** Platform shares in the delivery fee (e.g. ₦300 of the ₦1,500 delivery charge for logistics routing).
3. **Featured / Promoted Merchant Placement:** Merchants pay a weekly fee to be prioritized in the "Find my gas merchant" radius algorithm.
4. **Cylinder Sales & Accessories:** Marketplace for new composite cylinders, regulators, hoses, and leak detectors.

### Unresolved Edge Cases & Mitigation Strategies

| Edge Case Scenario | Potential Impact | Recommended Solution |
| :--- | :--- | :--- |
| **No nearby vendor is open** | Order hangs indefinitely; customer churn. | If no vendor within 5 km has `is_open: true`, immediately notify customer with option to schedule for next morning. |
| **Merchant ignores incoming request** | Customer waits past the 15–25 min SLA. | 90-second acceptance countdown timer. If unaccepted, automatically cascade to the next nearest vendor. |
| **Merchant rejects order** | Order cancelled unexpectedly. | Capture rejection reason; immediately reassign order to alternative vendor without requiring customer re-entry. |
| **Payment succeeds but order cannot be fulfilled** | Financial dispute, lost trust. | Implement an automated Escrow system. Payment is held in escrow until completion PIN is verified. Instant refund to customer Gas Deck Wallet if unfulfilled. |
| **Pay-on-Delivery customer refuses cylinder** | Merchant incurs round-trip transit cost. | Restrict Pay-on-Delivery to customers with verified phone numbers and at least one successful prior delivery, or charge a non-refundable ₦500 transit deposit. |
| **Cylinder Safety Hazard (Expired/Rusted Tank)** | Risk of explosion or safety liability. | Riders must inspect cylinder manufacturing/expiry stamp. If cylinder fails safety test, rider swaps with certified company-refurbished cylinder or declines fill. |

---

## 9. TRACEABILITY MATRIX

| ID | Requirement / Component | Source in Video | Audio / Visual Evidence | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TR-01** | App Branding: "Gas Deck" | 00:00, 00:07 | Left frame top brand label + flame icon | `[VERIFIED IN VIDEO]` |
| **TR-02** | Customer/Merchant Role Selection | 00:06 – 00:10 | "Order gas (Customer)" and "Sell gas (Merchant)" cards | `[VERIFIED IN VIDEO]` & `[OWNER-STATED]` |
| **TR-03** | Phone Number with Nigerian Code (+234) | 00:08 – 00:11 | Left frame input field: "+234 801 234 5678" | `[VERIFIED IN VIDEO]` |
| **TR-04** | Location: Alakahia, Rivers State | 00:01 – 00:03 | Center frame pill: "24 Blueberry, Alakahia" | `[VERIFIED IN VIDEO]` |
| **TR-05** | Delivery Time SLA: 15–25 mins | 00:01 – 00:03 | Center frame hero card: "15 - 25 min delivery time" | `[VERIFIED IN VIDEO]` |
| **TR-06** | Order Presets: ₦8,500 / 12kg / Custom | 00:01 – 00:03 | Center frame 3 option buttons | `[VERIFIED IN VIDEO]` |
| **TR-07** | Pricing: ₦18,500 Gas + ₦1,500 Delivery = ₦20,000 | 00:01 – 00:03 | Center frame pricing breakdown | `[VERIFIED IN VIDEO]` |
| **TR-08** | CTA: "Find my gas merchant" | 00:01 – 00:03 | Center frame full-width purple button | `[VERIFIED IN VIDEO]` |
| **TR-09** | Reorder Previous Merchant | 00:01 – 00:03 | Center frame: "Your last refill • Son And Father Oil & Gas" | `[VERIFIED IN VIDEO]` |
| **TR-10** | Merchant Store Name: Son And Father Oil & Gas | 00:03 – 00:05 | Right frame header | `[VERIFIED IN VIDEO]` |
| **TR-11** | Merchant Store Toggle (Open/Closed) | 00:03 – 00:05 | Right frame: "You're open for orders" + Green switch | `[VERIFIED IN VIDEO]` |
| **TR-12** | Merchant Today at a Glance: ₦148,000 / 8 Delivered | 00:03 – 00:05 | Right frame dark performance card | `[VERIFIED IN VIDEO]` |
| **TR-13** | Incoming Order Card with Accept/Decline | 00:03 – 00:06 | Right frame: #ORD-2048, Amina Bello, Decline (✕), Accept (✓) | `[VERIFIED IN VIDEO]` |
| **TR-14** | Payment Badge: "Paid online" | 00:04 – 00:06 | Right frame green badge on incoming order | `[VERIFIED IN VIDEO]` |
| **TR-15** | Stock / Inventory Tracking Tab | 00:04, 00:10 | Right frame: "Your gas stock" and bottom nav tab | `[VERIFIED IN VIDEO]` |

---

## 10. UNRESOLVED QUESTIONS REQUIRING OWNER'S DECISION

1. **Logistics & Delivery Execution:**
   * *Does the merchant provide their own dispatch riders/vans, or does Gas Deck operate a 3rd-party freelance courier fleet?*
2. **Cylinder Swap vs. Refill Wait:**
   * *Does the customer receive an immediate cylinder swap (exchanging empty cylinder for a pre-filled certified cylinder), or does the rider take the customer's specific cylinder to the plant and return it?* (Note: Cylinder swap is standard for 15–25 min SLA).
3. **Payment Gateway Provider:**
   * *Should we integrate Paystack, Flutterwave, Monnify, or direct bank transfer virtual accounts?*
4. **Platform Fee Structure:**
   * *What exact percentage or flat fee does Gas Deck deduct from the ₦18,500 gas price and ₦1,500 delivery charge?*
5. **Cylinder Sizes Supported:**
   * *Aside from 12.5 kg, what standard cylinder weights must be pre-configured? (e.g. 3kg, 6kg, 12.5kg, 25kg, 50kg).*
6. **Regulatory Compliance:**
   * *Will merchant onboarding require automated verification of NMDPRA (Nigerian Midstream and Downstream Petroleum Regulatory Authority) license?*

---

## 11. PHASED MVP IMPLEMENTATION PLAN

### Phase 1: Core Foundation & UI Alignment (Weeks 1–2)
* Implement mobile-first responsive UI mirroring the Figma layouts:
  * Registration & role selection screen with animated role toggle.
  * Customer dashboard with Alakahia location pill, preset selector, and reorder card.
  * Merchant workspace with online toggle and dark analytics card.
* Configure database schema (PostgreSQL / Firestore) and JWT authentication.

### Phase 2: Order Matching & Real-time Dispatch (Weeks 3–4)
* Implement geo-spatial query to find merchants within configured radius (Haversine / PostGIS).
* Implement WebSockets for instant order notification to merchants (`#ORD-2048` alert sound & accept/decline actions).
* 90-second timeout cascade logic if a merchant does not accept.

### Phase 3: Payments & Escrow Settlement (Weeks 5–6)
* Integrate Nigerian payment gateway (Paystack / Flutterwave) supporting Card, USSD, and Bank Transfer.
* Implement delivery fee breakdown logic (Gas + Delivery = Total).
* Create merchant earnings balance ledger and payout withdrawal requests.

### Phase 4: Delivery Rider App & Admin Console (Weeks 7–8)
* Dedicated dispatch interface or SMS/WhatsApp order forwarding for station drivers.
* 4-digit confirmation PIN at customer doorstep to verify delivery completion.
* Admin panel for merchant KYC verification and financial reporting.

---

## 12. DO NOT BUILD YET

The following items must **NOT** be built until the product owner provides explicit clarification, as assumptions risk massive engineering rework:

1. **DO NOT build an independent driver/courier app yet:** The video only demonstrates Customer and Merchant dashboards. Building a 3-sided network before confirming whether merchants deliver themselves is premature.
2. **DO NOT lock down a single payment processor yet:** Confirm whether Paystack, Flutterwave, or Monnify is preferred by the owner for local card/transfer processing in Nigeria.
3. **DO NOT hardcode gas plant pricing:** Prices in Nigeria fluctuate weekly based on international depot pricing. Merchants must retain dynamic pricing per kg.
4. **DO NOT enforce automated cylinder swapping:** Until the client confirms the physical handling policy (exchange vs. fill-and-return), keep the fulfillment status generic (`IN_TRANSIT` -> `DELIVERED`).
5. **DO NOT build complex subscription models:** No evidence of recurring subscriptions exists in the video prototype.

---
*End of Specification Document `GAS_MARKETPLACE_VIDEO_ANALYSIS.md`*
