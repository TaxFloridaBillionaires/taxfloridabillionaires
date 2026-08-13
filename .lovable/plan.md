# Set up branded email for rob@taxfloridabillionaires.com

## Goal
Enable branded email sending from `rob@taxfloridabillionaires.com` for the project, including queue-backed transactional and auth emails.

## Current state
No email domain is configured for this project in the workspace. `taxfloridabillionaires.com` is an active custom domain for the site, but it has not been delegated for email sending yet.

## Steps

1. **Configure the sender domain**
   - Add `taxfloridabillionaires.com` (or a dedicated subdomain like `notify.taxfloridabillionaires.com`) as the project's email sender domain via the email setup dialog.
   - Add the required NS records at the domain registrar to delegate the email subdomain to Lovable's nameservers.
   - Wait for DNS verification (up to 72 hours; often minutes).

2. **Provision email infrastructure**
   - Once the domain is active, set up the Lovable Cloud email backend: `pgmq` queues, send log, suppression list, unsubscribe tokens, `process-email-queue` Edge Function, and the cron job.

3. **Scaffold transactional email**
   - Deploy the `send-transactional-email` Edge Function and registry template so the app can send branded emails from code.

4. **Configure the sender address**
   - Set `rob@taxfloridabillionaires.com` (or `rob@<subdomain>` if a subdomain is used) as the default from address.

5. **Verify end-to-end sending**
   - Trigger a test email and confirm it appears in the email send log with `sent` status.

## Outcome
After completion, the project can send branded emails from `rob@taxfloridabillionaires.com` with queue-backed retry, delivery logs, and suppression handling.
