# AiFinPay Protocol Family

AiFinPay is one financial infrastructure stack for autonomous agents. The six protocols have separate responsibilities so identity, policy, authorization and execution can evolve without collapsing into one monolith.

## Founder target architecture

See the [ownership AIP](../aips/aip-draft-financial-protocol-ownership.md). This is a target responsibility correction, not proof of implemented banking routes. Existing Passport schemas and external x402 compatibility are unchanged.

```mermaid
flowchart TD
  Agent["Autonomous agent"] --> P3["AIFP-3 · identity and wallet bindings"]
  P3 --> P6["AIFP-6 · policy, delegation and approvals"]
  P6 --> Auth["Scoped financial authorization"]
  Auth --> Choice{"Execution route"}
  Choice --> P1["AIFP-1 · merchant monetization"]
  Choice --> P2["AIFP-2 · programmable agent payments"]
  Choice --> Bank["AIFP-6 · regulated provider adapter"]
  P1 --> Evidence["Receipt, reconciliation and audit evidence"]
  P2 --> Evidence
  Bank --> Evidence
  Evidence --> P6
```

## Responsibility map

| Protocol | Canonical responsibility | Economics / authority | Current maturity |
|---|---|---|---|
| [AIFP-1](https://github.com/AiFinPay/AIFP-1) | Monetizes AI-agent access to websites, APIs, MCP tools, data and digital actions | Published action price; 1% AiFinPay fee gross-inclusive; creator 0% | Draft protocol with implementation work; route evidence required |
| [AIFP-2](https://github.com/AiFinPay/AIFP-2) | Executes programmable agent and machine-to-machine payments; provides an x402 v2 compatibility profile | Provider-defined price; current AiFinPay fee 0%; creator 0% | Draft protocol and source candidates; production activation gated |
| [AIFP-3](https://github.com/AiFinPay/AIFP-3) | Portable Agent Passport: identity, holder/issuer keys, status, permissions, reputation and multi-wallet bindings | Identity and permission layer; no payment fee | vNext implementation candidate; chain migration and E2E pending |
| [AIFP-4](https://github.com/AiFinPay/AIFP-4) | Transports authenticated local/offline payment messages over Mesh communications | Organization policy and provider terms | Target scope; historical banking interfaces require separate migration |
| [AIFP-5](https://github.com/AiFinPay/AIFP-5-Quantum-Safe-Financial-Protocol)¹ | Independent optional post-quantum security evolution; no mandatory financial dependency | Security mode: `CLASSICAL_ONLY`, `HYBRID_REQUIRED`, `PQ_ONLY` | Private draft/reference implementation; no production deployment |
| [AIFP-6](https://github.com/AiFinPay/AIFP-6-Agentic-Financial-Governance-Protocol)¹ | Owns financial authority, limits, approvals, regulated-provider integration, banking/off-ramp, ledger and reconciliation | Returns `ALLOW`, `DENY` or `REQUIRE_APPROVAL` | Private draft/reference policy engine; no production service |

## Boundaries

- HTTP `402 Payment Required` is a shared web primitive, not the identity of one AiFinPay protocol.
- AIFP-1 owns merchant monetization, access pricing and 1% merchant-route economics.
- AIFP-2 owns programmable payment execution and exposes an x402-compatible profile; x402 remains an open external standard.
- AIFP-3 identifies the agent and its wallets but does not execute a payment.
- AIFP-6 authorizes financial operations and orchestrates approved banking providers; AIFP-1/AIFP-2 execute their crypto payment flows. AIFP-4 transports messages only. AIFP-5 remains optional; cryptographic authorization is still required.
- A protocol specification, reference implementation and production-live route are separate status claims.

¹ AIFP-5 and AIFP-6 links require authorized organization access while those repositories remain private.

## Shared invariants

1. Private keys stay inside the holder or wallet trust boundary.
2. Identity, policy, authorization and execution use domain-separated signatures.
3. Every financial action binds actor, scope, amount, asset, destination, expiry and replay state.
4. Unknown status, stale evidence or ambiguous route identity fails closed.
5. Receipts are issued after authoritative verification.
6. Production claims require reproducible artifacts, independent review and real E2E evidence.
