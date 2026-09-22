# AIFP-3 financial-instrument bindings

Status: proposed additive architecture, not deployed functionality. Date: 2026-09-23.

## Identity and ownership

One autonomous agent has one immutable `agent_id` and one canonical passport, independently of its wallets, cards, bank accounts, networks or execution providers. AIFP-3 identifies the agent and records independently verified instrument bindings; AIFP-6 controls delegated spending policy; AIFP-4 Mesh executes authorized payments across crypto, cards, bank and local rails.

A passport is not a card, account, wallet, legal entity, issuer or legal cardholder. Each instrument must be owned or validly authorized by a human or organization (sponsor); the issuer or provider must expressly permit the intended agent use. A passport cannot mint or activate a card without that authorization.

## Private binding registry

`FinancialInstrumentBinding` fields: `bindingId`, `agentId`, `passportId`, `sponsorId`, `type` (`CRYPTO_WALLET`, `CARD`, `BANK_ACCOUNT`, `STABLECOIN_ACCOUNT`, `LOCAL_RAIL`), `providerId`, `opaqueInstrumentRef`, `mandateId`, `policyId`, `state` (`PENDING_VERIFICATION`, `ACTIVE`, `SUSPENDED`, `REVOKED`, `EXPIRED`), `version`, `createdAt`, `updatedAt`, optional `expiresAt` and `capabilities`. The public passport may expose a commitment or a privacy-minimized capability statement. PAN, CVV, full bank credentials, secret keys, unencrypted provider handles, personally identifiable KYC/KYB records and API keys MUST NOT be published on chain or in public passport metadata, logs or agent prompts.

## Lifecycle

1. Authenticate sponsor and agent; verify passport is active.
2. Crypto-wallet binding requires a domain-separated signed proof of control or valid delegated authorization. Card and bank-account bindings require account-holder consent, provider API authorization and applicable eligibility checks.
3. Insert a pending binding with a unique idempotency key and version. Activate only after evidence and AIFP-6 mandate validation.
4. Verify passport, sponsor mandate, binding state and policy on every AIFP-4 execution. On passport suspension/revocation, disable AiFinPay-mediated payments on all bindings immediately; independently call provider block/freeze APIs if supported and authorized. AIFP-3 cannot freeze third-party wallets or bank accounts by changing its own registry.
5. Support wallet rotation, card replacement and provider migration without changing canonical `agent_id` or passport number; retain non-sensitive audit references to old bindings.

## Integration and release gate

AIFP-4 Mesh consumes a verified binding capability and opaque instrument handle; AIFP-6 supplies a current, scoped, immutable-intent-bound decision. No card issuance, banking integration, crypto-to-fiat conversion or provider partnership is implied by this document. Reconcile AIFP-3 backend/SDK draft PRs and legacy wallet-owned smart contracts before enabling production enforcement. Validate cross-agent isolation, revoked mandates, duplicate intents, account takeover, stale approvals, provider outages and credential leakage. Regulatory/contractual review is required for third-party card programs and financial execution; this is not legal advice.
