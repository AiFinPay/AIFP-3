# AIFP-3 Agent Passport Specification

Status: **Draft 0.1.0**  
Requirement words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** are normative.

## 1. Model

An AIFP-3 passport represents one global agent identity. It MUST NOT be defined by a single wallet, token or blockchain account.

```text
one agent_id
= one permanent passport_number
+ one current holder key
+ one AiFinPay issuer signature
+ zero or more verified wallet bindings
+ versioned permissions, status and reputation claims
```

## 2. Required claims

- `agent_id`: immutable globally unique identifier.
- `passport_number`: immutable human-readable AIFP number.
- `issuer`: AiFinPay issuer identifier.
- `issuer_key_id`: key used for the issuer signature.
- `holder_public_key`: current holder/agent verification key.
- `key_epoch`: monotonic holder-key generation.
- `status`: current lifecycle status.
- `issued_at` and `updated_at`.
- `protected_claims_digest`: digest of canonical issuer-protected claims.
- `issuer_signature` and holder proof where required.

## 3. Canonicalization and signatures

Issuer-protected claims MUST be serialized through one versioned canonical JSON profile before hashing and signing. Implementations MUST reject duplicate keys, non-canonical numbers, unsupported Unicode normalization and unknown critical claims.

The portable credential profile uses Ed25519 signatures. The issuer signature attests the canonical passport. The holder signature proves current holder-key control for holder-authorized actions.

## 4. Issuer-protected claims

At minimum, these fields are issuer-protected:

- `agent_id`;
- `passport_number`;
- `issuer` and issuer key identifier;
- initial creation timestamp;
- controller/organization binding when asserted;
- protected source aliases and attestations;
- security status and revocation facts;
- permission/reputation claims issued by AiFinPay.

The holder MUST NOT directly rewrite these fields. A valid issuer update creates a new version and audit event.

## 5. Holder-authorized actions

Subject to status and policy, the holder may request:

- proof of current key control;
- binding or removing a verified wallet;
- holder-key rotation or recovery;
- session creation/revocation;
- updates to explicitly holder-editable profile fields.

Every action MUST bind `agent_id`, key epoch, action type, target, nonce and expiry.

## 6. Wallet bindings

Each wallet binding MUST include a namespace/network, normalized address, ownership proof, proof timestamp, status and binding identifier. One passport MAY hold many wallets. A wallet MUST NOT be actively bound to two passports unless a profile explicitly supports shared organizational custody and marks it as such.

## 7. Lifecycle

Canonical statuses are:

- `PENDING_VERIFICATION`
- `ACTIVE`
- `RECOVERY`
- `SUSPENDED_SECURITY`
- `REVOKED`

`REVOKED` is terminal. Services MUST deny payment authorization for `SUSPENDED_SECURITY` and `REVOKED`. Unauthorized protected-claim tampering MUST fail closed and trigger a security event; automated suspension policy must be reviewable and resistant to denial-of-service abuse.

## 8. On-chain anchors

Blockchain registries MAY anchor `agent_id`, passport digest, status/version and wallet-binding facts. They MUST NOT redefine the passport as an NFT with one owner address.

EVM contracts cannot practically verify canonical JSON Ed25519 issuer credentials without a dedicated verification mechanism. Conforming EVM designs therefore anchor digests/status on-chain while signature verification occurs in the portable verifier, or use an explicitly versioned cryptographic adapter.

## 9. Privacy

Relying parties SHOULD receive derived proofs or minimum claims. Private aliases, recovery data and reputation evidence MUST NOT be published on-chain. Logs MUST avoid raw credentials and personal data.

## 10. Payments

AIFP-1, AIFP-2 and AIFP-4 may use AIFP-3 status, wallet binding and permissions. Baseline x402 interoperability MUST remain possible without a passport. Until migration and E2E gates pass, payment enforcement remains disabled by default.

