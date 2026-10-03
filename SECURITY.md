# Security

- Server-side authorization is mandatory.
- Customer data is scoped by authenticated user ID.
- Admin actions use a server-side allowlist and can evolve to RBAC.
- ADMIN_EMAILS is an environment secret/configuration; never hard-code credentials.
- Payment provider credentials must be backend-only secrets.
- Delivery credentials must never appear in public catalog APIs.
- Financial values must be calculated server-side using integer minor units or a decimal-safe library.
- Rate limiting, duplicate transaction detection, abuse controls, audit logs and transactional database constraints are required before accepting real money at scale.
