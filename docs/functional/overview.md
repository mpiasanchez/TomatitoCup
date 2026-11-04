# Overview

## User Roles

| Role | Who | Responsibility |
|------|-----|----------------|
| **Host** | The person planning the date | Creates the experience, generates and shares the link |
| **Guest** | The partner receiving the surprise | Opens the link and solves riddles to unlock the reveal |

---

## Application Routes

| Path | View | Description |
|------|------|-------------|
| `/` | Home | Landing page with product overview and entry point |
| `/create` | Host Dashboard | Form to create and publish a mystery date |
| `/play?data=<payload>` | Guest View | Interactive riddle experience for the guest |

---

## High-Level Flow

```
Host                                Guest
 │                                    │
 ├─ Visit /                           │
 ├─ Click "Create a mystery date"     │
 ├─ Fill in experience form (/create) │
 ├─ Generate share link               │
 ├─ Copy and send link ──────────────►│
 │                                    ├─ Open /play?data=<payload>
 │                                    ├─ Solve riddles in order
 │                                    └─ Unlock final surprise reveal
```
