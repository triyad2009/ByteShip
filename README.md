# ByteShip

ByteShip is a purple liquid-glass digital-products storefront built with React, Vite and TypeScript.

## Current repository upgrades

- Real store-style storefront navigation and search/category discovery.
- Liquid-glass cart animation and persistent local cart/wishlist state.
- Dedicated customer account routes for orders, wallet, wishlist, reviews, notifications, refunds, support and security.
- Server-backed customer dashboard data with safe fallbacks for optional modules.
- Server-side checkout validation against the published catalog instead of trusting the browser total.
- Duplicate transaction-ID protection before a payment record is created.
- Admin authorization remains server-side and restricted to the configured administrator.
- GitHub Actions CI runs TypeScript checking and the production Vite build on pushes and pull requests.

## Important payment boundary

Manual payment submissions remain payment_verification_pending until staff verification. The current AppDeploy database is not a transactional financial ledger, so wallet debit, payment verification and fulfillment must not be treated as fully atomic real-money operations yet.

## Local development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run check
```

## Configuration

Keep provider secrets and database service keys out of source control. Use backend secrets/environment variables for payment providers, Supabase and other private credentials.
