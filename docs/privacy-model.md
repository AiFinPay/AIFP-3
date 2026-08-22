# Privacy Model

## Data classes

| Class | Examples | Default exposure |
|---|---|---|
| Public identifiers | `agent_id`, passport number, issuer | Credential/verifier response |
| Verification state | status, version, key id, wallet binding result | Minimum required result |
| Profile attributes | display name, public service aliases | Holder/issuer policy |
| Sensitive attributes | private aliases, recovery evidence, risk/reputation evidence | Private storage only |
| Audit data | security reasons, IP/device evidence, operator actions | Restricted operational access |

## Principles

- Collect the minimum information required for protocol operation.
- Never place private aliases, recovery data or detailed reputation evidence on-chain.
- Prefer boolean or threshold attestations to complete profile disclosure.
- Bind every disclosure to audience, purpose and expiry where possible.
- Support revocation without pretending immutable public ledgers can delete data.

## Example disclosures

A payment service usually needs `ACTIVE`, a valid wallet binding and relevant permission. It does not need the agent's Telegram alias, recovery record or complete reputation history.

