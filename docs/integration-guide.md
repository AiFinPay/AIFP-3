# Integration Guide

## Verify a passport

1. Parse the credential using a strict schema.
2. Canonicalize issuer-protected claims with the declared profile.
3. Resolve `issuer_key_id` from the trusted issuer registry.
4. Verify the issuer Ed25519 signature.
5. Read current status, version, key epoch and revocation state.
6. Verify the holder proof when the requested action requires holder control.
7. Verify wallet binding for the selected network/address.
8. Request only claims required for the relying-party decision.

## Bind a wallet

- request a short-lived domain-separated challenge;
- sign in the wallet locally;
- submit proof with current holder authorization;
- verify chain-specific ownership semantics;
- commit uniqueness, binding and audit state atomically.

## Payment integration

```text
AIFP-3: resolve agent + status + wallet binding
→ AIFP-6: evaluate spending policy and approvals
→ AIFP-5: verify required authorization profile
→ AIFP-1/AIFP-2/AIFP-4: execute the approved action
→ AIFP-3/AIFP-6: append outcome/reputation evidence where permitted
```

AIFP-3 payment enforcement remains opt-in until production migration and E2E acceptance. Baseline AIFP-2/x402 clients must remain interoperable without a passport.

## API surfaces

- `POST /v1/passports`
- `GET /v1/passports/{agent_id}`
- `POST /v1/passports/{agent_id}/holder-proof`
- `POST /v1/passports/{agent_id}/wallet-bindings/challenge`
- `POST /v1/passports/{agent_id}/wallet-bindings`
- `POST /v1/passports/{agent_id}/rotate-holder-key`
- `POST /v1/passports/{agent_id}/status`

Production endpoints require authentication, authorization, idempotency, audit logging and abuse protection beyond the illustrative OpenAPI contract.

