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

## Filters

- [ ] Global/User level parameters
  - [ ] Default currency
- [ ] Page level filters.
  - [ ] Currency to view the summaries
  - [ ] Filtered account types
  - [ ] Filtered time range
- [ ] Table level filters
  - [ ] Filter by account type
  - [ ] Filter to include inactive accounts
  - [ ] Hook up page-level filters to the table

  ## Account Views

  - [x] Table view for accounts
    - [x] Badge for active account
    - [x] Show active accounts only by default
    - [x] Pad account number by default with option to reveal the full account number
    - [x] Hide the currency field by default
  - [ ] Table columns
    - [ ] Store visible column preference in local storage
  - [ ] Actions on views
    - [x] Delete account
    - [ ] View details
  - [ ] Currency
    - [ ] Show and convert values using user's default currency.
    - [ ] Show amounts using the account's default currency.
  - [ ] Add financial institution field in the Account model
    - [ ] Add it to the form
    - [ ] Add it to the table view

  ## User config

  - [ ] Create user config model
  - [ ] CRUD on user config with specific flows and a settings page
    - [ ] User's default currency flow
      - [ ] When creating first account, use first account's currency as
      the default currency.
      - [ ] When account is created with a currency different than the default currency,
      prompt the user to chose a default currency.
