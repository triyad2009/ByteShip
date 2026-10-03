# Digital Products Store — Architecture

## Current foundation
- React + Vite + TypeScript storefront.
- AppDeploy Auth with Google OAuth.
- AppDeploy server API with server-side auth and admin allowlist.
- AppDeploy Database tables for catalog, profiles, carts, orders, payments, wallets, wallet transactions and audit logs.
- Hash-based SPA navigation because AppDeploy SPA routing requires relative/hash routes.
- Bilingual-ready UI with English/Bangla switch.
- Server-side authorization boundaries for customer and admin APIs.

## Domain model
The intended domain is normalized into separate tables: users/profiles, roles, permissions, products, product variants, categories, inventory, orders, order items, payments, payment transactions, wallets, wallet transactions, coupons, reviews, refunds, preorders, deliveries, support conversations/messages, notifications, audit logs, settings and exchange rates.

## Important AppDeploy constraint
The built-in AppDeploy database is a key-value table store rather than PostgreSQL/SQL and does not expose relational transactions in the SDK. The application therefore must NOT be treated as ready for irreversible real-money financial operations solely on this storage layer.

Before accepting real customer money, configure a transactional relational database/payment provider with atomic order + payment + wallet operations. Keep the domain tables and API boundaries migration-friendly so this can be swapped without redesigning the storefront.

## Security principles
- Never trust client totals or roles.
- Protected APIs require server-side authentication.
- Admin APIs require an explicit ADMIN_EMAILS allowlist.
- Delivery secrets must only be returned by an authenticated, ownership-checked endpoint in the future.
- Payment verification must be a server-side state transition.
- Wallet ledger entries should be append-only/immutable in the production relational implementation.
- Do not place credentials or provider secrets in source code.

## Product authorization
Only products explicitly marked authorized_to_sell=true can be published by the catalog seed/listing path. The store owner remains responsible for verifying legal distribution rights, provider terms, licensing and warranty obligations.

## Next phases
1. Replace/augment AppDeploy DB with a transactional PostgreSQL/Supabase adapter for financial workflows.
2. Implement product variants, categories, inventory ledger and reservation logic.
3. Implement payment adapters for bKash, Nagad, QR and Rupantor Pay.
4. Implement wallet ledger and mixed-payment atomic checkout.
5. Implement order lifecycle and manual delivery with encrypted secret storage.
6. Add coupons, reviews, refunds, preorders, notifications and email.
7. Add support/live chat and AI first-line support with strict customer-data scoping.
8. Add admin CMS, analytics, audit tooling and production hardening.
