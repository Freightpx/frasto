---
title: Data contracts
description: Define what a component needs to display without defining how an application stores it.
---

Frasto data contracts sit at the UI boundary.

```ts
interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  description?: string;
}
```

The contract communicates display requirements. It does not create a database table or determine how the value was queried.

## Principles

- Keep contracts serializable where practical.
- Accept application identifiers without prescribing UUIDs or numeric keys.
- Let consumers format domain-specific currency, dates, and units.
- Preserve generics for record data when they improve type safety.
- Separate display labels from machine values.

## Adapters

Applications may adapt backend records at the page or data-loader boundary:

```ts
const customerRows = records.map((record) => ({
  id: record.customer_id,
  name: record.display_name,
  status: mapStatus(record.state),
}));
```

This prevents persistence naming and nullable fields from leaking into reusable UI contracts.

## Behavior callbacks

Data components may expose events or callbacks for sorting, selection, and actions. They should not assume those operations are local, remote, optimistic, or backed by a particular client store.
