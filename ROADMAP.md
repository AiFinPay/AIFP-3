# AIFP-3 Roadmap

| Capability | Status | Release evidence required |
|---|---|---|
| Global `agent_id` and permanent AIFP number | **Draft PR candidate** | Merge backend PR #33 and SDK PR #27 after review |
| Holder + issuer dual-key credential | **Draft PR candidate** | Canonicalization and signature vectors plus merge |
| Multiple wallet bindings | **Draft PR candidate** | Ownership-proof conformance plus merge |
| Holder key rotation and recovery | **Draft PR candidate** | Replay, race and compromised-key tests plus merge |
| Suspend, restore and revoke lifecycle | **Draft PR candidate** | Authorization/audit acceptance plus merge |
| Protected-metadata enforcement | **Draft PR candidate** | Tamper acceptance and fail-closed review plus merge |
| EVM registry migration | **Pending** | Testnet deploy, state migration and runtime evidence |
| Solana registry migration | **Pending** | Deployable artifact, migration and program evidence |
| SDK/backend conformance | **Pending** | Clean install and cross-component E2E |
| Payment enforcement | **Disabled** | `AIFP3_ENFORCE_PAYMENTS=false` until acceptance |
| Independent security/privacy review | **Pending** | Named reviewers and remediation closeout |
| Production activation | **Blocked** | All lifecycle, recovery and payment gates pass |

## Delivery order

1. Freeze the canonical credential and protected-field schema.
2. Publish signature/canonicalization conformance vectors.
3. Complete backend and SDK lifecycle acceptance.
4. Migrate EVM and Solana registries without replacing the global passport model.
5. Run security, privacy, recovery and multi-wallet E2E.
6. Enable payment enforcement gradually after rollback testing.
