# Deployment

The project is designed for AppDeploy's frontend+backend runtime.

Build:
- npm run build

Backend entry:
- backend/index.ts

Before production launch:
1. Configure ADMIN_EMAILS.
2. Connect a transactional PostgreSQL/Supabase database for money/order/wallet atomicity.
3. Configure real payment providers and verify callbacks/webhooks.
4. Configure transactional email.
5. Configure object storage for permitted product files and delivery attachments.
6. Replace placeholder legal pages with the store owner's actual policies.
7. Run the full payment/order/refund test suite in a non-production environment.
8. Add a custom domain after the deployment is stable.
