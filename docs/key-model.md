# Key Model

## Two independent keys

| Key | Controller | Purpose | Agent may replace? |
|---|---|---|---|
| Holder/agent key | Agent or authorized controller | Proves holder control; authorizes holder actions | Yes, through rotation/recovery |
| Issuer key | AiFinPay KMS/HSM | Issues and updates protected passport claims | **No** |

The issuer key is not exported to the agent. Issuer key rotation changes `issuer_key_id` and trust metadata, not the passport identity.

## Holder rotation

A normal rotation requires a signed command from the current holder key, a new-key proof, a nonce, expiry and current `key_epoch`. Successful rotation increments the epoch and revokes old sessions.

## Recovery

Recovery must use a separately governed recovery policy. It may require AiFinPay review, controller/organization approval, recovery factors and a cooling-off period. Recovery cannot alter `agent_id`, passport number or historical issuer claims.

## Signature envelope

Every command signature binds:

```text
domain = "AIFP-3"
protocol_version
agent_id
key_epoch
action
target_digest
nonce
expires_at
```

Domain separation prevents a passport signature from authorizing a payment or governance decision.

