# MarginOS

### The Contribution Intelligence Layer for Quick Commerce

> **From "Did the order grow?" to "Did the order create value?"**

MarginOS is an executive-grade decision intelligence prototype designed
for quick-commerce operations. It sits above order, basket, fulfillment,
inventory, and promotion economics to identify where contribution is
being lost --- then simulates the safest action to recover it.

The product is presented through a Swiggy Instamart-oriented operating
console, but the underlying concept is designed to be commerce-platform
agnostic.

------------------------------------------------------------------------

## The Pitch

Quick commerce is optimized to make orders fast.

But **speed and revenue are not the same thing as contribution**.

A basket can look healthy while value is quietly lost through:

-   unnecessary discounts
-   low-margin basket composition
-   expensive solitary deliveries
-   inefficient dispatch decisions
-   stockouts
-   perishable inventory waste
-   fulfillment friction

**MarginOS turns these hidden leaks into an operational decision
layer.**

For every order, store, route, or network scenario, it asks:

> **What is the economically best next action --- and can we prove
> why?**

------------------------------------------------------------------------

## What MarginOS Does

MarginOS combines five layers into one operating system:

  -----------------------------------------------------------------------
  Layer                               What it answers
  ----------------------------------- -----------------------------------
  **Order Economics**                 Where did this individual order
                                      make or lose contribution?

  **Store Intelligence**              Which dark stores have the largest
                                      economic leaks?

  **Route & Dispatch Intelligence**   Where can fulfillment be batched or
                                      optimized safely?

  **Digital Twin + Simulation**       What happens if we change
                                      discounts, AOV, delivery cost,
                                      density, or wastage?

  **Experiment Intelligence**         Which interventions are worth
                                      validating in the real world?
  -----------------------------------------------------------------------

An AI Copilot sits across these layers to explain decisions using the
underlying deterministic calculations.

------------------------------------------------------------------------

# The Executive Experience

MarginOS is built as a **presentation-ready operations console**, not
just a dashboard.

### 01 --- Executive Overview

A network-level view of contribution, leakage, and opportunity.

The prototype models a representative set of dark-store pods and
extrapolates them into a larger network scenario.

It surfaces:

-   network orders/day
-   AOV
-   contribution/order
-   contribution/day
-   annualized run-rate
-   major leakage categories
-   store-level opportunities

------------------------------------------------------------------------

### 02 --- Order Economics

Every order gets a unit-economics waterfall.

MarginOS evaluates:

**Revenue → Product Cost → Delivery → Picking → Packing → Discounts →
Payment → Wastage → Net Contribution**

It then compares possible interventions.

Examples:

-   rationalize an unnecessary discount
-   add a high-margin complementary item
-   substitute toward a better-margin product
-   batch fulfillment
-   trigger perishable clearance

The important idea is simple:

> **Do not optimize the order for revenue alone. Optimize the expected
> contribution subject to customer and operational constraints.**

------------------------------------------------------------------------

### 03 --- Dark Store Intelligence

The store layer shows where economics are leaking across the network.

Each modeled store includes:

-   order volume
-   AOV
-   contribution/order
-   order density
-   SKU count
-   inventory utilization
-   stockout rate
-   expiry wastage
-   picking time
-   delivery cost
-   top profit leaks
-   top opportunities

This creates a bridge between **finance, operations, fulfillment, and
merchandising**.

------------------------------------------------------------------------

### 04 --- India Dispatch Map

A geographic operating view connects stores, orders, and dispatch
economics.

The prototype uses Leaflet for the map experience and provides a
foundation for a future live routing layer.

The intended production architecture can connect this layer to:

-   live order locations
-   dark-store locations
-   rider/vehicle telemetry
-   routing APIs
-   ETA services
-   dispatch systems

------------------------------------------------------------------------

### 05 --- Simulation Lab

The Simulation Lab runs a deterministic Monte Carlo model across up to
**100,000 simulated orders**.

It compares a baseline operating model against MarginOS interventions.

The interface exposes:

-   contribution distributions
-   percentiles
-   confidence intervals
-   AOV changes
-   discount leakage savings
-   delivery-cost savings
-   total contribution impact

This lets an operator ask:

> **"Before we change production behavior, what does the model say
> happens?"**

------------------------------------------------------------------------

### 06 --- Digital Twin

The Digital Twin provides sensitivity analysis around operating
assumptions.

You can vary:

-   AOV
-   discount spend
-   delivery cost
-   order density
-   conversion
-   wastage
-   store count

The objective is not to pretend the model is reality.

It is to make the **economic sensitivity of operational decisions
visible**.

------------------------------------------------------------------------

### 07 --- Experiment Lab

MarginOS converts model recommendations into testable hypotheses.

Example intervention classes include:

**Basket** \> Recommend one high-affinity complementary product before
checkout.

**Discount** \> Replace blanket incentives with minimum-effective
incentives based on predicted elasticity.

**Fulfillment** \> Batch compatible orders when spatial and ETA
constraints are satisfied.

**Inventory** \> Dynamically surface short-shelf-life products before
they become write-offs.

Each experiment includes:

-   hypothesis
-   baseline
-   treatment
-   variable tested
-   sample size
-   target metric
-   estimated lift
-   confidence interval
-   downside scenario
-   upside scenario

------------------------------------------------------------------------

# The Decision Engine

The core of MarginOS is not the UI.

It is the **economic decision loop**.

``` text
ORDER / STORE / ROUTE DATA
          │
          ▼
   UNIT ECONOMICS ENGINE
          │
          ▼
   OPPORTUNITY DETECTION
          │
          ▼
 CANDIDATE INTERVENTIONS
          │
          ▼
 FEASIBILITY + RISK CHECKS
          │
          ▼
 EXPECTED CONTRIBUTION
          │
          ▼
   HUMAN-READABLE EXPLANATION
          │
          ▼
   SIMULATE → EXPERIMENT → DEPLOY
```

The optimizer evaluates multiple possible actions instead of blindly
recommending a single action.

The model considers:

-   expected contribution
-   conversion probability
-   customer friction
-   ETA impact
-   inventory risk
-   discount savings
-   delivery-cost changes
-   confidence intervals
-   feasibility constraints

That makes MarginOS closer to a **decision engine** than a reporting
dashboard.

------------------------------------------------------------------------

# AI Copilot

The AI Copilot is deliberately positioned as an **explanation layer over
deterministic economics**.

Instead of allowing an LLM to invent financial logic, MarginOS first
calculates the underlying evidence.

The Copilot can then explain questions such as:

> "Why did MarginOS select discount rationalization?"

> "Where are we losing money in this store?"

> "What changes if delivery cost falls by 5%?"

> "What did the 100,000-order simulation show?"

This architecture creates a useful separation:

**Math decides. AI explains. Humans authorize.**

------------------------------------------------------------------------

# Human-in-the-Loop Commerce

MarginOS includes an Assisted Checkout concept with an explicit
authorization gate.

The prototype requires a human confirmation before checkout execution.

The intended production principle is:

``` text
AI recommendation
      ↓
Human review
      ↓
Explicit confirmation
      ↓
Commerce action
      ↓
Audit trail
```

The goal is to make automation **auditable and controllable**,
particularly when actions affect customers, orders, discounts, or
payments.

------------------------------------------------------------------------

# Prototype vs Production

This repository is intentionally structured as a **high-fidelity product
prototype**.

### Currently demonstrated

-   deterministic order economics
-   intervention optimization
-   modeled dark-store network analytics
-   route/map visualization
-   Monte Carlo simulation
-   Digital Twin sensitivity analysis
-   experiment hypotheses
-   AI Copilot integration
-   simulated commerce provider
-   assisted-checkout authorization flow
-   desktop enterprise console
-   Android/Pixel-style presentation mode
-   executive Pitch Mode

### Currently simulated

The Swiggy commerce provider is currently backed by a
`MockCommerceProvider`.

The `SwiggyMcpCommerceProvider` interface is present as the integration
boundary, but the current implementation reports MCP as unavailable and
falls back to simulation.

Therefore:

> **This demo should not be represented as a live Swiggy integration.**

A production integration would require authorized Swiggy MCP/API access,
authentication, permissions, contracts, rate limits, and production-safe
action controls.

------------------------------------------------------------------------

# Production Vision

The architecture is designed so the simulated commerce layer can
eventually be replaced by real integrations.

``` text
                 ┌──────────────────────────┐
                 │       MarginOS UI        │
                 │ Executive / Ops / Mobile │
                 └────────────┬─────────────┘
                              │
                 ┌────────────▼─────────────┐
                 │     Decision Platform    │
                 │                          │
                 │ Economics                │
                 │ Optimizer                │
                 │ Simulation               │
                 │ Experiments              │
                 │ AI Copilot               │
                 └────────────┬─────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
 Commerce APIs/MCP       Maps & Routing        Operational Data
       │                      │                      │
       ▼                      ▼                      ▼
 Orders / Cart          ETA / Distance       Stores / Inventory
 Products / Coupons     Routes / Geospatial   Dispatch / Pricing
```

### Potential production data sources

-   Commerce platform APIs/MCP
-   order management systems
-   inventory systems
-   pricing and promotion engines
-   dark-store WMS
-   dispatch systems
-   routing and maps APIs
-   customer/order event streams
-   payment economics
-   experimentation platforms

The prototype's provider abstraction makes this transition conceptually
straightforward: replace simulated provider methods with authenticated
production adapters while preserving the economics and decision layers.

------------------------------------------------------------------------

# Example Business Questions

MarginOS is designed around questions an operations or commercial leader
actually needs answered.

### Finance

**"Where is contribution leaking?"**

Break leakage into discount, basket, fulfillment, and inventory drivers.

### Operations

**"Which store needs attention?"**

Surface the store-level economic constraints and modeled opportunities.

### Growth

**"Which discount is actually incremental?"**

Move from blanket discounting toward elasticity-aware incentives.

### Fulfillment

**"Can we make this delivery cheaper without breaking the SLA?"**

Evaluate batching opportunities with explicit ETA constraints.

### Merchandising

**"What should we add to this basket?"**

Rank complementary products by expected incremental contribution.

### Leadership

**"What happens if we deploy this across the network?"**

Use simulation and Digital Twin sensitivity analysis before changing
production behavior.

------------------------------------------------------------------------

# Demo Storyline

For a pitch, the application can be presented in this sequence:

### 1. Start with the problem

**"Revenue tells us that an order happened. MarginOS tells us whether
that order created value."**

### 2. Open Order Economics

Take the showcase order:

`SIM-004182`

Show the contribution waterfall and the competing intervention options.

### 3. Explain the decision

Open the AI Copilot.

Ask:

> "Why did MarginOS select discount rationalization?"

Show that the answer is grounded in deterministic evidence.

### 4. Zoom out

Move to **Dark Stores**.

Show that the same economic logic can operate at store level.

### 5. Go geographic

Open the **India Dispatch Map**.

Connect fulfillment economics to spatial decisions.

### 6. Prove the concept with simulation

Run the **100K Simulation**.

Show baseline vs MarginOS distributions.

### 7. Stress-test the strategy

Open the **Digital Twin**.

Change delivery cost, AOV, discount spend, and density.

### 8. Close the loop

Open **Experiments**.

Show how a model recommendation becomes a measurable real-world
experiment.

### 9. Finish on Pitch Mode

End with the executive story:

> **Detect → Decide → Simulate → Experiment → Act → Measure**

------------------------------------------------------------------------

# Technology

### Frontend

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   Lucide React
-   Motion
-   Leaflet

### Backend

-   Node.js
-   Express
-   TypeScript
-   `tsx`
-   `esbuild`

### AI

-   Google Gemini via `@google/genai`

### Core engines

-   Unit economics engine
-   Intervention optimizer
-   Monte Carlo simulation engine
-   Digital Twin sensitivity engine
-   Store/network analytics
-   Experiment hypothesis engine
-   Commerce provider abstraction

------------------------------------------------------------------------

# Project Structure

``` text
.
├── src/
│   ├── components/
│   │   ├── ExecutiveDashboard.tsx
│   │   ├── OrderEconomicsView.tsx
│   │   ├── DarkStoreAnalytics.tsx
│   │   ├── IndiaDispatchMapView.tsx
│   │   ├── SimulationLab.tsx
│   │   ├── DigitalTwinView.tsx
│   │   ├── ExperimentLabView.tsx
│   │   ├── PitchModeView.tsx
│   │   ├── AiCopilotSheet.tsx
│   │   └── AssistedCheckoutModal.tsx
│   │
│   ├── engine/
│   │   ├── economics.ts
│   │   ├── optimizer.ts
│   │   ├── simulation.ts
│   │   ├── storeAnalytics.ts
│   │   ├── experiments.ts
│   │   └── swiggyCommerceProvider.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── App.tsx
│
├── server.ts
├── vite.config.ts
├── package.json
└── .env.example
```

------------------------------------------------------------------------

# Running the Prototype

## Install

``` bash
npm install
```

or, if using Bun:

``` bash
bun install
```

## Environment

Create a `.env` file from `.env.example` and provide your Gemini API
key.

``` env
GEMINI_API_KEY=your_key_here
APP_URL=http://localhost:3000
```

## Development

``` bash
npm run dev
```

The application runs through the Express/Vite development server.

## Production build

``` bash
npm run build
npm start
```

## Type checking

``` bash
npm run lint
```

------------------------------------------------------------------------

# Important Security Note

**Never commit API keys or other secrets to source control.**

The current prototype contains a hardcoded Gemini credential in
`server.ts`. Before sharing or deploying this repository:

1.  Remove the hardcoded credential.
2.  Rotate/revoke the exposed credential.
3.  Load credentials only from environment variables or a secret
    manager.
4.  Add `.env` to `.gitignore`.
5.  Use separate development and production credentials.
6.  Add authentication and authorization around production endpoints.

This is especially important before connecting the application to real
commerce systems.

------------------------------------------------------------------------

# Product Principles

### 1. Contribution over vanity metrics

Revenue, orders, and AOV matter --- but they should be connected to
contribution.

### 2. Deterministic core

Financial calculations should be reproducible and inspectable.

### 3. AI as an interface to evidence

The AI layer should explain the model rather than replace the model.

### 4. Simulation before production

Test economic assumptions before changing live behavior.

### 5. Human authorization for consequential actions

Recommendations can be automated; sensitive actions should have explicit
controls.

### 6. Platform abstraction

The decision engine should not be permanently tied to one commerce
provider.

------------------------------------------------------------------------

# What This Could Become

MarginOS can evolve from a prototype into a **real-time contribution
operating layer for quick commerce**.

The long-term product can continuously ingest live commerce and
operational signals and answer:

``` text
What is happening?
        ↓
Why is it happening?
        ↓
What value is being lost?
        ↓
What action could recover it?
        ↓
What is the risk?
        ↓
Should we test it?
        ↓
Did it actually work?
```

That creates a closed-loop system:

**Observe → Understand → Optimize → Experiment → Execute → Learn**

------------------------------------------------------------------------

# The One-Line Pitch

> **MarginOS is the decision intelligence layer that helps
> quick-commerce platforms turn every order, store, and delivery into a
> measurable contribution decision.**

------------------------------------------------------------------------

## Prototype Disclaimer

All store, order, network, simulation, experiment, and economics figures
in this prototype are **modelled/demo data** unless explicitly connected
to an authorized live data source.

Network figures are scenario calculations and should not be interpreted
as Swiggy's internal financial statements, actual performance,
forecasts, or verified business results.

The Swiggy-oriented integration shown in the prototype is an
architectural demonstration; the current commerce provider falls back to
simulated data when a live MCP connection is unavailable.

------------------------------------------------------------------------

## Built for the conversation that matters

**Not:** "How many orders did we get?"

**But:**

> **"Where did we create value, where did we lose it, and what should we
> test next?"**

**That is MarginOS.**
