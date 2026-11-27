---
aip: TBD
title: Financial protocol ownership and Passport boundary
status: Draft
type: Standards Track
created: 2026-11-27
---

# Target responsibility correction

AIFP-3 supplies permanent agent identity, current issuer/holder trust and verified
wallet bindings. It is not a spending authorization. AIFP-6 supplies financial
authority and regulated-provider orchestration. AIFP-4 is local/offline Mesh
communication. AIFP-5 is an independent optional post-quantum layer, not a required
dependency of the initial financial integration. Cryptographic authorization of
every managed financial intent remains mandatory.

# Compatibility

No change to existing Passport schema, key model, lifecycle or API is introduced.
Baseline external x402 clients remain Passport-optional. Historical banking and
universal-router interfaces in AIFP-4 are preserved until consumer analysis and a
separate reviewed migration. Family diagrams must not be read as available API.

# Required implementation work

Current backend main does not serve the SDK Passport API. Historical backend
PR33 is closed unmerged; porting requires current architecture adaptation,
independent issuer-key trust, canonical challenge reconstruction and auth tests.
Do not silently merge that historical branch or claim complete financial E2E.

See [AIFP-6 companion proposal](https://github.com/AiFinPay/AIFP-6-Agentic-Financial-Governance-Protocol/pull/5)
and [backend candidate](https://github.com/AiFinPay/aifinpay-web/pull/434).
No deployment, permission activation or financial operation is authorized by this AIP.
