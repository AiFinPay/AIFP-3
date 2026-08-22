# AIFP-3 Implementation Map

Last reconciled: **2026-08-23**.

This page answers where Agent Passport actually lives and which model is current.

## Canonical definition

**AIFP-3 is the AiFinPay Global Agent Passport.** One agent has:

- one immutable global `agent_id`;
- one permanent human-readable `AIFP-XXXXXXXXX` number;
- one agent/controller-held Ed25519 holder key;
- an AiFinPay Ed25519 issuer signature over protected claims;
- zero or more independently verified wallet bindings;
- one versioned lifecycle and integrity state across networks.

The passport is not owned by a blockchain address, is not defined by one NFT and is not replaced when a wallet changes. Telegram or another platform handle may be a signed alias, never the identity root.

## There is no separate canonical `agent-passport` repository

No repository named `AiFinPay/agent-passport` or `AiFinPay/passport` exists in the connected organization as of the reconciliation date. The product is distributed across these surfaces:

| Surface | Repository / source | Current role | Status boundary |
|---|---|---|---|
| Public protocol | [`AiFinPay/AIFP-3`](https://github.com/AiFinPay/AIFP-3) | Normative Global Agent Passport contract, schemas and security rules | Draft 0.1 |
| Earlier combined backend RC | [`AiFinPay/aifinpay-web` PR #22](https://github.com/AiFinPay/aifinpay-web/pull/22) | Global identity v2 plus 13-network settlement control plane | Open stacked RC, depends on PR #17 and currently not mergeable; identity portion must be reconciled with newer PR #33 |
| Backend vNext | [`AiFinPay/aifinpay-web` PR #33](https://github.com/AiFinPay/aifinpay-web/pull/33) | Global identity, permanent number, issuer/holder signatures, integrity enforcement, 13-network wallet registry and lifecycle API | **Open draft**, not merged; CI passed at `48286248e6bbdcff91644065c9ed970844b09cea` |
| Merged SDK settlement/identity RC | [`AiFinPay/sdk` PR #26](https://github.com/AiFinPay/sdk/pull/26) | Global passport resolver, exact-network wallet selection and settlement client | Merged to `main`; source RC only, package/app rollout and paid E2E pending |
| SDK vNext | [`AiFinPay/sdk` PR #27](https://github.com/AiFinPay/sdk/pull/27) | Holder-key generation, issuance/binding helpers and issuer/integrity verification | **Open draft**, not merged; CI passed at `e00063c47555ad6b961d66480c55eab381852711` |
| Dashboard | [`AiFinPay/paywall-dashboard` PR #9](https://github.com/AiFinPay/paywall-dashboard/pull/9) | Passport create/resolve/bind/revoke UI | Open source RC; depends on the older backend PR #22 and must be reconciled with PR #33 before deployment |
| Legacy EVM passport | [`AgentPassport.sol`](https://github.com/AiFinPay/evm-contract/blob/main/contracts/AgentPassport.sol) | Soulbound ERC-721, wallet-owned chain passport | Existing legacy model; **not canonical vNext identity** |
| Stellar passport contract | `AiFinPay/stellar-contract` (private) | Soroban passport-related implementation | Chain-specific surface; must migrate to the global identity contract |
| Smart-contract migration | Active contract repositories | Digest/status/wallet-binding anchors where needed | **Pending and intentionally excluded from PRs #33/#27** |

The words “Agent Passport repository” should therefore refer to `AiFinPay/AIFP-3` for the public protocol. Implementation claims must name the exact backend, SDK, dashboard or contract source.

## Current branch conflict

There are two implementation generations in flight:

1. PR #22 + merged SDK PR #26 + dashboard PR #9 form the earlier combined identity/settlement production-RC stack;
2. backend PR #33 + SDK PR #27 form the newer isolated dual-key, integrity-protected Global Agent Passport candidate.

They share the global identity direction but are not one merged release. The dashboard and settlement control plane must be rebased/reconciled against the final PR #33 API and data model. Until that happens, documentation must not combine their capabilities into one “ready” system.

## Source precedence

When sources conflict, use this order:

1. the current approved Global Agent Passport decision and this protocol;
2. reviewed and merged backend/SDK source plus conformance tests;
3. current deployment and migration evidence;
4. earlier wallet-owned or ERC-721 design documents as historical input only.

The Obsidian note `agent-passport-vnext-design.md` dated 2026-08-03 describes an earlier wallet-owned, soulbound ERC-721 design. It is superseded for product identity by the global passport model implemented in the 2026-08-19 draft PRs. Its payment-authorization threat analysis can still be reused where compatible.

## vNext implementation evidence

Backend PR #33 currently includes:

- PostgreSQL passport, wallet-binding, challenge and security-event state;
- Ed25519 issuer and holder proofs;
- protected SHA-256 payload integrity and fail-closed suspension;
- wallet binding with holder proof plus wallet ownership proof;
- EVM, Solana, NEAR, Aptos and Casper Ed25519 proof adapters;
- revoke, holder-key rotation, suspend, restore and administrative lifecycle;
- compatibility endpoints for legacy callers;
- `AIFP3_ENFORCE_PAYMENTS=false` by default.

SDK PR #27 currently includes:

- local Ed25519 holder-key generation;
- global issuance and binding helpers;
- independently pinned issuer-key verification;
- protected-payload hash and signature verification;
- exact-network wallet selection and fail-closed blocked/revoked handling.

Known boundary: Casper secp256k1 wallet binding intentionally fails closed in the current backend candidate; Ed25519 is supported.

## Migration contract

The legacy on-chain passport and global vNext credential cannot both be described as the canonical identity model. Migration must:

1. preserve the new immutable `agent_id` and permanent passport number;
2. map every old chain passport/address to a verified wallet binding or historical record;
3. prevent one wallet from becoming the owner of the global passport;
4. update settlement integrations to resolve global identity and exact wallet binding;
5. keep payment enforcement disabled until backend, SDK and chain migrations pass E2E;
6. publish rollback, revocation, recovery and integrity-tamper evidence.

## Honest status

| Claim | Current status |
|---|---|
| Public Global Agent Passport specification | Draft |
| Backend vNext implementation | Open draft PR; CI passed; not merged |
| Earlier SDK resolver/settlement RC | PR #26 merged; rollout and E2E pending |
| SDK dual-key vNext implementation | Open draft PR #27; CI passed; not merged |
| Dashboard Passport RC | Open PR #9; backend/API reconciliation and UI E2E pending |
| Legacy EVM/Soroban passport code | Exists; not the canonical vNext identity |
| Smart-contract migration | Pending |
| Cross-component lifecycle and payment E2E | Pending |
| Independent security and privacy review | Pending |
| Production activation | Blocked; payment enforcement remains off |
