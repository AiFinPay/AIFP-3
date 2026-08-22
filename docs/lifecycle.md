# Lifecycle and Status

| Status | Meaning | Payments through AiFinPay |
|---|---|---|
| `PENDING_VERIFICATION` | Issued but activation checks incomplete | Denied |
| `ACTIVE` | Credential and holder state valid | Allowed subject to policy |
| `RECOVERY` | Holder control is being recovered | Denied or explicitly restricted |
| `SUSPENDED_SECURITY` | Security review required | Denied |
| `REVOKED` | Passport permanently revoked | Denied permanently |

## Administrative actions

Suspend, restore and revoke commands require authorized administrative signatures, stable reason codes, audit records and idempotency. Restoration cannot roll back `key_epoch` or erase security history.

## Session behavior

A status change to `RECOVERY`, `SUSPENDED_SECURITY` or `REVOKED` revokes active AiFinPay sessions and disables wallet bindings for new authorization. Services should use short-lived status evidence and a revocation channel rather than caching `ACTIVE` indefinitely.

## Fail-closed rules

- unknown status → deny;
- stale status/version → refresh or deny;
- signature or canonicalization ambiguity → deny;
- key epoch rollback → deny and alert;
- protected metadata mismatch → deny and evaluate security suspension;
- registry/chain-anchor conflict → deny and reconcile.

