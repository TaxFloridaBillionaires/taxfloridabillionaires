# Candidate Endorsement Outreach Emails

Goal: send each endorsed candidate a personalized note with their own deep link to the endorsements page, plus the 15-second video ask.

## Approach: mail-merge export (no app changes)

This is a one-to-many outreach campaign to a list, not app email triggered by a user action, so it should not go through the site's built-in email system. Instead I'll produce a ready-to-send mail-merge package you can run from Gmail (with a mail-merge add-on), Mailchimp, or by copy-paste.

## What gets produced

1. `candidate-endorsement-outreach.csv` in your downloads folder, one row per candidate:
   - `first_name`, `full_name`, `office`, `email` (blank where unknown, for you to fill)
   - `endorsement_url` — their anchor link with campaign tags, e.g.
     `https://taxfloridabillionaires.com/endorsements?utm_source=taxfloridabillionaries&utm_medium=email&utm_campaign=endorsement-outreach#adam-roberti`
   - `subject` and `body` — fully personalized, ready to send as-is
2. A plain-text template file with `{{first_name}}` / `{{endorsement_url}}` merge tags for use in any mail-merge tool.
3. A short summary in chat listing which candidates still need an email address.

## Email copy (light polish of your draft)

```text
Subject: You've been endorsed by Tax Florida Billionaires

Greetings {{first_name}},

I'm excited to share that you've been endorsed by Tax Florida Billionaires.
Thank you for taking a bold stand for Florida's future.

Your endorsement page: {{endorsement_url}}

Would you be willing to record a 15-second video on what a TFB endorsement
means to you? We can provide a Canva template to make sharing easy.

Robert Davis
Project Lead, Tax Florida Billionaires
(954) 900-8728
```

Canva link is left as a placeholder line you can swap in once you have it.

## Email addresses

Candidate emails aren't stored in the site data. I'll research publicly listed campaign contact emails and prefill the ones I can confirm; the rest stay blank in the CSV with a note (several campaigns only publish a contact form).

## Technical notes

- Source of truth is `src/data/candidates.ts` (18 candidates, each with `slug`, `name`, `office`).
- A one-off script reads that file, builds links from the slugs, and writes the CSV/template to `/mnt/documents/`. No project source files change.
