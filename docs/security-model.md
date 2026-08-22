# Security Model

## Assets protected

- permanent identity and passport number;
- issuer and holder signing authority;
- wallet ownership bindings;
- lifecycle and revocation state;
- permissions and issuer-attested claims;
- private aliases and recovery evidence;
- audit history used by financial protocols.

## Threats and controls

| Threat | Required control |
|---|---|
| Forged issuer credential | Ed25519 verification, trusted issuer registry, key rotation/revocation |
| Holder key theft | rotation/recovery, epoch checks, session revocation, policy limits |
| Canonical JSON ambiguity | one versioned canonicalizer and public vectors |
| Wallet-binding theft | domain-separated ownership challenge and chain-specific verification |
| Replay | nonce, expiry, action binding and atomic consumption |
| Cross-passport wallet race | strongly consistent uniqueness/reservation |
| Registry rollback | monotonic version/epoch and tamper-evident audit |
| Malicious protected-field edit | reject; suspend only on authenticated evidence |
| Privacy leak | selective/minimal claims, no raw credential logging |
| On-chain/off-chain divergence | fail closed, reconcile before payment authorization |

## Separation of duties

Passport issuance, issuer-key administration, security suspension, recovery approval and production deployment should not depend on one operator credential. High-risk actions require auditable multi-party approval.

## Cryptographic scope

The current portable profile specifies Ed25519. AIFP-5 may later supply hybrid or post-quantum authorization profiles. Such profiles require explicit version negotiation and cannot silently replace the current signature suite.

