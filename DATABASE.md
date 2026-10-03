# Database Model

The application uses separate domain tables to avoid mixing financial and business records.

Core tables:
- profiles
- roles
- permissions
- user_roles
- products
- product_variants
- categories
- product_categories
- product_images
- inventory
- inventory_transactions
- orders
- order_items
- payments
- payment_methods
- payment_transactions
- wallets
- wallet_transactions
- coupons
- coupon_usage
- reviews
- refunds
- preorders
- deliveries
- delivery_items
- support_conversations
- support_messages
- notifications
- audit_logs
- settings
- exchange_rates
- carts

Financial separation:
ORDER -> business purchase
PAYMENT -> external payment attempts/verification
WALLET TRANSACTION -> immutable customer ledger entry

Production rule:
Do not finalize a paid order, permanently deduct inventory, or release delivery until payment verification succeeds. Atomicity must be implemented in a transactional PostgreSQL/Supabase adapter before real-money launch.
