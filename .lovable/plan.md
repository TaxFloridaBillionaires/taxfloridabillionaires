# Migrate Lovable project to github.com/TaxFloridaBillionaires

## Important constraint
Lovable Git sync can only **create a new repository** on first connect. It cannot be pointed directly at the existing `TaxFloridaBillionaires` repo. This plan uses a two-step workaround: let Lovable create a fresh synced repo, then force-push that code into `github.com/TaxFloridaBillionaires` on the target branch.

## Domain goal
Keep `taxfloridabillionaires.com` registered at Namecheap, but point its DNS at GitHub Pages instead of Lovable hosting.

---

## Pre-migration checks

1. Confirm the existing repo and branch.
   - Repo: `https://github.com/TaxFloridaBillionaires`
   - Default/target branch: `main` (change to `gh-pages` if GitHub Pages is already configured for that branch)
2. Open the Lovable editor and check current Git sync status: **Plus (+) → GitHub**.
   - If a repo is already connected, decide whether to disconnect it first or migrate from it.
3. Make sure you have local Git access and push permissions to `TaxFloridaBillionaires`.
4. Ensure the published Lovable app is in a stable state (no uncommitted critical fixes in flight).

---

## Migration path (recommended)

### Step 1 — Let Lovable create a new synced repo
1. In Lovable: **Plus (+) → GitHub → Connect project**.
2. Authorize the Lovable GitHub App if prompted.
3. Select the GitHub account/organization that owns `TaxFloridaBillionaires`.
4. Let Lovable create a new repository (e.g., `tax-florida-billionaires-lovable`).
5. Wait for the initial sync to complete. The Lovable project code is now in the new repo.

### Step 2 — Clone the new Lovable repo locally
```bash
git clone https://github.com/YOUR_ORG/tax-florida-billionaires-lovable.git lovable-temp
cd lovable-temp
```

### Step 3 — Add the existing repo as a remote and force-push
```bash
# Add the target repo
git remote add target https://github.com/TaxFloridaBillionaires.git

# Fetch the target branch to see current state (optional but recommended)
git fetch target main

# Push the Lovable code to the target branch on the existing repo
git push target main --force
```
> **Warning:** `--force` overwrites the target branch history. Make sure the existing repo contents are backed up or no longer needed.

### Step 4 — Verify on GitHub
1. Open `https://github.com/TaxFloridaBillionaires`.
2. Confirm the branch now contains the Lovable project files.
3. Check that `index.html` is at the repository root (required for GitHub Pages).

---

## GitHub Pages setup

1. In the `TaxFloridaBillionaires` repo on GitHub, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose the target branch (`main` or `gh-pages`) and folder `/ (root)`.
4. Click **Save**.
5. Wait 1–5 minutes, then visit the GitHub Pages URL shown in the Pages settings.
6. Confirm the site loads. If routes return 404 on refresh, the React Router `BrowserRouter` may need to be switched to `HashRouter` for static GitHub Pages hosting, or a `404.html` redirect trick can be added.

---

## Alternative path (manual, no new Lovable repo)

Use this if you do not want Lovable to create a separate repo first.

1. In Lovable: open the **Code Editor → Download codebase** (paid workspaces).
2. Extract the ZIP locally.
3. In a local clone of `TaxFloridaBillionaires`:
   ```bash
   git clone https://github.com/TaxFloridaBillionaires.git
   cd TaxFloridaBillionaires
   # delete old files except .git, then copy in the downloaded codebase
   git add .
   git commit -m "Migrate codebase from Lovable"
   git push origin main
   ```
4. Configure GitHub Pages as described above.

> Trade-off: this path is one-way unless you also keep Lovable Git sync connected to a separate repo and manually merge changes back.

---

## Rollback steps

1. **Before force-pushing**, create a backup branch on the existing repo from the current `main`:
   ```bash
   git clone https://github.com/TaxFloridaBillionaires.git backup-temp
   cd backup-temp
   git branch pre-lovable-migration main
   git push origin pre-lovable-migration
   ```
2. If the migration fails or the site breaks, restore the previous state:
   ```bash
   git checkout pre-lovable-migration
   git branch -f main pre-lovable-migration
   git push origin main --force
   ```
3. If GitHub Pages breaks after the switch, revert the Pages source branch in **Settings → Pages** or temporarily disable Pages.
4. If Lovable sync breaks, disconnect and reconnect Git sync from the Lovable editor (**Plus (+) → GitHub → Manage/Disconnect**).

---

## Post-migration verification

- [ ] `https://github.com/TaxFloridaBillionaires` shows the Lovable project files on the target branch.
- [ ] GitHub Pages reports a successful deployment.
- [ ] The GitHub Pages URL loads the app.
- [ ] Internal routes (`/endorsements`, `/press`, `/richest-person-in-florida`) work or are fixed with `HashRouter`/404 redirect.
- [ ] Future edits in Lovable are syncing to the temporary Lovable repo (if keeping two-way sync alive).
- [ ] If needed, the temporary Lovable-created repo is renamed, archived, or kept as the sync target.
