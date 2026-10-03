# Environment Variables

ADMIN_EMAILS=owner@example.com

Set ADMIN_EMAILS in AppDeploy backend secrets/configuration to the real administrator email(s). Do not place real credentials in source control.

Future provider secrets should be added as backend-only secrets, for example:
- BAKASH_API_KEY
- NAGAD_API_KEY
- RUPANTORPAY_API_KEY
- DATABASE_URL
- EMAIL_PROVIDER_API_KEY
