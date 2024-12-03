# Plan

## Balance Snapshots

- [x] Add a balance snapshot on account creation.
- [ ] Background task to always take a snapshot.
  - [ ] Learn [trigger.dev](https://trigger.dev). Refer to [midday.ai](https://github.com/midday-ai/midday)
- [x] Add a balance snapshot on transaction creation.

## Data Invalidation

- [x] Invalidate summaries when new account or transaction is created.
  - [x] Tag accounts and transactions
    - Change of plans. Will use revalidate path instead of tag for now.
    - Setting up the tag involves using `unstable_cache` for the `Prisma`
    or using `fetch`.
  - [x] Invalidate on mutations to accounts or transactions
- [ ] Handle summaries with parameters.
  - [ ] Currency to view the summaries
  - [ ] Filtered account types
  - [ ] Filtered time range

  ## Account Views

  - [x] Table view for accounts
    - [x] Badge for active account
    - [x] Show active accounts only by default
    - [x] Pad account number by default with option to reveal the full account number
    - [x] Hide the currency field by default
  - [ ] Filters
    - [ ] Filter by account type
    - [ ] Filter to include inactive accounts
    - [ ] Hook up page-level filters to the table
  - [ ] Currency
    - [ ] Show and convert values using user's default currency.
    - [ ] Show amounts using the account's default currency.
  - [ ] Add financial institution field in the Account model
    - [ ] Add it to the form
    - [ ] Add it to the table view
