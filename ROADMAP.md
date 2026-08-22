# AIFP-3 Roadmap

| Capability | Status | Release evidence required |
|---|---|---|
| Global `agent_id` and permanent AIFP number | **Implementation candidate** | Schema, migration and uniqueness tests |
| Holder + issuer dual-key credential | **Implementation candidate** | Canonicalization and signature vectors |
| Multiple wallet bindings | **Implementation candidate** | EVM/Solana ownership-proof tests |
| Holder key rotation and recovery | **Implementation candidate** | Replay, race and compromised-key tests |
| Suspend, restore and revoke lifecycle | **Implementation candidate** | Authorization and audit tests |
| Protected-metadata enforcement | **Implementation candidate** | Tamper tests and fail-closed behavior |
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

