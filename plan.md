# Plan

## Balance Snapshots

- [x] Add a balance snapshot on account creation.
- [ ] Background task to always take a snapshot.
  - [ ] Learn [trigger.dev](https://trigger.dev). Refer to [midday.ai](https://github.com/midday-ai/midday)
- [x] Add a balance snapshot on transaction creation.

## Data Invalidation

- [ ] Invalidate summaries when new account or transaction is created.
  - [ ] Tag accounts and transactions
  - [ ] Invalidate on mutations to accounts or transactions
- [ ] Handle summaries with parameters.
  - [ ] Currency to view the summaries
  - [ ] Filtered account types
  - [ ] Filtered time range
