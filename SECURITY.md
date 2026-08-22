# Security Policy

AIFP-3 protects agent identity, issuer claims, holder control, wallet bindings, status, permissions and financial reputation.

## Reporting

Do not open a public issue for vulnerabilities. Email `security@aifinpay.io` with the affected version/commit, reproduction, preconditions, impact and suggested remediation.

## In scope

- forged issuer or holder signatures;
- canonicalization ambiguity;
- passport-number or `agent_id` collision;
- unauthorized protected-field changes;
- wallet binding without ownership proof;
- replayed binding, rotation, recovery or status commands;
- bypass of `SUSPENDED_SECURITY` or `REVOKED`;
- cross-agent wallet reassignment races;
- private profile or alias disclosure;
- rollback of status, key epoch or revocation state;
- on-chain/off-chain state divergence affecting payments.

## Production gate

Production requires independent architecture, cryptography, access-control and privacy review; signature test vectors; rotation/recovery exercises; replay and concurrency tests; migration rollback; audit-log integrity; EVM/Solana deployment evidence; SDK/backend E2E; and staged payment enforcement.

External self-custody wallets cannot be frozen by AIFP-3 on their underlying blockchain. Documentation and interfaces must not claim otherwise.

