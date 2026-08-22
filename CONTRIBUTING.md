# Contributing to AIFP-3

Normative changes to identity fields, canonicalization, signatures, wallet ownership proof, lifecycle, permissions or privacy require an AIFP Improvement Proposal, migration analysis and conformance vectors.

Pull requests must:

1. update prose, OpenAPI and JSON Schemas together;
2. state whether identifiers or signatures change;
3. include replay, expiry, rotation and negative tests;
4. describe privacy and migration impact;
5. preserve the invariant `one passport → many wallets`, never `one wallet → one passport owner`;
6. avoid production claims without deployment and E2E evidence.

Code and machine-readable artifacts are contributed under Apache-2.0. Documentation contributions are under CC BY 4.0.

